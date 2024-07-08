import {prisma} from '../../db/index'
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    
    const createAnnouncement = prisma.announcement.create({
        data:body
    })
    return createAnnouncement
})