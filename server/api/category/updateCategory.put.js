import { prisma } from "../../db/index"

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	
	try {
		// Start a transaction
		await prisma.$transaction(async (prisma) => {
			// Update category
			await prisma.category.update({
				where: {
					cat_id: body.cat_id,
				},
				data: {
					cat_name: body.cat_name,
					cat_duration: body.cat_duration,
					cat_qty: body.cat_qty,
				},
			})

			// Delete existing category_for_user entries
			await prisma.category_For_User.deleteMany({
				where: {
					cu_cat_id: body.cat_id,
				},
			})

			// Create new category_for_user entries
			const createCategoryUserPromises = body.user.map((e) =>
				prisma.category_For_User.create({
					data: e,
				})
			)

			await Promise.all(createCategoryUserPromises)
		})

		return {
			statusCode: 200,
			body: {
				message: "Category updated successfully",
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
