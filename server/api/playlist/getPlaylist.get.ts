import {prisma} from '../../db/index'
export default defineEventHandler(async(event)=>{
    const result = await prisma.playlist.findMany({
        include:{
            listannouncement:{
                include:{
                    announcement_in_list:{
                        include:{
                            announcement: true
                        }
                    }
                }
            }
        }
    })
    return result
})