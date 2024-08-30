import { prisma } from "../../db/index"
import fs from "fs"
import path from "path"

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	const { title, category, type, image } = body
	if (!title || !category || !type || !image) {
		return {
			statusCode: 400,
			body: {
				message: "Missing required fields",
			},
		}
	}
	const dataAnnouncement = {
		title: title,
		type: type,
		cat_id: category.id,
		cat_name: category.name.replace(" ", ""),
		file: image,
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
			const ext = path.extname(image.filename).toLowerCase()
			const resourcesDir = path.resolve(`resources/${kategori}`)
			const base64Data = image.replace(/^data:image\/png;base64,/, "")
			const accFilePath = path.join("/_nuxt", "resources", `${kategori}`, `${newNameField}${ext}`)
			const newFilePath = path.join(resourcesDir, `${newNameField}${ext}`)
			try {
				if (!fs.existsSync(resourcesDir)) {
					fs.mkdirSync(resourcesDir, { recursive: true })
				}
				fs.writeFileSync(newFilePath, base64Data, "base64")
				await prisma.announcement.update({
					where: {
						an_id: announcement.an_id,
					},
					data: {
						an_url: accFilePath,
					},
				})
			} catch (error) {
				console.error(error)
				return {
					statusCode: 500,
					body: {
						message: "Internal server error",
					},
				}
			}
		})
	} catch (error) {
		console.error(error)
		return {
			statusCode: 500,
			body: {
				message: "Internal server error",
			},
		}
	}
})
