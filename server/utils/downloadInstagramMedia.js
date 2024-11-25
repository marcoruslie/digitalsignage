import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import fetch from "node-fetch";

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

/**
 * Sanitize file names by removing or replacing invalid characters.
 * @param {string} url - The URL to be sanitized.
 * @returns {string} - The sanitized file name.
 */
const sanitizeFileName = (url) => {
  return url
    .replace(/[<>:"/\\|?*]/g, "_") // Replace invalid characters with '_'
    .replace(/\s+/g, "_") // Replace spaces with '_'
    .slice(0, 255); // Ensure file name is not too long
};

/**
 * Ensure that the directory exists, if not create it.
 * @param {string} dirPath - The path of the directory to check/create.
 */
const ensureDirectoryExists = async (dirPath) => {
  try {
    await fs.promises.access(dirPath);
  } catch (error) {
    await mkdir(dirPath, { recursive: true });
  }
};

/**
 * Downloads Instagram media file from a post URL.
 * @param {string} postUrl - The Instagram post URL.
 * @param {string} downloadPath - The path to save the downloaded file.
 */
export const downloadInstagramMedia = async (
  postUrl,
  downloadPath,
  fileName
) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(postUrl, { waitUntil: "networkidle2" });

    // Get the media URL (image or video)
    const mediaUrl = await page.evaluate(() => {
      const video = document.querySelector("video");
      if (video) {
        return video.src;
      }

      const image = document.querySelector("img[srcset]");
      if (image) {
        return image.src;
      }

      return null;
    });

    if (!mediaUrl) {
      throw new Error("No media found on the provided URL.");
    }

    // Ensure the directory exists
    await ensureDirectoryExists(downloadPath);

    // Fetch the media content
    const response = await fetch(mediaUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch media content.");
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filePath = path.join(downloadPath, fileName + ".png");

    // Write the media file to the download path
    await writeFile(filePath, buffer);

    console.log(`Media saved to ${filePath}`);
  } catch (error) {
    console.error("Error downloading Instagram media:", error.message);
  } finally {
    await browser.close();
  }
};
