import { prisma } from '../../db/index'
export default defineEventHandler(async(event)=>{
    const body = await readBody(event)
    try{
        await prisma.playlist_in_Screen.deleteMany({
            where:{
                ps_pl_id: body.pl_id
            }
        })
        return{
            statusCode: 200,
            body:{
                message: "Berhasil Menghapus Playlist"
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