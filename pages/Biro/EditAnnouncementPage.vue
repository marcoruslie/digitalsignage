<template>
	<NuxtLoadingIndicator />
	<div class="bg-cyan-700 h-svh w-full p-2 flex space-x-3">
		<div class="flex flex-col h-full w-[20%] bg-white rounded-xl p-2 space-y-2">
			<NavbarBiro />
		</div>
		<div class="h-full w-[80%] bg-white rounded-xl p-2 flex-col flex">
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
						class="border-gray-400 border-2 rounded"
						placeholder="URL FILE"
						@focusout="onFileChange" />
					<input
						type="file"
						@change="onFileChange" />
					<select v-model="uploadType">
						<option value="">Pilih Cara Upload Konten</option>
						<option value="langsung">Langsung Upload</option>
						<option value="ekstraksi">Ekstraksi Teks</option>
						<option value="edit">Edit Konten</option>
					</select>
				</div>
			</div>
			<div class="border-b-2 border-Primary mt-1"></div>
			<div v-if="uploadType == 'langsung'">
				<input type="file" />
			</div>
			<div
				v-else-if="uploadType == 'ekstraksi'"
				class="flex-grow flex p-1 space-x-1 justify-end overflow-hidden">
				<div class="w-[10%] min-w-[10%] max-h-full h-full flex-col flex items-center overflow-auto">
					<div class="text-Primary font-bold text-lg">Property</div>
				</div>
				<div
					class="w-[90%] max-h-full h-full flex-col flex items-center overflow-hidden"
					:class="!minimize ? 'max-w-[45%]' : 'max-w-full'">
					<div class="text-Primary font-bold text-lg">HASIL EKSTRAKSI KONTEN</div>
					<canvas
						class="text-base border-2 border-black rounded flex flex-grow w-full"
						ref="canvasRef"></canvas>
				</div>
				<img
					:src="minimize == false ? '/icon-minimize.png' : '/icon-maximize.png'"
					class="cursor-pointer w-10 h-10"
					@click="minimize = !minimize" />
				<div
					class="w-[45%] max-h-full h-full flex-col flex items-center overflow-hidden"
					:class="!minimize ? 'max-w-full' : 'max-w-0'">
					<div class="text-Primary font-bold text-lg">KONTEN POSTER/GAMBAR</div>
					<div
						v-show="loading"
						class="w-full h-6 bg-white text-center">
						<div class="absolute text-center font-bold">{{ loadingProgress }}%</div>
						<div
							class="h-full bg-green-600 rounded-md"
							:style="{ width: loadingProgress + '%' }"></div>
					</div>
					<div class="flex flex-col h-full w-full relative border-2 border-black rounded">
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
			<div v-else></div>
		</div>
	</div>
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
	const canvasRef = ref(null)
	const canvas = ref(null)
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
	const toggleModal = (modal) => {
		modal.classList.toggle("hidden")
	}
	const handleFileInputChange = (event) => {
		const file = event.target.files[0]
		if (file) {
			readFile(file)
		}
	}
	const readFile = (file) => {
		const reader = new FileReader()
		reader.onload = () => {
			imageUrl.value = reader.result
		}
		reader.readAsDataURL(file)
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
</script>
