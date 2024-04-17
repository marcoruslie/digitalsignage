import {prisma} from '../../db/index'
export default defineEventHandler(async(event)=>{
    const body = await readBody(event)
    const result = await prisma.playlist.delete({
        where: {
            pl_id: body.pl_id
        }
    })
    return result
})