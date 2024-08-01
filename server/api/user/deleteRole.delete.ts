import {prisma} from '../../db/index'
export default defineEventHandler(async (event)=>{
    const body = await readBody(event)
    const result = await prisma.role.delete({
        where: {
            role_id: body.role_id
        }
    })
    return {
        status: 200,
        body: result
    }
})