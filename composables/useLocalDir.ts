export default () => {
	const getFileData = async (fileUrl: string) => {
		try {
			const data = await $fetch("/api/localFile/getFile", {
				method: "POST",
				body: {
					url: fileUrl,
				},
			})
			return data
		} catch (error) {
			throw new Error("Failed to read file")
		}
	}
	return { getFileData }
}
