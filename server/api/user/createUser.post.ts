import {prisma} from '../../db/index'
export default defineEventHandler( async(event)=>{
    const body = await readBody(event)
    const result = await prisma.user.create({
        data: body
    })
})