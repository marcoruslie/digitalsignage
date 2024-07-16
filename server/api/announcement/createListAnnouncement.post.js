import { prisma } from "../../db/index"

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	try {
		// Start a transaction
		await prisma.$transaction(async (prisma) => {
			// Create list_Announcement
			const createdListAnnouncement = await prisma.list_Announcement.create({
				data: {
					la_content: body.la_content,
					la_title: body.la_title,
					la_cat_id: body.la_cat_id,
					la_us_username: body.la_us_username,
				},
			})

			// Create announcements
			const announcementPromises = body.filteredAnnouncements.map((announcement) =>
				prisma.announcement.create({
					data: {
						an_id: announcement.an_id,
						an_title: announcement.an_title,
						an_type: announcement.an_type,
						an_url: announcement.an_url,
					},
				})
			)
			await Promise.all(announcementPromises)

			// Create announcement_in_List
			const announcementInListPromises = body.announcements.map((announcement) =>
				prisma.announcement_in_List.create({
					data: {
						ail_an_id: announcement.an_id,
						ail_la_id: createdListAnnouncement.la_id,
					},
				})
			)
			await Promise.all(announcementInListPromises)
		})

		return {
			statusCode: 200,
			body: {
				message: "List Announcement created successfully",
			},
		}
	} catch (e) {
		return {
			statusCode: 400,
			body: {
				message: e.message,
			},
		}
	}
})
