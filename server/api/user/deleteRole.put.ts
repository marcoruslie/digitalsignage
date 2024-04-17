import {prisma} from '../../db/index'
export default defineEventHandler(async (event)=>{
    const body = await readBody(event)
    const result = await prisma.role.update({
        where: {role_id: body.role_id},
        data: {deletedAt: new Date()}
    })
    return {
        statusCode: 200,
        body: JSON.stringify(result)
    }
})