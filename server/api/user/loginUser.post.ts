import {prisma} from '../../db/index'
import { sign, verify } from 'jsonwebtoken'
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
                    category:true
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
            },
            role:true
        }
    })
    if(user!=null){
        return user
    }
    
    return null
})