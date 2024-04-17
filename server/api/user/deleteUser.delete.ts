import {prisma} from '../../db/index'
export default defineEventHandler(async(event)=>{
    const body = await readBody(event)
    const result = await prisma.user.delete({
        where: {
            us_username: body.us_username
        }
    })
    return result
})