import {prisma} from '../../db/index'
export default defineEventHandler(async(event)=>{
    const body = await readBody(event)
    const transactionPromise = [
        prisma.playlist.create({
            data: {
                pl_name: body.pl_name
            }
        })
    ]
    try{
        const transactionPromise2 = []
        await Promise.all(transactionPromise).then(async (result) => {
            body.list_announcement_id.forEach((item)=>{
                transactionPromise2.push(
                    prisma.list_in_Playlist.create({
                        data: {
                            lp_la_id: item,
                            lp_pl_id: result[0].pl_id
                        }
                    })
                )
            })
            await prisma.$transaction(transactionPromise2)
        }).catch((e) => {
            return {
                statusCode: 400,
                body: {
                    message: e.message
                }
            }
        })
        return {
            statusCode: 200,
            body: {
                message: 'Playlist created successfully'
            }
        }
    }catch(e){
        return{
            statusCode: 400,
            body: {
                message: e.message
            }
        }
    }
    
})