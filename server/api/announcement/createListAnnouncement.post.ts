import { prisma } from '../../db/index'
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    
    const listAnnouncement = prisma.list_Announcement.create({
        data:body
    })
    return listAnnouncement
})