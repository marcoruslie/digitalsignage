export default () => {
    const getListAnnouncement = async () => {
        const result = await $fetch('/api/announcement/getListAnnouncement')
        return result.json()
    }
    return {
        getListAnnouncement
    }
}