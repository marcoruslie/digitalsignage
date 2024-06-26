import {prisma} from '../../db/index'
export default defineEventHandler(async(event)=>{
    try{
        const result = await prisma.category.findMany({
            where:{
                deletedAt:null
            },
            include:{
                listannouncement:{
                    where:{
                        deletedAt:null
                    },
                    include:{
                        announcement_in_list:{
                            where:{
                                deletedAt:null
                            },
                            include:{
                                announcement:true
                            }
                        },
                    }
                },
                categoryuser:{
                    include:{
                        user:{
                            select:{
                                us_username:true,
                                role:{
                                    select:{
                                        role_name:true
                                    }
                                }
                            }
                        }
                    },
                    orderBy:{
                        cu_us_username:'asc'
                    }
                }
            },
            orderBy:{
                createdAt:'asc'
            }
        })
        return {
            statusCode: 200,
            body: {
                message: 'Categories fetched successfully',
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