export default ()=>{
    const getCategory = async () => {
        const result = await $fetch('/api/category/getCategory')
        return result
    }
    const addCategory = async (data) => {
        const result = await $fetch('/api/category/createCategory', {
            method: 'POST',
            body: {
                cat_name:data.cat_name,
                cat_qty: parseInt(data.cat_qty) ,
                cat_duration: parseInt(data.cat_duration),
            }
        })
        return result
    }
    const editCategory = async (data) => {
        
        const result = await $fetch('/api/category/updateCategory', {
            method: 'PUT',
            body: {
                cat_id: data.cat_id,
                cat_name:data.cat_name,
                cat_qty: parseInt(data.cat_qty) ,
                cat_duration: parseInt(data.cat_duration),
                user: data.user
            }
        })
        return result
    }
    return{
        getCategory,
        addCategory,
        editCategory
    }
}