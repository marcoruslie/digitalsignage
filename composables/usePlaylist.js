export default () => {
    const getPlaylist = async () => {
        const result = await fetch('/api/playlist/getPlaylist')
        return result
    }
    const createPlaylist = async (playlist) => {
        const result = await fetch('/api/playlist/createPlaylist', {
            method: 'POST',
            body: {
                pl_name: playlist.pl_name,
            }
        })
        return result
    }
    const deletePlaylist = async (playlist) => {
        const result = await fetch('/api/playlist/deletePlaylist', {
            method: 'DELETE',
            body: {
                pl_id: playlist.pl_id,
            }
        })
        return result
    }
    return {
        getPlaylist,
        createPlaylist,
        deletePlaylist
    }
}