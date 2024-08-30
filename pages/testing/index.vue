<template>
	<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
		<h1 class="text-2xl font-bold mb-4">Fabric.js Editor</h1>
		<div class="relative">
			<canvas
				ref="canvasRef"
				:width="canvasWidth"
				:height="canvasHeight"></canvas>
		</div>
		<div class="mt-4 space-y-4">
			<!-- Background Controls -->
			<div>
				<label>Background Color: </label>
				<input
					type="color"
					v-model="backgroundColor"
					@input="setBackgroundColor" />
			</div>
			<div>
				<label class="block mb-2">Add Image: </label>
				<label
					for="image-upload"
					class="w-40 flex items-center cursor-pointer bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 transition">
					<svg
						class="w-10 h-10 mr-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 7v13a1 1 0 001 1h14a1 1 0 001-1V7m-9 4l3 3 4-4m-7-4H5a1 1 0 00-1 1v2m15-2h-5M6 5h.01"></path>
					</svg>
					<span>Add Image</span>
					<input
						id="image-upload"
						type="file"
						class="hidden"
						@change="addImageToCanvas" />
				</label>
			</div>

			<!-- Text Controls -->
			<div>
				<button @click="addText">Add Text</button>
				<div v-if="activeText">
					<label>Text: </label>
					<input
						type="text"
						v-model="activeText.text"
						@input="updateText" />
					<label>Font Size: </label>
					<input
						type="range"
						min="10"
						max="100"
						v-model="fontSize"
						@input="updateTextSize" />
					<label>Font Weight: </label>
					<select
						v-model="fontWeight"
						@change="updateTextWeight">
						<option value="normal">Normal</option>
						<option value="bold">Bold</option>
					</select>
					<label>Font Color: </label>
					<input
						type="color"
						v-model="fontColor"
						@input="updateTextColor" />
					<label>Text Background Color: </label>
					<input
						type="color"
						v-model="textBackgroundColor"
						@input="updateTextBackgroundColor" />
				</div>
			</div>

			<!-- Save Canvas as Image -->
			<div>
				<button @click="saveCanvasAsImage">Save as Image</button>
			</div>
		</div>
	</div>
</template>
<script setup>
	// Canvas element ref
	const canvasRef = ref(null)
	const canvas = ref(null)

	// Background properties
	const backgroundColor = ref("#ffffff")

	// Text properties
	const activeText = ref(null)
	const fontSize = ref(30)
	const fontWeight = ref("normal")
	const fontColor = ref("#000000")
	const textBackgroundColor = ref("#ffffff")

	// Canvas dimensions
	const canvasWidth = ref(800)
	const canvasHeight = ref(600)

	const addText = async () => {
		const { fabric } = await import("fabric")
		const text = new fabric.Text("Hello, World!", {
			left: 100,
			top: 100,
			fontSize: fontSize.value,
			fontWeight: fontWeight.value,
			fill: fontColor.value,
			backgroundColor: textBackgroundColor.value,
		})
		canvas.value.add(text)
		canvas.value.setActiveObject(text)
		activeText.value = text
	}

	const updateText = () => {
		if (activeText.value) {
			activeText.value.set("text", activeText.value.text)
			canvas.value.renderAll()
		}
	}

	const updateTextSize = () => {
		if (activeText.value) {
			activeText.value.set("fontSize", fontSize.value)
			canvas.value.renderAll()
		}
	}

	const updateTextWeight = () => {
		if (activeText.value) {
			activeText.value.set("fontWeight", fontWeight.value)
			canvas.value.renderAll()
		}
	}

	const updateTextColor = () => {
		if (activeText.value) {
			activeText.value.set("fill", fontColor.value)
			canvas.value.renderAll()
		}
	}

	const updateTextBackgroundColor = () => {
		if (activeText.value) {
			activeText.value.set("backgroundColor", textBackgroundColor.value)
			canvas.value.renderAll()
		}
	}

	const setBackgroundColor = () => {
		canvas.value.setBackgroundColor(backgroundColor.value, canvas.value.renderAll.bind(canvas.value))
	}

	const addImageToCanvas = async (event) => {
		const { fabric } = await import("fabric")
		const file = event.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = (f) => {
				fabric.Image.fromURL(f.target.result, (img) => {
					// Optionally, you can set default size or scaling here
					img.set({
						left: 100,
						top: 100,
						selectable: true,
						hasBorders: true,
						hasControls: true,
					})
					canvas.value.add(img)
					canvas.value.setActiveObject(img)
				})
			}
			reader.readAsDataURL(file)
		}
	}

	const saveCanvasAsImage = () => {
		const dataURL = canvas.value.toDataURL({
			format: "png",
			quality: 0.8,
		})
		const link = document.createElement("a")
		link.href = dataURL
		link.download = "canvas-image.png"
		link.click()
	}

	onMounted(async () => {
		const { fabric } = await import("fabric")
		canvas.value = new fabric.Canvas(canvasRef.value, {
			width: canvasWidth.value,
			height: canvasHeight.value,
			backgroundColor: backgroundColor.value,
			preserveObjectStacking: true,
		})

		// Allow objects to be moved outside the canvas
		canvas.value.on("object:moving", (event) => {
			const obj = event.target
			if (obj) {
				obj.setCoords()
				const padding = 100 // Amount of extra space allowed around canvas edges
				if (obj.left < -padding) obj.left = -padding
				if (obj.top < -padding) obj.top = -padding
				if (obj.left > canvasWidth.value + padding) obj.left = canvasWidth.value + padding
				if (obj.top > canvasHeight.value + padding) obj.top = canvasHeight.value + padding
			}
		})
	})
</script>
