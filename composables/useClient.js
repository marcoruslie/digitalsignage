export default () => {
    const refreshClient = async () => {
        await $fetch('/api/refresh')
    }
    return {
        refreshClient
    }
}