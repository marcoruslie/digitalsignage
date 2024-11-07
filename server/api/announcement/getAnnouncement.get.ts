import { prisma } from "../../db/index";
export default defineEventHandler((event) => {
  const announcement = prisma.announcement.findMany({
    include: {
      category: {
        select: { cat_name: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    where: {
      deletedAt: null,
    },
  });
  return announcement;
});
