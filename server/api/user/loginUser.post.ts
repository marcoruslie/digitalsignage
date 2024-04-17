import {prisma} from '../../db/index'
export default defineEventHandler(async(event)=>{
    const body = await readBody(event)
    const user = await prisma.user.findFirst({
        where: {
            us_username: body.us_username,
            us_password: body.us_password
        },
        include:{
            categoryuser:{
                include:{
                    category:{
                        select:{
                            cat_name: true
                        },
                    },
                }
            },
            listannouncement:{
                include:{
                    announcement_in_list:{
                        include:{
                            announcement:true
                        }
                    }
                }
            }
        }
    })
    return user
})