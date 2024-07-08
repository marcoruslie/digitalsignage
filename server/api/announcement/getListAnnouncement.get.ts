import {prisma} from '../../db/index'
export default defineEventHandler(async(event)=>{
    const result = await prisma.list_Announcement.findMany({
        where:{
            deletedAt:null
        },
        include:{
            announcement_in_list:{
                include:{
                    announcement:true
                }
            },
            category:true
        }
    })
    return result
})