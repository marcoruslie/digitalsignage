import jwt from 'jsonwebtoken'

export default () => {
    const login = async (data)=>{
        const result = await $fetch('/api/user/loginUser',{
            method: 'POST',
            body: data
        })
        
    }
}