import { prisma } from "../../db/index"
import { promises as fs } from "fs"
import path from "path"
import sharp from "sharp"
import hbjs from "handbrake-js"
import { tmpdir } from "os"

export default defineEventHandler(async (event) => {
	const formData: any = await readMultipartFormData(event)
	const title = formData.find((field: any) => field.name === "title")
	const type = formData.find((field: any) => field.name === "kontenType")
	const cat_id = formData.find((field: any) => field.name === "category")
	const file = formData.find((field: any) => field.name === "file")

	if (!title || !type || !cat_id || !file) {
		return {
			statusCode: 400,
			body: {
				message: "Missing required fields",
			},
		}
	}

	const dataAnnouncement = {
		title: title.data.toString(),
		type: type.data.toString(),
		cat_id: JSON.parse(cat_id.data).id,
		cat_name: JSON.parse(cat_id.data).name.replace(" ", ""),
		file: file,
	}

	try {
		await prisma.$transaction(async (prisma) => {
			const announcement = await prisma.announcement.create({
				data: {
					an_title: dataAnnouncement.title,
					an_type: dataAnnouncement.type,
					an_cat_id: dataAnnouncement.cat_id,
					an_url: "",
				},
			})

			const newNameField = announcement.an_id
			const kategori = dataAnnouncement.cat_name
			const ext = path.extname(file.filename).toLowerCase()
			const tempDir = tmpdir()
			const tempFilePath = path.join(tempDir, file.filename)
			const resourcesDir = path.resolve(`resources/${kategori}`)
            const accFilePath = path.join("/_nuxt","resources", `${kategori}`, `${newNameField}${ext}`)
			const newFilePath = path.join(resourcesDir, `${newNameField}${ext}`)

			try {
				await fs.writeFile(tempFilePath, file.data)

				await fs.mkdir(resourcesDir, { recursive: true })

				if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
					// Compress and save the image using sharp
					await sharp(tempFilePath)
						.resize(800) // Resize to a max width of 800px
						.toFormat("webp") // Convert to webp for better compression
						.toFile(newFilePath)
				} else if ([".mp4", ".mov", ".avi"].includes(ext)) {
					await new Promise((resolve, reject) => {
						hbjs.spawn({
							input: tempFilePath, // Use the temporary file path
							output: newFilePath,
							preset: "Very Fast 720p30", // Adjust the preset as needed
						})
							.on("error", reject)
							.on("end", resolve.bind(null, null))
					})
				} else {
					throw new Error("Unsupported file type")
				}

				// Optionally, delete the temporary file
				await fs.unlink(tempFilePath)
			} catch (error) {
				console.error("Error processing the file:", error)
				throw new Error("Failed to compress and save the file")
			}

			await prisma.announcement.update({
				where: {
					an_id: announcement.an_id,
				},
				data: {
					an_url: accFilePath,
				},
			})
		})

		return {
			statusCode: 200,
			body: {
				message: "Announcement created successfully",
			},
		}
	} catch (error: any) {
		console.error("Error creating announcement:", error.message)
		return {
			statusCode: 400,
			body: {
				message: error.message,
			},
		}
	}
})
