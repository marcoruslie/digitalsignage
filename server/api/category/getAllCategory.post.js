import { prisma } from "../../db/index"
export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	try {
		if (body != null && body.cat_id != null) {
			const result = await prisma.category.findMany({
				where: {
					cat_id: body.cat_id,
				},
			})
			return {
				statusCode: 200,
				body: {
					message: "Categories fetched successfully",
					data: result,
				},
			}
		}
		const result = await prisma.category.findMany({
			include: {
				listannouncement: {
					where: {
						deletedAt: null,
					},
					include: {
						announcement_in_list: {
							where: {
								deletedAt: null,
							},
							include: {
								announcement: true,
							},
						},
					},
				},
				categoryuser: {
					include: {
						role: true,
					},
					orderBy: {
						cu_role_id: "asc",
					},
				},
			},
			orderBy: {
				createdAt: "asc",
			},
		})
		return result
	} catch (e) {
		return {
			statusCode: 400,
			body: {
				message: e.message,
			},
		}
	}
})
