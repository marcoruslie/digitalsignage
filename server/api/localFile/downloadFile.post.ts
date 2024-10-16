import axios from "axios";
import { promises as fs } from "fs";
import { join } from "path";
import sharp from "sharp";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const fileUrl = body.url;
  const compressType = body.type || "image";
  const kategori = body.kategori;
  const idContent = body.id || "null";
  if (!fileUrl) {
    throw createError({
      statusCode: 400,
      statusMessage: "URL and ID are required",
    });
  }

  try {
    let id: string = "";
    if (idContent == "null") {
      id = extractIdFromUrl(fileUrl);
    } else {
      id = idContent;
    }
    console.log("TES1", fileUrl);
    try {
      console.log(await axios.get(fileUrl));
    } catch (error) {
      console.log("ERROR", error);
    }
    const response = await axios.get(fileUrl, {
      responseType: "arraybuffer",
    });

    console.log(response);
    if (response.status === 404) {
      throw new Error("Failed to download file");
    }
    const arrayBuffer = await response.data;
    const buffer = Buffer.from(arrayBuffer);
    const resourcesDir = join(process.cwd(), "resources", kategori);
    await fs.mkdir(resourcesDir, { recursive: true });
    const fileExt = getFileExtension(fileUrl) || "png";
    const sharpFormat = mapExtensionToSharpFormat(fileExt);
    const compressedFileName = `${id}.${fileExt}`;
    const filePath = join(resourcesDir, compressedFileName);

    if (compressType === "image") {
      try {
        await sharp(buffer)
          .resize(1200, 800, { fit: "inside" }) // Resize carefully, if needed
          .toFormat(sharpFormat, {
            quality: 100, // Maximum quality
            progressive: true, // Enable progressive rendering for JPEG
            chromaSubsampling: "4:4:4", // Prevent color subsampling (for JPEG)
          })
          .toFile(filePath);
      } catch (error) {
        throw createError({
          statusCode: 500,
          statusMessage: "DEPENDECY_ERROR",
        });
      }
    }
    const editedFile = join("/_nuxt/resources", kategori, compressedFileName);
    return {
      message: "File downloaded and compressed successfully",
      filePath: editedFile,
    };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }
});
function extractIdFromUrl(url: string): string {
  const parsedUrl = new URL(url);
  const id = parsedUrl.searchParams.get("id");
  if (!id) {
    const name = parsedUrl.pathname.split("/").pop();
    if (name!.split(".").length > 1) {
      return name!.split(".")[0];
    }
  }
  return id || "null";
}
function getFileExtension(url: string) {
  const parts = url.split(".");
  const ext = parts.pop()?.split(/[?#]/)[0];
  if (ext == "pdf") return "png";
  return ext && ext.length <= 4 ? ext : "";
}
function mapExtensionToSharpFormat(ext: string): keyof sharp.FormatEnum {
  switch (ext.toLowerCase()) {
    case "jpg":
    case "jpeg":
      return "jpeg";
    case "png":
      return "png";
    case "webp":
      return "webp";
    case "tiff":
    case "tif":
      return "tiff";
    case "gif":
      return "gif";
    case "pdf":
      return "png";
    default:
      return "png";
  }
}
