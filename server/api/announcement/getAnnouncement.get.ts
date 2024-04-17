import { prisma } from '../../db/index'
export default defineEventHandler((event) => {
    const announcement = prisma.announcement.findMany({
        where: {
            deletedAt: null
        }
    })
    return announcement
})