import {prisma} from '../../db/index'
export default defineEventHandler(async (event)=>{
    const body = await readBody(event)
    const result = await prisma.role.create({
        data: {
            role_name: body.role_name,
        }
    })
    return {
        statusCode: 200,
        body: JSON.stringify(result)
    }
})