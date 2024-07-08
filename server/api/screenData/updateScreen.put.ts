import {prisma} from '../../db/index'
export default defineEventHandler(async(event)=>{
    const body = await readBody(event)
    try{
        const result = await prisma.screen.update({
            where:{
                sc_id:body.sc_id
            },
            data:{
                sc_ip:body.sc_ip,
                sc_name:body.sc_name,
                sc_location:body.sc_location,
            }
        })
        return {
            statusCode:200,
            body:result
        }
    }catch(e){
        return {
            statusCode:400,
            body:{
                message:e.message
            }
        
        }
    }
})