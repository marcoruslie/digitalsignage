// /api/downloadMedia.js
import puppeteer from "puppeteer";

export default defineEventHandler(async (req) => {
  const { url } = await readBody(req);
  console.log(`URL: ${url}`);
  try {
    const mediaUrl = await getInstagramMedia(url);
    console.log(`Media URL: ${mediaUrl}`);
    return mediaUrl;
  } catch (error) {
    return { error: error.message };
  }
});
const getInstagramMedia = async (postUrl) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log("1");
  try {
    await page.goto(postUrl, { waitUntil: "networkidle2" });
    console.log("2");
    const mediaUrl = await page.evaluate(() => {
      const video = document.querySelector("video");
      if (video) {
        console.log("3");
        return video.src;
      }

      const image = document.querySelector("img[srcset]");
      if (image) {
        console.log("4");
        return image.src;
      }

      return null;
    });

    if (!mediaUrl) {
      throw new Error("No media found.");
    }

    return mediaUrl;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    await browser.close();
  }
};
