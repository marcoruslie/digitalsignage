import { prisma } from "../../db/index";
export default defineEventHandler(async (event) => {
  const jwt = await import("jsonwebtoken");
  const body = await readBody(event);
  const jwtSecret = process.env.JWT_SECRET;
  const user = await prisma.user.findFirst({
    where: {
      us_username: body.us_username,
      us_password: body.us_password,
    },
    include: {
      listannouncement: {
        include: {
          announcement_in_list: {
            include: {
              announcement: true,
            },
          },
        },
      },
      role: {
        include: {
          categoryuser: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });
  if (user != null) {
    const token = jwt.sign(user, jwtSecret, {
      expiresIn: 60 * 60 * 24,
    });
    return token;
  }

  return null;
});
