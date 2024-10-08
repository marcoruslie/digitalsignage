import {prisma} from '../../db/index'
export default defineEventHandler(async(event)=>{
    const result = await prisma.user.findMany({
        include:{
            role:{
                select:{
                    role_name:true
                }
            },
            listannouncement:true
        }
    })
    return result
})