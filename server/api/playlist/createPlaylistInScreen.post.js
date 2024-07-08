import { prisma } from '../../db/index'
export default defineEventHandler(async(event)=>{
    const body = await readBody(event)
    try{
        await prisma.playlist_in_Screen.create({
            data:{
                ps_pl_id: body.pl_id,
                ps_sc_id: body.sc_id
            }
        })
        return{
            statusCode: 200,
            body:{
                message: "Berhasil Menambahkan Playlist Dalam Screen"
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