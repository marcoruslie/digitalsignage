import { defineEventHandler, getQuery } from "h3";

import path from "path";

export default defineEventHandler(async (event) => {
  const { postUrl } = await readBody(event);

  if (!postUrl) {
    return { success: false, error: "Post URL is required" };
  }

  try {
    const downloadPath = path.resolve("./downloads");
    await downloadInstagramMedia(postUrl, downloadPath);

    return { success: true, message: "Media downloaded successfully" };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
