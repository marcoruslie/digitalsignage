import {prisma} from '../../db/index'
export default defineEventHandler(async(event)=>{
    const body = await readBody(event)
    if(body.deleted == false){
        const result = await prisma.category.update({
            where: {
                cat_id: body.cat_id
            },
            data: {
                deletedAt: new Date()
            }
        })
        return {
            statusCode: 200,
            body:{
                message: "Kategori berhasil dinonaktifkan"
            }
        }
    }
    const result = await prisma.category.update({
        where: {
            cat_id: body.cat_id
        },
        data: {
            deletedAt: null
        }
    })
    return {
        statusCode: 200,
        body:{
            message: "Kategori berhasil diaktifkan kembali"
        }
    }
})