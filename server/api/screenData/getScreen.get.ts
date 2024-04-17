import {prisma} from '../../db/index'
export default defineEventHandler(async(event)=>{
    const result = await prisma.screen.findMany({
        include:{
            playlist:true
        }
    })
    return result
})