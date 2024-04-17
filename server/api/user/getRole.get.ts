import {prisma} from '../../db/index'
export default defineEventHandler(async(event)=>{
    const result = await prisma.role.findMany()
    return result
})