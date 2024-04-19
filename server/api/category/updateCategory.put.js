import { prisma } from '../../db/index'
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    // return {
    //     body:{
    //         message:body
    //     }
    // }
    const transactionPromise = [
        prisma.category.update({
            where: {
                cat_id: body.cat_id
            },
            data: {
                cat_name: body.cat_name,
                cat_duration: body.cat_duration,
                cat_qty: body.cat_qty,
            },
        })
    ]
    transactionPromise.push(prisma.category_For_User.deleteMany({
        where: {
            cu_cat_id: body.cat_id
        }
    }))
    body.user.forEach(e => {
        const addCategoryUser = prisma.category_For_User.create({
            data:e
        })
        transactionPromise.push(addCategoryUser)
    });
    try {
        await prisma.$transaction(transactionPromise)
        return {
            statusCode: 200,
            body: {
                message: 'Category updated successfully'
            }
        }
    } catch (e) {
        
        return {
            statusCode: 400,
            body: {
                message: e.message
            }
        }
    }
})