import {prisma} from '../../db/index'
export default defineEventHandler(async(event)=>{
    const body = await readBody(event)
    try{
        const result = await prisma.category.create({
            data: body
        })
        return {
            statusCode: 200,
            body: {
                message: 'Category created successfully',
                data: result
            }
        }
    }catch(e){
        return {
            statusCode: 400,
            body: {
                message: e.message
            }
        }
    }
})