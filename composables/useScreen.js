export default () => {
	const getScreen = async () => {
		const result = await $fetch("/api/screenData/getScreen")
		return result
	}
	const createScreen = async (screen) => {
		console.log(screen)
		const result = await $fetch("/api/screenData/createScreen", {
			method: "POST",
			body: {
				sc_name: screen.sc_name,
				sc_location: screen.sc_location,
				sc_ip: "http://" + screen.sc_ip,
			},
		})
		return result
	}
	const updateScreen = async (screen) => {
		console.log(screen)
		const result = await $fetch("/api/screenData/updateScreen", {
			method: "PUT",
			body: {
				sc_id: screen.sc_id,
				sc_name: screen.sc_name,
				sc_location: screen.sc_location,
				sc_ip: screen.sc_ip,
			},
		})
		return result
	}
	const deleteScreen = async (screen) => {
		const result = await $fetch("/api/screenData/deleteScreen", {
			method: "DELETE",
			body: {
				sc_id: screen.sc_id,
			},
		})
		return result
	}
	return {
		getScreen,
		createScreen,
		deleteScreen,
		updateScreen,
	}
}
