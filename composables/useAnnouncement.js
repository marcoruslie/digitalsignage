export default () => {
	const getListAnnouncement = async () => {
		const result = await $fetch("/api/announcement/getListAnnouncement")
		return result
	}
	const addListAnnouncement = async (data) => {
		const announcement = await $fetch("/api/announcement/getAnnouncement")
		const selectedAnnouncement = data.announcements
		const filteredAnnouncement = selectedAnnouncement.filter((item) => {
			return !announcement.some((ann) => ann.an_id === item.an_id)
		})
		try {
			const result = await $fetch("/api/announcement/createListAnnouncement", {
				method: "POST",
				body: {
					kategoriName: data.kategoriName,
					la_cat_id: data.kategori,
					la_title: data.listName,
					la_content: "",
					la_us_username: data.currentUser,
					filteredAnnouncements: filteredAnnouncement,
					announcements: selectedAnnouncement,
				},
			})

			return result
		} catch (e) {
			return e
		}
	}
	const getAnnouncement = async () => {
		const result = await $fetch("/api/announcement/getAnnouncement")
		return result
	}
	const addAnnouncement = async (data) => {
		const formData = new FormData()
		// title: judulKonten.value,
		// 	category: kategoriKonten.value,
		// 	previewUrl: previewUrl.value,
		// 	kontenType: isImage.value ? "image" : "video",
		formData.append("title", data.title)
		formData.append("file", data.file)
		formData.append("category", JSON.stringify(data.category))
		formData.append("kontenType", data.kontenType)
		const result = await $fetch("/api/announcement/createAnnouncement", {
			method: "POST",
			body: formData,
		})
		return result
	}
	const deleteListAnnouncement = async (data) => {
		console.log(data)
		const result = await $fetch("/api/announcement/deleteListAnnouncement", {
			method: "POST",
			body: {
				la_id: data.la_id,
			},
		})
		return result
	}

	return {
		getListAnnouncement,
		addListAnnouncement,
		getAnnouncement,
		deleteListAnnouncement,
		addAnnouncement,
	}
}
