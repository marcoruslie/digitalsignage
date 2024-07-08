export default()=>{
    const createUser = async (user) => {    
        const result = await $fetch('/api/user/createUser', {
            method: 'POST',
            body: {
                us_username: user.us_username,
                us_password: user.us_password,
                us_role: user.us_role
            }
        })
        return result
    }
    const getUser = async () => {
        const result = await $fetch('/api/user/getUser')
        return result
    }
    const loginUser = async (user) => {
        const result = await $fetch('/api/user/loginUser', {
            method: 'POST',
            body: {
                us_username: user.us_username,
                us_password: user.us_password
            }
        })
        sessionStorage.setItem('currentUser', JSON.stringify(result))
        return result
    }
    const deleteUser = async (user) => {    
        const result = await $fetch('/api/user/deleteUser', {
            method: 'DELETE',
            body: {
                us_id: user.us_id
            }
        })
        return result
    }
    return {
        createUser,
        getUser,
        loginUser,
        deleteUser
    }
}