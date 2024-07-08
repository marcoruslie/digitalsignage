import { prisma } from '../../db/index'
export default defineEventHandler(async(event)=>{
    const body = await readBody(event)
    let result = []
    if(!body.sc_id){
        result = await prisma.playlist_in_Screen.findFirst({
            where:{
                ps_sc_id: body.sc_id
            }
        })
    }
    else{
        result = await prisma.playlist_in_Screen.findMany()
    }
    return{
        statusCode: 200,
        body: result
    }
})