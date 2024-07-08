import {prisma} from '../../db/index'
export default defineEventHandler(async(event)=>{
    const result = await prisma.playlist.findMany({
        where:{
            deletedAt:null
        },
        include:{
            playlist_in_screen:{
                include:{
                    screen:true
                }
            },
            list_in_playlist:{
                include:{
                    listannouncement:{
                        include:{
                            announcement_in_list:{
                                include:{
                                    announcement:true
                                }
                            },
                            category:true

                        }
                    }
                }
            }
        },
        orderBy:{
            createdAt:'desc'
        }
    })
    return result
})