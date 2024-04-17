import {prisma} from '../../db/index'
export default defineEventHandler(async(event)=>{
    const result = await prisma.announcement.findMany({
        include:{
            announcement_in_list:true
        }
    })
    return result
})