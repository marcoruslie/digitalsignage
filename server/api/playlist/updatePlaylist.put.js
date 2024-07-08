import { prisma } from '../../db/index'
export default defineEventHandler(async(event)=>{
    const body = await readBody(event)
    const transactionPromise = []
    try{
        if(body.listannouncement.length > 0){
            body.listannouncement.forEach((list)=>{
                transactionPromise.push(
                    prisma.list_in_Playlist.create({
                        data:{
                            lp_la_id: list,
                            lp_pl_id: body.pl_id
                        }
                    })
                )
            })
        }
        await prisma.$transaction(transactionPromise)
        return{
            statusCode: 200,
            body:{
                message: "Berhasil Mengupdate Playlist"
            } 
        } 
    }catch(e){
        return{
            statusCode: 500,
            body:{
                message: e.message
            }
        }
    }
})