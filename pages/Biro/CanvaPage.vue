<template @drop.prevent="dropHandler" @dragover.prevent>
	<canvas
		ref="canvasRef"
		class="rounded-md"
		@drop.prevent="handleDrop"
		@dragover.prevent="handleDragOver"></canvas>
	<div
		class="flex items-center rounded-md space-x-3 bg-[#006780] p-2"
		:style="{ height: `calc(100vh - ${canvasHeight}px)` }">
		<button
			@click="addText"
			class="border-2 border-Primary bg-PrimaryContainer p-1 rounded-lg h-[55px] w-[55px]">
			<img
				src="\AddText.png"
				class="w-[40px] h-[40px]"
				alt="" />
		</button>
		<button
			@click="addRect"
			class="border-2 border-Primary bg-PrimaryContainer p-1 rounded-lg h-[55px] w-[55px]">
			<img
				src="\AddText.png"
				class="w-[40px] h-[40px]"
				alt="" />
		</button>
		<input
			v-model="fontSize"
			v-on:change="fontSizeOnChange"
			type="number"
			class="border-2 border-Primary bg-PrimaryContainer rounded-lg text-center w-[55px] h-[55px] p-1 text-OnPrimaryContainer" />
		<select
			v-model="fontWeight"
			v-on:change="fontWeightOnChange"
			class="border-2 border-Primary bg-PrimaryContainer rounded-lg text-center h-[55px] text-OnPrimaryContainer">
			<option
				value="normal"
				class="text-OnPrimaryContainer">
				Normal
			</option>
			<option
				value="bold"
				class="text-OnPrimaryContainer">
				Bold
			</option>
		</select>
		<div
			class="flex flex-col items-center border-2 border-Primary bg-PrimaryContainer text-OnPrimaryContainer rounded-lg h-[55px] p-1 w-[100px]">
			<div class="text-OnPrimaryContainer">Background</div>
			<input
				type="color"
				class="h-[25px] w-full" />
		</div>
		<div
			class="flex flex-col items-center border-2 border-Primary bg-PrimaryContainer text-OnPrimaryContainer rounded-lg h-[55px] p-1 w-[100px]">
			<div class="text-OnPrimaryContainer">Font Color</div>
			<input
				type="color"
				class="h-[45px] w-full" />
		</div>
	</div>
</template>

<script setup>
	const canvasRef = ref(null)
	const canvas = ref(null)
	const canvasHeight = ref(0)
	const fontSize = ref(0)
	const fontWeight = ref("normal")
	onMounted(async () => {
		if (process.client) {
			const { fabric } = await import("fabric")
			canvas.value = new fabric.Canvas(canvasRef.value, {
				width: window.innerWidth,
				height: window.innerHeight - 100,
				backgroundColor: "white",
			})
			canvas.value.on("mouse:dblclick", (event) => {
				if (event.target && event.target.type === "textbox") {
					const textbox = event.target
					textbox.enterEditing()
				}
			})
			canvas.value.on("mouse:down", (event) => {
				if (event.target && event.target.type === "textbox") {
					const textbox = event.target
					fontSize.value = textbox.fontSize
					ObjectWidth.value = textbox.width
					ObjectHeigth.value = textbox.height
				}
			})
			canvas.value.on("mouse:up", (event) => {
				console.log(event)
			})
			canvasHeight.value = canvasRef.value.clientHeight
		}
	})

	function fontSizeOnChange() {
		const activeObject = canvas.value.getActiveObject()
		if (activeObject && activeObject.type === "textbox") {
			activeObject.fontSize = fontSize.value
			canvas.value.renderAll()
		}
	}

	function fontWeightOnChange() {
		const activeObject = canvas.value.getActiveObject()
		if (activeObject && activeObject.type === "textbox") {
			activeObject.fontWeight = fontWeight.value
			canvas.value.renderAll()
		}
	}
	async function addText() {
		const { fabric } = await import("fabric")
		const text = new fabric.Textbox("Your text here", {
			width: 80,
			fontSize: 20,
			fill: "black",
			hasControls: false,
		})
		canvas.value.add(text)
	}
	async function addRect() {
		const { fabric } = await import("fabric")
		const rect = new fabric.Rect({
			width: 80,
			height: 80,
			fill: "black",
		})

		canvas.value.add(rect)
	}
	const handleDragOver = (event) => {
		event.preventDefault()
		alert("drag")
	}
	const handleDrop = (event) => {
		event.preventDefault()
		alert("drag")
		const file = event.dataTransfer.files[0]
		if (file.type && file.type.indexOf("image") === 0) {
			const reader = new FileReader()
			reader.onload = function (event) {
				const img = new Image()
				img.onload = function () {
					const fabricImg = new fabric.Image(img, {
						left: event.clientX - canvasRef.value.getBoundingClientRect().left,
						top: event.clientY - canvasRef.value.getBoundingClientRect().top,
					})
					canvas.add(fabricImg)
				}
				img.src = event.target.result
			}
			reader.readAsDataURL(file)
		} else {
			alert("Please drop an image file.")
		}
	}
</script>
