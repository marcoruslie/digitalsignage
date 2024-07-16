export default () => {
	const getCategory = async () => {
		const result = await $fetch("/api/category/getCategory")
		return result
	}
	const getAllCategory = async (data) => {
		const result = await $fetch("/api/category/getAllCategory", {
			method: "POST",
			body: {
				cat_id: data,
			},
		})
		return result
	}
	const addCategory = async (data) => {
		const result = await $fetch("/api/category/createCategory", {
			method: "POST",
			body: {
				cat_name: data.cat_name,
				cat_qty: parseInt(data.cat_qty),
				cat_duration: parseInt(data.cat_duration),
			},
		})
		return result
	}
	const editCategory = async (data) => {
		const result = await $fetch("/api/category/updateCategory", {
			method: "PUT",
			body: {
				cat_id: data.cat_id,
				cat_name: data.cat_name,
				cat_qty: parseInt(data.cat_qty),
				cat_duration: parseInt(data.cat_duration),
				user: data.user,
			},
		})
		return result
	}
	const setActiveCategory = async (data) => {
		const getCategory = await getAllCategory(data)
		let deleted = true
		if (getCategory.body.data[0].deletedAt == null) {
			deleted = false
		}
		const result = await $fetch("/api/category/deleteCategory", {
			method: "PUT",
			body: {
				cat_id: data,
				deleted: deleted,
			},
		})
		return result
	}
	return {
		getCategory,
		addCategory,
		editCategory,
		getAllCategory,
		setActiveCategory,
	}
}
