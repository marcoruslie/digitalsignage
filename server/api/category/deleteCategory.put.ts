import {prisma} from '../../db/index'
export default defineEventHandler(async(event)=>{
    const body = await readBody(event)
    const result = await prisma.category.update({
        where: {
            cat_id: body.cat_id
        },
        data: {
            deletedAt: new Date()
        }
    })
    return result
})