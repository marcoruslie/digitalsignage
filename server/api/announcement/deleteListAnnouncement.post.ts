import {prisma} from '../../db/index'
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    
    const deleteListAnnouncement = prisma.announcement.deleteMany({
        where: {
            an_id: {
                in: body.an_id
            }
        }
    })
    return deleteListAnnouncement
})
