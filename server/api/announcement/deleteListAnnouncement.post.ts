import { ca } from "date-fns/locale"
import { prisma } from "../../db/index"
export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	try {
		const deleteListAnnouncement = await prisma.list_Announcement.delete({
			where: {
				la_id: body.la_id,
			},
		})
		return {
			status: 200,
			statusText: "Berhasil Delete List Pengumuman",
		}
	} catch (error:any) {
		return { status: 400, statusText: error.message }
	}
})
