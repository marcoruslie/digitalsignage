import fs from "fs"
import path from "path"

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	try {
		const fileUrl = `https://drive.google.com/uc?id=${body.file_id}&export=download`
		// const fileUrl = `${body.file_id}`;

		const response = await fetch(fileUrl)
		if (!response.ok) {
			throw new Error(response)
		}

		// Extract the filename and extension from the Content-Disposition header
		const contentDisposition = response.headers.get("Content-Disposition")
		const matches = contentDisposition.match(/filename="(.+?)"/)
		const filename = matches ? matches[1] : "filename" // Get the filename without extension
		const filenameOnly = filename.split(".")[0]
		const extension = filename.split(".")[1]
		const fileId = filenameOnly.split("_")[0]
		const fileIdName = fileId + "." + extension
		const arrayBuffer = await response.arrayBuffer()
		const buffer = Buffer.from(arrayBuffer)
		const currentDir = process.cwd()
		// Construct the full file path
		const filePath = path.join(
			currentDir,
			"resources",
			"PengumumanKegiatan",
			`${fileId}`,
			`${filenameOnly.split("_")[1]}`,
			`${filename}`
		)
		const directoryPath = path.dirname(filePath)
		if (!fs.existsSync(directoryPath)) {
			fs.mkdirSync(directoryPath, { recursive: true }) // Create directory recursively
		}

		// Write the buffer data to the file
		fs.writeFileSync(filePath, buffer)
		const editedFile = path.join(
			"/_nuxt/resources",
			"PengumumanKegiatan",
			`${fileId}`,
			`${filenameOnly.split("_")[1]}`,
			`${filename}`
		)
		return {
			statusCode: 200,
			body: {
				message: "File downloaded successfully",
				filePath: editedFile,
			},
		}
	} catch (error) {
		return {
			statusCode: 500,
			body: {
				message: "Failed to download file",
				error: error.message,
			},
		}
	}
})
