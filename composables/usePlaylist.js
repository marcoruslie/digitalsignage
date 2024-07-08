export default () => {
    const getPlaylist = async () => {
        const result = await $fetch('/api/playlist/getPlaylist')
        return result
    }
    const createPlaylist = async (playlist) => {
        const result = await $fetch('/api/playlist/createPlaylist', {
            method: 'POST',
            body: {
                pl_name: playlist.pl_name,
                list_announcement_id: playlist.list_announcement_id
            }
        })
        return result
    }
    const updatePlaylist = async (playlist) => {
        const getListInPlaylist = await $fetch('/api/playlist/getListInPlaylist', {
            method: 'POST',
            body: {
                pl_id: playlist.pl_id
            }
        })
        const getPlaylistInScreen = await $fetch('/api/playlist/getPlaylistInScreen',{
            method: 'POST',
            body: {
                pl_id: playlist.sc_id
            }
        })
        
        if(getPlaylistInScreen!=null){
            await $fetch('/api/playlist/deletePlaylistInScreen', {
                method: 'DELETE',
                body: {
                    pl_id: playlist.pl_id
                }
            })
        }
        if(getListInPlaylist.length > 0){
            await $fetch('/api/playlist/deleteListInPlaylist', {
                method: 'DELETE',
                body: {
                    pl_id: playlist.pl_id
                }
            })
        }
        const result = await $fetch('/api/playlist/updatePlaylist', {
            method: 'PUT',
            body: {
                pl_id: playlist.pl_id,
                listannouncement: playlist.listannouncement
            }
        })
        return result
        
    }
    const deletePlaylist = async (playlist) => {
        const result = await $fetch('/api/playlist/deletePlaylist', {
            method: 'DELETE',
            body: {
                pl_id: playlist,
            }
        })
        return result
    }
    return {
        getPlaylist,
        createPlaylist,
        deletePlaylist,
        updatePlaylist
    }
}