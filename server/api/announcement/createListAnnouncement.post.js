import { prisma } from '../../db/index'
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const transactionPromise = [
        prisma.list_Announcement.create({
            data:{
                la_content:body.la_content,
                la_title:body.la_title,
                la_cat_id:body.la_cat_id,
                la_us_username:body.la_us_username
            }
        })
    ]
    body.filteredAnnouncements.forEach((announcement) => {
        transactionPromise.push(
            prisma.announcement.create({
                data:{
                    an_id: announcement.an_id,
                    an_title: announcement.an_title,
                    an_type: announcement.an_type,
                    an_url: announcement.an_url,
                }
            })
        )
    })
    try {
        const transactionPromise2 = []
        await Promise.all(transactionPromise).then(async (result) => {
            const createdListAnnouncement = result[0]
            body.announcements.forEach(async (announcement) => {
                transactionPromise2.push(
                    prisma.announcement_in_List.create({
                        data:{
                            ail_an_id: announcement.an_id,
                            ail_la_id: createdListAnnouncement.la_id
                        }
                    })
                )
            })
            await prisma.$transaction(transactionPromise2)
        }).catch((e) => {
            return {
                statusCode: 400,
                body: {
                    message: e.message
                }
            }
        })
        return {
            statusCode: 200,
            body: {
                message: 'List Announcement created successfully'
            }
        }
    } catch (e) {
        return {
            statusCode: 400,
            body: {
                message: e.message
            }
        }
    }
})