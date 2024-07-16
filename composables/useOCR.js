export default () => {
	const ocrImage = async (data) => {
		if (data.file == "new") {
		} else {
			const result = await $fetch("/api/ocr/download", {
				method: "POST",
				body: {
					url: data.url,
					type: data.type,
					typeId: data.typeId,
				},
			})
			return result
		}
	}
}
