export default defineEventHandler(async (event) => {
  const { imageUrl } = getQuery(event); // Get the image URL from the query parameter

  if (!imageUrl) {
    throw createError({
      statusCode: 400,
      statusMessage: "Image URL is required",
    });
  }

  try {
    // Fetch the image from the URL with custom headers
    const response = await fetch(imageUrl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        // You can add more headers if needed, e.g., referer, cookies
      },
    });

    // Check if the response is valid
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: "Failed to fetch media",
      });
    }

    // Get the image data and convert to buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Return the image buffer directly to the client
    return buffer;
  } catch (error) {
    console.error("Error fetching media:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error fetching media",
    });
  }
});
