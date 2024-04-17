import {prisma} from '../../db/index'
export default defineEventHandler(async(event)=>{
    const body = await readBody(event)
    try{
        const result = await prisma.screen.create({
            data:body
        })
        console.log(result)
        return result
    }catch(e){
        console.log(e)
        return e
    }
    
})