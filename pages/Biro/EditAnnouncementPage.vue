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
				<div class="flex space-x-3">
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
						@change="handleFileUpload" />
				</div>
			</div>
			<div class="border-b-2 border-Primary mt-1"></div>
			<!-- Langsung Upload -->
			<div
				:class="uploadType == 'langsung' ? 'flex-grow' : 'hidden'"
				class="flex flex-col flex-grow w-full justify-center overflow-hidden">
				<div class="flex flex-1 flex-col">
					<input
						type="file"
						@change="handleFileUpload" />
					<!-- Kategori -->
					<select
						class="rounded border px-4 py-2"
						v-model="selectedCategory"
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
				:class="uploadType == 'ekstraksi' ? 'flex-grow' : 'hidden'"
				class="flex-grow flex p-1 space-x-1 justify-end overflow-hidden">
				<div class="w-[10%] min-w-[10%] max-h-full h-full flex-col flex items-center overflow-auto">
					<div class="text-Primary font-bold text-lg">Property</div>
					<div class="flex flex-col flex-grow border border-black rounded w-full pt-2 items-center space-y-2">
						<button
							@click="addText"
							class="border border-Primary bg-PrimaryContainer p-1 rounded-lg h-[55px] w-[55px]">
							<img
								src="\AddText.png"
								class="w-[40px] h-[40px]"
								alt="" />
						</button>
						<button
							@click="addRect"
							class="border border-Primary bg-PrimaryContainer p-1 rounded-lg h-[55px] w-[55px]">
							<img
								src="\AddText.png"
								class="w-[40px] h-[40px]"
								alt="" />
						</button>
						<input
							v-model="fontSize"
							v-on:change="fontSizeOnChange"
							type="number"
							class="border border-Primary bg-PrimaryContainer rounded-lg text-center w-[55px] h-[55px] p-1 text-OnPrimaryContainer" />
						<select
							v-model="fontWeight"
							v-on:change="fontWeightOnChange"
							class="border border-Primary bg-PrimaryContainer rounded-lg text-center h-[55px] text-OnPrimaryContainer">
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
							class="flex flex-col items-center border border-Primary bg-PrimaryContainer text-OnPrimaryContainer rounded-lg h-[55px] p-1 w-[100px]">
							<div class="text-OnPrimaryContainer">Background</div>
							<input
								type="color"
								class="h-[25px] w-full" />
						</div>
						<div
							class="flex flex-col items-center border border-Primary bg-PrimaryContainer text-OnPrimaryContainer rounded-lg h-[55px] p-1 w-[100px]">
							<div class="text-OnPrimaryContainer">Font Color</div>
							<input
								type="color"
								class="h-[45px] w-full" />
						</div>
						<div
							class="flex flex-col items-center border border-Primary bg-PrimaryContainer text-OnPrimaryContainer rounded-lg h-[55px] p-1 w-[100px]">
							<div class="text-OnPrimaryContainer">Font Color</div>
							<input
								type="color"
								class="h-[45px] w-full" />
						</div>
						<input
							placeholder="Width"
							type="number"
							class="border border-Primary bg-PrimaryContainer rounded-lg text-center w-[65px] h-[55px] p-1 text-OnPrimaryContainer text-sm" />
						<input
							placeholder="Height"
							type="number"
							class="border border-Primary bg-PrimaryContainer rounded-lg text-center w-[65px] h-[55px] p-1 text-OnPrimaryContainer text-sm" />
					</div>
				</div>
				<div
					ref="canvasDivRef"
					class="w-[90%] max-h-full h-full flex-col flex items-center overflow-hidden"
					:class="!minimize ? 'max-w-[45%]' : 'max-w-full'">
					<div class="text-Primary font-bold text-lg">HASIL EKSTRAKSI KONTEN</div>
					<canvas
						ref="canvasRef"
						class="border border-black rounded"></canvas>
				</div>
				<img
					:src="minimize == false ? '/icon-minimize.png' : '/icon-maximize.png'"
					class="cursor-pointer w-10 h-10"
					@click="minimize = !minimize" />
				<!-- Ekstraksi Konten -->
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
							<div
								v-for="(word, index) in detectedWords"
								:key="index"
								class="absolute text-center bg-transparent rounded"
								:style="{
									left: word.bbox.left + '%',
									top: word.bbox.top + '%',
									width: word.bbox.width + '%',
									height: word.bbox.height + '%',
									backgroundColor: word.selected ? 'blue' : 'gray',
									fontSize: word.fontSize <= 10 ? '10px' : word.fontSize + 'px',
								}">
								{{ word.text }}
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- Edit Konten -->
			<div
				:class="uploadType == 'edit' ? 'flex-grow' : 'hidden'"
				class="flex-grow"></div>

			<div
				:class="uploadType == '' ? 'flex-grow' : 'hidden'"
				class="flex justify-center items-center flex-grow space-x-5">
				<div
					@click="uploadType = 'langsung'"
					class="bg-Primary text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer w-44 h-44 rounded flex flex-col justify-center items-center hover:w-52 hover:h-52 duration-300">
					<img
						src="/icon-upload.png"
						alt="" />
					Langsung Upload
				</div>
				<div
					@click="uploadType = 'ekstraksi'"
					class="bg-Primary text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer w-44 h-44 rounded flex flex-col justify-center items-center hover:w-52 hover:h-52 duration-300">
					<img
						src="/icon-extract.png"
						alt="" />
					Ekstraksi Teks
				</div>
				<div
					@click="uploadType = 'edit'"
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
						class="rounded text-white bg-Primary w-fit px-4 py-2 cursor-pointer hover:bg-PrimaryContainer hover:text-Primary duration-300">
						Upload
					</button>
					<button
						v-else-if="uploadType == 'ekstraksi'"
						class="rounded text-white bg-Primary w-fit px-4 py-2 cursor-pointer hover:bg-PrimaryContainer hover:text-Primary duration-300">
						Ekstraksi
					</button>
					<button
						v-else-if="uploadType == 'edit'"
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
	<ModalShowPengumuman
		:modalPengumuman="isModalPengumumanOpen"
		:imageUrl="imageUrl"
		:closeModal="closeModal" />
</template>

<script setup>
	import Tesseract from "tesseract.js"

	// CANVAS VAR
	const canvasRef = ref(null)
	const canvas = ref(null)
	const canvasHeight = ref(0)
	const fontSize = ref(0)
	const fontWeight = ref("normal")
	const canvasDivRef = ref(null)
	const ObjectWidth = ref(0)
	const ObjectHeigth = ref(0)
	// MODAL VAR
	const minimize = ref(false)
	const uploadType = ref("")
	const title = ref("")
	const { getAnnouncement } = useAnnouncement()
	const modalShowPengumuman = ref(null)
	const dataAnnouncement = ref(await getAnnouncement())
	const currentUser = ref(null)
	// OCR VAR
	const imageUrl = ref("")
	const isImageLoaded = ref(false)
	const selectedWords = ref([])
	let detectedWords = []
	const containerRef = ref(null)
	const loading = ref(false)
	const loadingProgress = ref(0)
	onMounted(async () => {
		currentUser.value = JSON.parse(sessionStorage.getItem("currentUser"))
		if (process.client) {
			const { fabric } = await import("fabric")
			ObjectWidth.value = canvasDivRef.value.clientWidth
			ObjectHeigth.value = canvasDivRef.value.clientHeight
			canvas.value = new fabric.Canvas(canvasRef.value, {
				width: ObjectWidth.value,
				height: ObjectHeigth.value,
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
	const toggleModal = (modal) => {
		modal.classList.toggle("hidden")
	}
	const openModalKonten = (data) => {
		isModalPengumumanOpen.value = !isModalPengumumanOpen.value
		imageUrl.value = data.an_url
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
		loading.value = true
		const {
			data: { words },
		} = await Tesseract.recognize(imageUrl.value, "eng", {
			logger: (m) => {
				console.log(m)
				updateProgress(m.progress)
			},
			preserve_interword_spaces: 1,
		})
		const imgSize = await getImageSize(imageUrl.value)
		const containerWidth = containerRef.value.offsetWidth
		const containerHeight = containerRef.value.offsetHeight
		const widthRatio = containerWidth / imgSize.width
		const heightRatio = containerHeight / imgSize.height
		detectedWords = words.map((word) => ({
			text: word.text,

			bbox: {
				left: ((word.bbox.x0 * widthRatio) / containerWidth) * 100,
				top: ((word.bbox.y0 * heightRatio) / containerHeight) * 100,
				width: (((word.bbox.x1 - word.bbox.x0) * widthRatio) / containerWidth) * 100,
				height: (((word.bbox.y1 - word.bbox.y0) * heightRatio) / containerHeight) * 100 + 0.5,
			},
			fontSize: Math.min((word.bbox.x1 - word.bbox.x0) * widthRatio, (word.bbox.y1 - word.bbox.y0) * heightRatio),
			selected: false,
		}))

		loading.value = false
	}

	const updateProgress = (progress) => {
		loadingProgress.value = progress * 100
		if (progress === 1) {
			onImageLoad()
		}
	}
	function getImageSize(url) {
		return new Promise((resolve, reject) => {
			const img = new Image()
			img.src = url
			img.onload = function () {
				resolve({ width: this.width, height: this.height })
			}
			img.onerror = function () {
				reject(new Error("Failed to load image"))
			}
		})
	}

	const previewUrl = ref(null)
	const isImage = ref(false)
	const isVideo = ref(false)
	function handleFileUpload(event) {
		const file = event.target.files[0]
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
