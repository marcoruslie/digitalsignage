import { promises as fs } from "fs"
import path from "path"
import sharp from "sharp"
import hbjs from "handbrake-js"
import { tmpdir } from "os"
export default defineEventHandler(async (event) => {
	// Extract form data
	const formData = await readMultipartFormData(event)

	if (!formData) {
		return {
			status: "error",
			message: "No file uploaded",
			filePath: "",
		}
	}

	// Extract the file and the new filename from the form data
	const file: any = formData.find((field) => field.name === "file")
	const newNameField = formData.find((field) => field.name === "fileName")
	const kategori = formData.find((field) => field.name === "kategori")
	if (!file) {
		return {
			status: "error",
			message: "File not found in form data",
			filePath: "",
		}
	}

	if (!newNameField || !newNameField.data) {
		return {
			status: "error",
			message: "New filename not provided",
			filePath: "",
		}
	}

	const newFilename = newNameField.data.toString()
	const ext = path.extname(file.filename).toLowerCase()

	// Create a temporary directory and file path
	const tempDir = tmpdir()
	const tempFilePath = path.join(tempDir, file.filename)

	// Save the file to the temporary path
	await fs.writeFile(tempFilePath, file.data)

	const resourcesDir = path.resolve("resources/uploads")
	await fs.mkdir(resourcesDir, { recursive: true })

	const newFilePath = path.join(resourcesDir, `${newFilename}${ext}`)

	try {
		if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
			// Compress and save the image using sharp
			await sharp(file.data)
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
			return {
				status: "error",
				message: "Unsupported file type",
				filePath: "",
			}
		}

		// Optionally, delete the temporary file
		await fs.unlink(tempFilePath)

		return {
			status: "success",
			message: "File uploaded, compressed, renamed, and saved successfully",
			filePath: newFilePath,
		}
	} catch (error) {
		console.error("Error processing the file:", error)
		return {
			status: "error",
			message: "Failed to compress and save the file",
			filePath: "",
		}
	}
})
