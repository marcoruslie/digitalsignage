export default defineEventHandler(async (event) => {
  const jwt = await import("jsonwebtoken");
  const body = await readBody(event);
  const jwtSecret = process.env.JWT_SECRET;
  try {
    const data = jwt.verify(body.token, jwtSecret);
    return data;
  } catch (e: any) {
    return null;
  }
});
