<template>
	<NuxtLoadingIndicator />
	<div class="bg-cyan-700 h-svh w-full p-2 flex space-x-3">
		<div class="flex flex-col h-full w-[20%] bg-white rounded-xl p-2 space-y-2">
			<NavbarBiro />
		</div>
		<div
			v-if="currentUser != null"
			class="h-full w-[80%] bg-white rounded-xl p-2 flex-col flex">
			<div class="flex justify-between items-center">
				<div class="text-Primary font-bold text-2xl">Edit/Tambah Pengumuman</div>
				<div
					class="flex space-x-3"
					v-if="uploadType == 'ekstraksi'">
					<button
						@click="toggleModal(modalShowPengumuman)"
						class="bg-Primary rounded text-OnPrimary px-4 py-1 hover:text-OnPrimaryContainer hover:bg-PrimaryContainer hover:duration-300">
						List Pengumuman
					</button>
					<input
						type="text"
						v-model="imageUrl"
						class="border-gray-400 border rounded"
						placeholder="URL FILE"
						@focusout="onFileChange" />
					<input
						type="file"
						@change="onFileChange" />
				</div>
			</div>
			<div class="border-b-2 border-Primary mt-1"></div>
			<!-- Langsung Upload -->
			<div
				:class="uploadType == 'langsung' ? 'flex-grow' : 'hidden'"
				class="flex flex-col flex-grow w-full justify-center overflow-hidden">
				<div class="flex flex-1 flex-col space-y-2">
					<input
						type="file"
						@change="handleFileUpload" />
					<!-- Kategori -->
					<select
						class="rounded border px-4 py-2"
						v-model="kategoriKonten"
						placeholder="Pilih Kategori">
						<option
							v-for="data in currentUser.role.categoryuser"
							:disabled="
								data.category.cat_name == 'Lowongan Magang' ||
								data.category.cat_name == 'Pengumuman Kampus' ||
								data.category.cat_name == 'Pengumuman Kegiatan' ||
								data.category.cat_name == 'Lowongan Kerja'
							"
							:value="{ id: data.cu_cat_id, name: data.category.cat_name }">
							{{ data.category.cat_name }}
						</option>
					</select>
					<!-- Title -->
					<input
						v-model="judulKonten"
						type="text"
						class="rounded border px-4 py-2"
						placeholder="Judul Konten" />
				</div>
				<div class="flex justify-center h-full items-center transform overflow-hidden">
					<!-- Image Preview -->
					<img
						v-if="isImage"
						:src="previewUrl"
						alt="Image Preview"
						class="h-full" />
					<!-- Video Preview -->
					<video
						v-if="isVideo"
						controls
						class="h-full">
						<source
							:src="previewUrl"
							type="video/mp4" />
						Your browser does not support the video tag.
					</video>
				</div>
			</div>
			<!-- Ekstraksi Teks -->
			<div
				v-if="uploadType == 'ekstraksi'"
				class="flex-grow flex p-1 space-x-1 justify-end overflow-hidden">
				<div class="w-[10%] min-w-[10%] max-h-full h-full flex-col flex items-center overflow-auto">
					<div class="text-Primary font-bold text-lg">Property</div>
					<div
						class="flex flex-col flex-grow border border-black rounded w-full pt-2 items-center space-y-1 overflow-auto">
						<!-- OBJECT SECTION -->
						<div
							class="hover:bg-PrimaryContainer hover:text-OnPrimaryContainer border-Primary border w-full p-1 cursor-pointer bg-Primary text-OnPrimary duration-300">
							OBJECT
						</div>
						<button
							@click="addText"
							class="bg-PrimaryContainer border border-Primary text-OnPrimaryContainer hover:bg-Primary hover:text-OnPrimary text-center w-[100px] h-[55px] p-1 rounded shadow transition cursor-pointer flex justify-center items-center">
							<img
								src="\AddText.png"
								class="w-[40px] h-[40px]"
								alt="" />
						</button>
						<button
							@click="addRect"
							class="bg-PrimaryContainer border border-Primary text-OnPrimaryContainer hover:bg-Primary hover:text-OnPrimary text-center w-[100px] h-[55px] p-1 rounded shadow transition cursor-pointer flex justify-center items-center">
							<div class="w-[40px] h-[40px] bg-white border border-black"></div>
						</button>
						<label
							for="image-upload"
							class="w-[100px] h-[55px] flex-col flex justify-center items-center cursor-pointer bg-PrimaryContainer border border-Primary text-OnPrimaryContainer hover:bg-Primary hover:text-OnPrimary py-2 px-4 rounded shadow transition">
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
							<span>Image</span>
							<input
								id="image-upload"
								type="file"
								class="hidden"
								@change="addImageToCanvas" />
						</label>
						<div
							class="bg-PrimaryContainer border border-Primary text-OnPrimaryContainer hover:bg-Primary hover:text-OnPrimary text-center w-[100px] h-[55px] p-1 rounded shadow transition cursor-pointer">
							<div>Background</div>
							<input
								v-model="backgroundColor"
								type="color"
								class="h-[25px] w-full" />
						</div>
						<!-- FONT SECTION -->
						<div
							class="hover:bg-PrimaryContainer hover:text-OnPrimaryContainer border-Primary border w-full p-1 cursor-pointer bg-Primary text-OnPrimary duration-300">
							FONT
						</div>
						<input
							v-model="fontSize"
							v-on:change="fontSizeOnChange"
							type="number"
							class="bg-PrimaryContainer border border-Primary text-OnPrimaryContainer hover:bg-Primary hover:text-OnPrimary text-center w-[100px] h-[55px] p-1 rounded shadow transition cursor-pointer" />
						<select
							v-model="fontWeight"
							v-on:change="fontWeightOnChange"
							class="bg-PrimaryContainer border border-Primary text-OnPrimaryContainer hover:bg-Primary hover:text-OnPrimary text-center w-[100px] h-[55px] p-1 rounded shadow transition cursor-pointer">
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
							class="w-[100px] h-[55px] flex-col flex items-center cursor-pointer bg-PrimaryContainer border border-Primary text-OnPrimaryContainer hover:bg-Primary hover:text-OnPrimary p-1 rounded shadow transition">
							<div>Font Color</div>
							<input
								v-model="fontColor"
								type="color"
								class="h-[25px] w-full" />
						</div>
						<!-- CANVAS CONTROL SIZE -->
						<div
							class="hover:bg-PrimaryContainer hover:text-OnPrimaryContainer border-Primary border w-full p-1 cursor-pointer bg-Primary text-OnPrimary duration-300">
							CANVAS SIZE
						</div>
						<div>
							Width
							<input
								v-model="canvasWidth"
								@input="resizeCanvas"
								placeholder="Width"
								type="number"
								class="w-[100px] h-[55px] flex-col flex justify-center items-center cursor-pointer bg-PrimaryContainer border border-Primary text-OnPrimaryContainer hover:bg-Primary hover:text-OnPrimary py-2 px-4 rounded shadow transition" />
						</div>
						<div>
							Height
							<input
								v-model="canvasHeight"
								@input="resizeCanvas"
								placeholder="Height"
								type="number"
								class="w-[100px] h-[55px] flex-col flex justify-center items-center cursor-pointer bg-PrimaryContainer border border-Primary text-OnPrimaryContainer hover:bg-Primary hover:text-OnPrimary py-2 px-4 rounded shadow transition" />
						</div>
					</div>
				</div>
				<div
					@loadeddata="updateCanvasSize"
					ref="canvasDivRef"
					class="w-[90%] max-h-full h-full flex-col flex items-center overflow-auto"
					:class="!minimize ? 'max-w-[45%]' : 'max-w-full'">
					<div class="text-Primary font-bold text-lg">HASIL EKSTRAKSI KONTEN</div>
					<canvas
						ref="canvasRef"
						class="border border-black rounded"></canvas>
				</div>
				<img
					:src="minimize == false ? '/icon-minimize.png' : '/icon-maximize.png'"
					class="cursor-pointer w-10 h-10"
					@click="minimizeFunction" />
				<!-- Preview Konten -->
				<div
					class="w-[45%] max-h-full h-full flex-col flex items-center overflow-hidden"
					:class="!minimize ? 'max-w-full' : 'max-w-0'">
					<div class="text-Primary font-bold text-lg">KONTEN POSTER/GAMBAR</div>
					<div
						v-show="loading"
						class="w-full h-6 bg-white text-center border border-black">
						<div class="absolute text-center font-bold">{{ loadingProgress }}%</div>
						<div
							class="h-full bg-green-400 rounded-md"
							:style="{ width: loadingProgress + '%' }"></div>
					</div>
					<div class="flex flex-col h-full w-full relative border border-black rounded">
						<div
							class="relative w-full h-full overflow-hidden"
							v-if="isImageLoaded"
							ref="containerRef">
							<img
								:src="imageUrl"
								alt=""
								class="absolute top-0 left-0 h-full w-full" />
						</div>
					</div>
				</div>
			</div>
			<!-- Edit Konten -->
			<div
				:class="uploadType == 'edit' ? 'flex-grow' : 'hidden'"
				class="flex-grow"></div>
			<!-- Button untuk pindah section -->
			<div
				:class="uploadType == '' ? 'flex-grow' : 'hidden'"
				class="flex justify-center items-center flex-grow space-x-5">
				<div
					@click="changeSection('langsung')"
					class="bg-Primary text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer w-44 h-44 rounded flex flex-col justify-center items-center hover:w-52 hover:h-52 duration-300">
					<img
						src="/icon-upload.png"
						alt="" />
					Langsung Upload
				</div>
				<div
					@click="changeSection('ekstraksi')"
					class="bg-Primary text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer w-44 h-44 rounded flex flex-col justify-center items-center hover:w-52 hover:h-52 duration-300">
					<img
						src="/icon-extract.png"
						alt="" />
					Ekstraksi Teks
				</div>
				<div
					@click="changeSection('edit')"
					class="bg-Primary text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer w-44 h-44 rounded flex flex-col justify-center items-center hover:w-52 hover:h-52 duration-300">
					<img
						class="w-[100px]"
						src="/icon-edit-content.png"
						alt="" />
					Edit Konten
				</div>
			</div>
			<div class="flex justify-between">
				<div
					v-if="uploadType != ''"
					@click="prevBtnClick"
					class="rounded text-white bg-red-500 w-fit px-8 py-2 cursor-pointer hover:bg-red-400 hover:text-red-500 duration-300">
					PREV
				</div>
				<div>
					<button
						v-if="uploadType == 'langsung'"
						@click="openModalSave"
						class="rounded text-white bg-Primary w-fit px-4 py-2 cursor-pointer hover:bg-PrimaryContainer hover:text-Primary duration-300">
						Upload
					</button>
					<button
						v-else-if="uploadType != ''"
						@click="toggleModal(modalSaveCanvas)"
						class="rounded text-white bg-Primary w-fit px-4 py-2 cursor-pointer hover:bg-PrimaryContainer hover:text-Primary duration-300">
						Simpan
					</button>
				</div>
			</div>
		</div>
	</div>
	<!-- MODAL SHOW LIST PENGUMUMAN -->
	<div
		ref="modalShowPengumuman"
		class="hidden overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
		<div
			class="p-4 w-3/4 max-w-6xl h-[calc(100vh-20px)] relative bg-white rounded-lg shadow sm:p-5 flex flex-col space-y-2">
			<div class="flex justify-between items-center pb-4 rounded-t border-b">
				<h3 class="text-lg font-semibold text-OnPrimaryContainer">Pilih Konten</h3>
				<svg
					@click="toggleModal(modalShowPengumuman)"
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 hover:cursor-pointer hover:bg-Primary hover:duration-500 hover:rounded-lg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12" />
				</svg>
			</div>
			<div class="flex-col flex-grow space-y-2 overflow-auto">
				<div class="flex flex-col space-y-2 text-OnPrimaryContainer">
					<input
						v-model="title"
						type="text"
						class="rounded border-2 px-2 py-1" />
				</div>
				<div class="max-h-full">
					<div
						v-for="(data, index) in filteredAnnouncement"
						v-show="data.an_type != 'SIM'"
						class="h-[100px] w-full rounded shadow-xl hover:bg-slate-50 flex items-center justify-between space-x-3">
						<div class="flex items-center space-x-3 w-full">
							<div class="flex-col w-full p-1">
								<div class="font-bold text-lg">{{ data.an_title }}</div>
								<div class="flex justify-between w-full items-center">
									<div class="w-full">
										<div>Dibuat</div>
									</div>
									<div class="w-full">
										<div>
											Tanggal :
											{{
												new Date(data.createdAt).toLocaleDateString("en-GB", {
													day: "2-digit",
													month: "long",
													year: "numeric",
												})
											}}
										</div>
										<div>
											Jam :
											{{
												new Date(data.createdAt).toLocaleTimeString("en-US", {
													hour: "2-digit",
													minute: "2-digit",
													hour12: false,
													timeZone: "Asia/Jakarta",
												})
											}}
											WIB
										</div>
									</div>
									<div class="w-fit flex justify-end space-x-4">
										<button
											class="rounded bg-Primary text-OnPrimary text-center px-3 py-1"
											@click="openModalKonten(data)">
											Detail
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- MODAL SIMPAN CANVAS -->
	<div
		ref="modalSaveCanvas"
		class="hidden overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
		<div
			class="p-4 w-3/4 max-w-6xl h-[calc(100vh-100px)] relative bg-white rounded-lg shadow sm:p-5 flex flex-col space-y-2">
			<div class="flex justify-between items-center pb-4 rounded-t border-b">
				<h3 class="text-lg font-semibold text-OnPrimaryContainer">Simpan Konten</h3>
				<svg
					@click="toggleModal(modalSaveCanvas)"
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 hover:cursor-pointer hover:bg-Primary hover:duration-500 hover:rounded-lg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12" />
				</svg>
			</div>
			<div class="flex-col flex-grow space-y-2 overflow-auto">
				<label for="">Judul</label>
				<input
					v-model="judulKonten"
					type="text"
					class="rounded border-2 px-2 py-1 w-full" />
				<label for="">Kategori</label>
				<select
					v-model="kategoriKonten"
					class="rounded border-2 px-2 py-1 w-full">
					<option
						v-if="currentUser != null"
						v-for="data in currentUser.role.categoryuser"
						:disabled="
							data.category.cat_name == 'Lowongan Magang' ||
							data.category.cat_name == 'Pengumuman Kampus' ||
							data.category.cat_name == 'Pengumuman Kegiatan' ||
							data.category.cat_name == 'Lowongan Kerja'
						"
						:value="{ id: data.cu_cat_id, name: data.category.cat_name }">
						{{ data.category.cat_name }}
					</option>
				</select>
				<label for="">File Preview</label>
				<div class="flex justify-center">
					<img
						v-if="canvas != null"
						:src="previewUrl"
						alt="" />
				</div>
			</div>
			<button
				@click="saveEditedCanvas"
				class="bg-Primary text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer duration-300 rounded py-2">
				SIMPAN
			</button>
		</div>
	</div>
	<!-- MODAL DETAIL CONTENT -->
	<ModalDetailContent
		:modalDetail="modalDetailContent"
		:dataContent="dataContent"
		:closeModal="closeModalDetail"
		:saveContent="saveContent" />
	<ModalShowPengumuman
		:modalPengumuman="isModalPengumumanOpen"
		:kontenType="kontenType"
		:imageUrl="imageUrl"
		:closeModal="closeModal" />
	<NotificationModal
		:modal-content="modalContent"
		:modal-header="modalHeader"
		:button-function="buttonFunction"
		:is-open="isOpen" />
</template>

<script setup>
	import Tesseract from "tesseract.js"

	// CANVAS VAR
	const canvasRef = ref(null)
	const canvas = ref(null)
	const canvasHeight = ref(0)
	const canvasWidth = ref(0)
	const fontSize = ref(0)
	const fontWeight = ref("normal")
	const canvasDivRef = ref(null)
	const ObjectWidth = ref(0)
	const ObjectHeigth = ref(0)
	const fontColor = ref("#000000")
	const backgroundColor = ref("#ffffff")
	// MODAL VAR
	const minimize = ref(false)
	const uploadType = ref("")
	const title = ref("")
	const { getAnnouncement, addAnnouncement } = useAnnouncement()
	const modalShowPengumuman = ref(null)
	const modalDetailContent = ref(null)
	const modalSaveCanvas = ref(null)
	const dataAnnouncement = ref(await getAnnouncement())
	const currentUser = ref(null)
	// OCR VAR
	const imageUrl = ref("")
	const isImageLoaded = ref(false)
	let detectedWords = []
	const containerRef = ref(null)
	const loading = ref(false)
	const loadingProgress = ref(0)
	const kontenType = ref("")
	onMounted(async () => {
		currentUser.value = JSON.parse(sessionStorage.getItem("currentUser"))
	})
	const updateCanvasSize = () => {
		if (canvas.value && canvasDivRef.value) {
			const containerWidth = canvasDivRef.value.offsetWidth
			const containerHeight = canvasDivRef.value.offsetHeight - 30

			canvas.value.setWidth(containerWidth)
			canvas.value.setHeight(containerHeight)
			canvas.value.renderAll() // Re-render the canvas to apply changes
		}
	}

	const changeSection = (section) => {
		uploadType.value = section
		if (section != "langsung") {
			setUpCanvas()
		}
	}
	const toggleModal = (modal) => {
		modal.classList.toggle("hidden")
		if (modal == modalSaveCanvas.value) {
			previewUrl.value = canvas.value.toDataURL({
				format: "png",
				quality: 1.0,
			})
		}
	}
	const openModalKonten = (data) => {
		imageUrl.value = data.an_url
		kontenType.value = data.an_type
		console.log(kontenType.value, imageUrl.value)
		isModalPengumumanOpen.value = !isModalPengumumanOpen.value
	}
	const filteredAnnouncement = computed(() => {
		return dataAnnouncement.value.filter((data) => {
			return data.an_title.toLowerCase().includes(title.value.toLowerCase())
		})
	})
	const isModalPengumumanOpen = ref(false)
	const closeModal = () => {
		isModalPengumumanOpen.value = !isModalPengumumanOpen.value
	}

	const onFileChange = (event) => {
		if (event.target.files == null) {
			performOCR()
		} else {
			const file = event.target.files[0]
			const reader = new FileReader()
			reader.onload = (e) => {
				imageUrl.value = e.target.result
				performOCR()
			}
			reader.readAsDataURL(file)
		}
	}

	const onImageLoad = () => {
		isImageLoaded.value = true
	}
	// OCR FUNCTION
	const performOCR = async () => {
		const { fabric } = await import("fabric")
		loading.value = true

		canvas.value.clear()
		// Perform OCR using Tesseract
		const {
			data: { words },
		} = await Tesseract.recognize(imageUrl.value, "eng", {
			logger: (m) => {
				console.log(m)
				updateProgress(m.progress)
			},
			preserve_interword_spaces: 1,
			tessedit_char_whitelist: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
			oem: 0,
		})

		// Get image size and initialize the canvas
		const { img, imgWidth, imgHeight } = await setCanvasSizeToImage()

		const containerWidth = containerRef.value.offsetWidth
		const containerHeight = containerRef.value.offsetHeight
		const widthRatio = containerWidth / imgWidth
		const heightRatio = containerHeight / imgHeight
		canvas.value.setWidth(containerWidth)
		canvas.value.setHeight(containerHeight)
		// Container for textboxes, grouped by lines
		let currentY = 0
		const lineSpacing = 20 // Vertical space between lines
		const lines = []
		// Map and draw detected words
		detectedWords = words.map((word) => {
			// Calculate bbox using your original formula

			const bbox = {
				left: ((word.bbox.x0 * widthRatio) / containerWidth) * 100,
				top: ((word.bbox.y0 * heightRatio) / containerHeight) * 100,
				width: (((word.bbox.x1 - word.bbox.x0) * widthRatio) / containerWidth) * 100,
				height: (((word.bbox.y1 - word.bbox.y0) * heightRatio) / containerHeight) * 100 + 0.5,
				line: word.line,
			}

			const fontSize =
				Math.min((word.bbox.x1 - word.bbox.x0) * widthRatio, (word.bbox.y1 - word.bbox.y0) * heightRatio) * 1.7

			const x = (bbox.left / 100) * containerWidth
			const y = (bbox.top / 100) * containerHeight + fontSize
			// Add word to the current line or start a new line
			if (lines.length === 0 || y > lines[lines.length - 1].lastY + 10) {
				lines.push({ lastY: y, fontSize, items: [{ x, text: word.text }] })
			} else {
				lines[lines.length - 1].items.push({ x, text: word.text })
				lines[lines.length - 1].lastY = Math.min(lines[lines.length - 1].lastY, y)
			}
		})
		// Create textboxes for each word
		let currentLineY = 0
		let rowText = ""
		let textBoxes = null
		lines.forEach((line) => {
			const lineY = line.lastY
			const fontsize = line.fontSize
			if (currentLineY == 0) {
				const text = new fabric.Textbox(rowText, {
					left: 0,
					width: containerWidth - 100,
					top: 0,
					fontSize: 16,
					fill: "black",
					hasControls: false,
				})
				textBoxes = text
				rowText = ""
				canvas.value.add(text)
			} else if (currentLineY + 25 < lineY) {
				const text = new fabric.Textbox(rowText, {
					left: line.items[0].x,
					width: containerWidth - 100,
					top: textBoxes.top + textBoxes.height,
					fontSize: 16,
					fill: "black",
					hasControls: false,
				})
				textBoxes = text
				rowText = ""
				canvas.value.add(text)
			}
			line.items.forEach((item) => {
				rowText += item.text + " "
			})
			rowText += "\n"
			currentLineY = lineY
		})
		// const text = new fabric.Textbox(rowText, {
		// 	left: 0,
		// 	width: containerWidth - 100,
		// 	top: 0,
		// 	fontSize: 15,
		// 	fill: "black",
		// 	hasControls: false,
		// })
		// canvas.value.add(text)
		canvas.value.renderAll()
		console.log(lines)
		loading.value = false
	}

	const setCanvasSizeToImage = async () => {
		return new Promise((resolve, reject) => {
			const img = new Image()
			img.src = imageUrl.value
			img.onload = () => {
				// Get the natural width and height of the image
				const imgWidth = img.naturalWidth
				const imgHeight = img.naturalHeight

				// Set the canvas size to match the image size
				const canvas = canvasRef.value
				canvas.width = imgWidth
				canvas.height = imgHeight
				canvasHeight.value = imgHeight
				canvasWidth.value = imgWidth
				// Resolve with the image and its dimensions
				resolve({ img, imgWidth, imgHeight })
			}
			img.onerror = (err) => {
				console.error("Failed to load image", err)
				reject(err)
			}
		})
	}
	const updateProgress = (progress) => {
		loadingProgress.value = Math.floor(progress * 100)
		if (progress === 1) {
			onImageLoad()
		}
	}
	const setUpCanvas = async () => {
		const resizeObserver = new ResizeObserver(() => {
			updateCanvasSize()
		})
		const { fabric } = await import("fabric")
		canvasHeight.value = canvasDivRef.value.clientHeight
		canvasWidth.value = canvasDivRef.value.clientWidth
		canvas.value = new fabric.Canvas(canvasRef.value, {
			width: canvasWidth.value,
			height: canvasHeight.value,
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
				fontWeight.value = textbox.fontWeight
				ObjectWidth.value = textbox.width
				ObjectHeigth.value = textbox.height
			}
		})
		canvas.value.on("object:modified", (e) => {
			const obj = e.target

			if (obj && obj.type === "textbox") {
				const trimmedText = obj.text.trim()
				if (trimmedText === "") {
					canvas.value.remove(obj)
				}
			}
		})
		canvas.value.on("mouse:up", (event) => {
			console.log(event)
		})
		// Observe the parent container
		if (canvasDivRef.value) {
			resizeObserver.observe(canvasDivRef.value)
		}

		onUnmounted(() => {
			if (canvasDivRef.value) {
				resizeObserver.unobserve(canvasDivRef.value)
			}
		})
	}
	const previewUrl = ref(null)
	const isImage = ref(false)
	const isVideo = ref(false)
	function handleFileUpload(event) {
		const file = event.target.files[0]
		fileUpload.value = file
		if (file) {
			const fileType = file.type
			if (fileType.startsWith("image/")) {
				isImage.value = true
				isVideo.value = false
				previewUrl.value = URL.createObjectURL(file) // Create a preview URL for the image
			} else if (fileType.startsWith("video/")) {
				isImage.value = false
				isVideo.value = true
				previewUrl.value = URL.createObjectURL(file) // Create a preview URL for the video
			} else {
				resetPreview()
				alert("Please select an image or video file.")
			}
		}
	}
	function prevBtnClick() {
		uploadType.value = ""
		resetPreview()
	}
	function resetPreview() {
		previewUrl.value = null
		isImage.value = false
		isVideo.value = false
	}
	// CANVAS FUNCTION
	const minimizeFunction = () => {
		minimize.value = !minimize.value
	}
	const resizeCanvas = () => {
		const width = parseInt(canvasWidth.value, 10) || 800
		const height = parseInt(canvasHeight.value, 10) || 600
		canvas.value.setWidth(width)
		canvas.value.setHeight(height)
		canvas.value.calcOffset()
		canvas.value.renderAll()
	}
	function fontSizeOnChange() {
		const activeObject = canvas.value.getActiveObject()
		console.log(activeObject)
		if (activeObject && activeObject.type === "textbox") {
			activeObject.fontSize = fontSize.value
			canvas.value.renderAll()
		} else {
			activeObject._objects.forEach((object) => {
				if (object && object.type === "textbox") {
					object.fontSize = fontSize.value
				}
			})
			canvas.value.renderAll()
		}
	}
	function adjustVertically() {
		const activeObject = canvas.value.getActiveObject()
		activeObject._objects.forEach((object) => {
			object.top = activeObject.top
		})
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
		console.log(canvas.value)
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

	// Modal Show Detail Content before saved
	const dataContent = ref(null)
	const judulKonten = ref("")
	const kategoriKonten = ref("")
	const fileUpload = ref(null)
	const openModalSave = () => {
		if (uploadType.value == "langsung") {
			dataContent.value = {
				title: judulKonten.value,
				category: kategoriKonten.value,
				previewUrl: previewUrl.value,
				file: fileUpload.value,
				kontenType: isImage.value ? "image" : "video",
				type: "file",
			}
			modalDetailContent.value = true
		}
	}
	const saveEditedCanvas = async () => {
		dataContent.value = {
			title: judulKonten.value,
			category: kategoriKonten.value,
			previewUrl: previewUrl.value,
			kontenType: "image",
			file: "",
			type: "canvas",
		}
		const result = await addAnnouncement(dataContent.value)
		if (result.statusCode == 200) {
			openNotif("Success", result.body.message)
		} else {
			openNotif("Konten gagal disimpan", result.body.message)
		}
	}
	const saveContent = async () => {
		// save content to database and passing file to resources/category

		const result = await addAnnouncement(dataContent.value)
		if (result.statusCode == 200) {
			openNotif("Success", result.body.message)
		} else {
			openNotif("Konten gagal disimpan", result.body.message)
		}
	}
	const closeModalDetail = () => {
		modalDetailContent.value = false
	}
	const modalContent = ref(null)
	const modalHeader = ref(null)
	const buttonFunction = () => {
		isOpen.value = false
		if (modalHeader.value == "Success") {
			const router = useRouter()
			router.go()
		}
		modalContent.value = null
		modalHeader.value = null
	}
	const isOpen = ref(false)
	const openNotif = (header, content) => {
		modalContent.value = content
		modalHeader.value = header
		isOpen.value = true
	}
</script>
