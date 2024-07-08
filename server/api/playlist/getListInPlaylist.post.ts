import { prisma } from '../../db/index'
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const result = await prisma.list_in_Playlist.findMany({
        where: {
            lp_pl_id: body.pl_id
        }
    })
    return result
})