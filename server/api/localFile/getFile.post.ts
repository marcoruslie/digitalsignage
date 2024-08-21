import fs from "fs"
import path from "path"
export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	const fileUrl = body.url
	if (!fileUrl) {
		throw createError({
			statusCode: 400,
			statusMessage: "URL is required",
		})
	}
	const fullPath = path.join(process.cwd(), fileUrl)

	try {
		const data = fs.readFileSync(fullPath)
		return data.toString("base64")
	} catch (error) {
		throw createError({
			statusCode: 500,
			statusMessage: "Failed to read file",
		})
	}
})
