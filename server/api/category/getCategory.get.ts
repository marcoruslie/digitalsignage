import {prisma} from '../../db/index'
export default defineEventHandler(async(event)=>{
    const result = await prisma.category.findMany()
    return result
})