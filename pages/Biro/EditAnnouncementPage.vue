<template>
	<NuxtLoadingIndicator />
	<div class="bg-cyan-700 h-svh w-full p-2 flex space-x-3">
		<div class="flex flex-col h-full w-[20%] bg-white rounded-xl p-2 space-y-2">
			<NavbarBiro />
		</div>
		<div v-if="currentUser != null" class="h-full w-[80%] bg-white rounded-xl p-2 flex-col flex">
			<div class="flex justify-between items-center">
				<div class="text-Primary font-bold text-2xl">Edit/Tambah Pengumuman</div>
				<div class="flex space-x-3" v-if="uploadType == 'ekstraksi'">
					<button @click="toggleModal(modalShowPengumuman)"
						class="bg-Primary rounded text-OnPrimary px-4 py-1 hover:text-OnPrimaryContainer hover:bg-PrimaryContainer hover:duration-300">
						List Pengumuman
					</button>
					<input type="text" v-model="imageUrl" class="border-gray-400 border rounded" placeholder="URL FILE"
						@focusout="onFileChange" />
					<input type="file" @change="onFileChange" />
				</div>
			</div>
			<div class="border-b-2 border-Primary mt-1"></div>
			<!-- Langsung Upload -->
			<div :class="uploadType == 'langsung' ? 'flex-grow' : 'hidden'"
				class="flex flex-col flex-grow w-full justify-center overflow-hidden">
				<div class="flex flex-1 flex-col space-y-2">
					<input type="file" @change="handleFileUpload" />
					<!-- Kategori -->
					<select class="rounded border px-4 py-2" v-model="kategoriKonten" placeholder="Pilih Kategori">
						<option v-for="data in currentUser.role.categoryuser" :disabled="data.category.cat_name == 'Lowongan Magang' ||
							data.category.cat_name == 'Pengumuman Kampus' ||
							data.category.cat_name == 'Pengumuman Kegiatan' ||
							data.category.cat_name == 'Lowongan Kerja'
							" :value="{ id: data.cu_cat_id, name: data.category.cat_name }">
							{{ data.category.cat_name }}
						</option>
					</select>
					<!-- Title -->
					<input v-model="judulKonten" type="text" class="rounded border px-4 py-2"
						placeholder="Judul Konten" />
				</div>
				<div class="flex justify-center h-full items-center transform overflow-hidden">
					<!-- Image Preview -->
					<img v-if="isImage" :src="previewUrl" alt="Image Preview" class="h-full" />
					<!-- Video Preview -->
					<video v-if="isVideo" controls class="h-full">
						<source :src="previewUrl" type="video/mp4" />
						Your browser does not support the video tag.
					</video>
				</div>
			</div>
			<!-- Ekstraksi Teks -->
			<div v-if="uploadType == 'ekstraksi'" class="flex-grow flex p-1 space-x-1 justify-end overflow-hidden">
				<div class="w-[10%] min-w-[10%] max-h-full h-full flex-col flex items-center overflow-auto">
					<div class="text-Primary font-bold text-lg">Property</div>
					<div
						class="flex flex-col flex-grow border border-black rounded w-full items-center space-y-1 overflow-auto">
						<!-- OBJECT SECTION -->
						<div
							class="hover:bg-PrimaryContainer hover:text-OnPrimaryContainer border-Primary border w-full p-1 cursor-pointer bg-Primary text-OnPrimary duration-300">
							OBJECT
						</div>
						<button @click="addText"
							class="bg-PrimaryContainer border border-Primary text-OnPrimaryContainer hover:bg-Primary hover:text-OnPrimary text-center w-[100px] h-[55px] p-1 rounded shadow transition cursor-pointer flex justify-center items-center">
							<img src="\AddText.png" class="w-[40px] h-[40px]" alt="" />
						</button>
						<button @click="addRect"
							class="bg-PrimaryContainer border border-Primary text-OnPrimaryContainer hover:bg-Primary hover:text-OnPrimary text-center w-[100px] h-[55px] p-1 rounded shadow transition cursor-pointer flex justify-center items-center">
							<div class="w-[40px] h-[40px] bg-white border border-black"></div>
						</button>
						<label for="image-upload"
							class="w-[100px] h-[55px] flex-col flex justify-center items-center cursor-pointer bg-PrimaryContainer border border-Primary text-OnPrimaryContainer hover:bg-Primary hover:text-OnPrimary py-2 px-4 rounded shadow transition">
							<svg class="w-10 h-10 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M4 7v13a1 1 0 001 1h14a1 1 0 001-1V7m-9 4l3 3 4-4m-7-4H5a1 1 0 00-1 1v2m15-2h-5M6 5h.01">
								</path>
							</svg>
							<span>Image</span>
							<input id="image-upload" type="file" class="hidden" @change="addImageToCanvas" />
						</label>
						<div
							class="bg-PrimaryContainer border border-Primary text-OnPrimaryContainer hover:bg-Primary hover:text-OnPrimary text-center w-[100px] h-[55px] p-1 rounded shadow transition cursor-pointer">
							<div>Background</div>
							<input @input="backgroundColorOnChange" v-model="backgroundColor" type="color"
								class="h-[25px] w-full" />
						</div>
						<button @click="deleteSelectedObject"
							:class="deleteBtn ? 'bg-PrimaryContainer text-OnPrimaryContainer hover:bg-Primary hover:text-OnPrimary' : 'bg-slate-500 disabled'"
							class="border border-Primary text-center w-[100px] h-[55px] p-1 rounded shadow transition cursor-pointer flex justify-center items-center">
							<img src="\icon-delete.png" class="w-[40px] h-[40px]" alt="" />
						</button>
						<!-- FONT SECTION -->
						<div
							class="hover:bg-PrimaryContainer hover:text-OnPrimaryContainer border-Primary border w-full p-1 cursor-pointer bg-Primary text-OnPrimary duration-300">
							FONT
						</div>
						<input v-model="fontSize" v-on:change="fontSizeOnChange" type="number"
							class="bg-PrimaryContainer border border-Primary text-OnPrimaryContainer hover:bg-Primary hover:text-OnPrimary text-center w-[100px] h-[55px] p-1 rounded shadow transition cursor-pointer" />
						<select v-model="fontWeight" v-on:change="fontWeightOnChange"
							class="bg-PrimaryContainer border border-Primary text-OnPrimaryContainer hover:bg-Primary hover:text-OnPrimary text-center w-[100px] h-[55px] p-1 rounded shadow transition cursor-pointer">
							<option value="normal" class="text-OnPrimaryContainer">
								Normal
							</option>
							<option value="bold" class="text-OnPrimaryContainer">
								Bold
							</option>
						</select>
						<div
							class="w-[100px] h-[55px] flex-col flex items-center cursor-pointer bg-PrimaryContainer border border-Primary text-OnPrimaryContainer hover:bg-Primary hover:text-OnPrimary p-1 rounded shadow transition">
							<div>Font Color</div>
							<input v-model="fontColor" @input="fontColorOnChange" type="color"
								class="h-[25px] w-full" />
						</div>
						<!-- canvasLeft CONTROL SIZE -->
						<div
							class="hover:bg-PrimaryContainer hover:text-OnPrimaryContainer border-Primary border w-full p-1 cursor-pointer bg-Primary text-OnPrimary duration-300">
							CANVAS SIZE
						</div>
						<div>
							Width(px)
							<input v-model="canvasWidth" @input="resizeCanvas" placeholder="Width" type="number"
								class="w-[100px] h-[55px] flex-col flex justify-center items-center cursor-pointer bg-PrimaryContainer border border-Primary text-OnPrimaryContainer hover:bg-Primary hover:text-OnPrimary py-2 px-4 rounded shadow transition" />
						</div>
						<div>
							Height(px)
							<input v-model="canvasHeight" @input="resizeCanvas" placeholder="Height" type="number"
								class="w-[100px] h-[55px] flex-col flex justify-center items-center cursor-pointer bg-PrimaryContainer border border-Primary text-OnPrimaryContainer hover:bg-Primary hover:text-OnPrimary py-2 px-4 rounded shadow transition" />
						</div>
					</div>
				</div>
				<!-- Canvas Left SECTION -->
				<div ref="canvasLeftDiv" class="w-[90%] max-h-full h-full flex-col flex items-center overflow-auto"
					:class="!minimize ? 'max-w-[45%]' : 'max-w-full'">
					<div class="text-Primary font-bold text-lg">HASIL EKSTRAKSI KONTEN</div>
					<canvas ref="canvasLeftRev" class="border border-black rounded"></canvas>
				</div>
				<div class="flex-col flex items-center">
					<img :src="minimize == false ? '/icon-minimize.png' : '/icon-maximize.png'"
						class="cursor-pointer w-10 h-10" @click="minimizeFunction" />
					<button v-if="!minimize" @click="pasteTextToLeftCanvas"
						class="bg-Primary text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer rounded-md px-1 duration-300">Paste</button>
				</div>
				<!-- Canvas Right Konten -->
				<div class="w-[45%] max-h-full h-full flex-col flex items-center overflow-hidden"
					:class="!minimize ? 'max-w-full' : 'max-w-0'" ref="canvasRightDiv">
					<div class="text-Primary font-bold text-lg">KONTEN POSTER/GAMBAR</div>
					<!-- <div
						v-show="loading"
						class="w-full h-6 bg-white text-center border border-black">
						<div class="absolute text-center font-bold">{{ loadingProgress }}%</div>
						<div
							class="h-full bg-green-400 rounded-md"
							:style="{ width: loadingProgress + '%' }"></div>
					</div> -->

					<canvas ref="canvasRightRef" class="border border-black rounded"></canvas>
				</div>
			</div>
			<!-- Edit Konten -->
			<div v-if="uploadType == 'edit'" class="flex-grow flex p-1 space-x-1 justify-end overflow-hidden">
				<div class="w-[10%] min-w-[10%] max-h-full h-full flex-col flex items-center overflow-auto">
					<div class="text-Primary font-bold text-lg">Property</div>
					<div
						class="flex flex-col flex-grow border border-black rounded w-full items-center space-y-1 overflow-auto">
						<!-- OBJECT SECTION -->
						<div
							class="hover:bg-PrimaryContainer hover:text-OnPrimaryContainer border-Primary border w-full p-1 cursor-pointer bg-Primary text-OnPrimary duration-300">
							OBJECT
						</div>
						<button @click="addText"
							class="bg-PrimaryContainer border border-Primary text-OnPrimaryContainer hover:bg-Primary hover:text-OnPrimary text-center w-[100px] h-[55px] p-1 rounded shadow transition cursor-pointer flex justify-center items-center">
							<img src="\AddText.png" class="w-[40px] h-[40px]" alt="" />
						</button>
						<button @click="addRect"
							class="bg-PrimaryContainer border border-Primary text-OnPrimaryContainer hover:bg-Primary hover:text-OnPrimary text-center w-[100px] h-[55px] p-1 rounded shadow transition cursor-pointer flex justify-center items-center">
							<div class="w-[40px] h-[40px] bg-white border border-black"></div>
						</button>
						<label for="image-upload"
							class="w-[100px] h-[55px] flex-col flex justify-center items-center cursor-pointer bg-PrimaryContainer border border-Primary text-OnPrimaryContainer hover:bg-Primary hover:text-OnPrimary py-2 px-4 rounded shadow transition">
							<svg class="w-10 h-10 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M4 7v13a1 1 0 001 1h14a1 1 0 001-1V7m-9 4l3 3 4-4m-7-4H5a1 1 0 00-1 1v2m15-2h-5M6 5h.01">
								</path>
							</svg>
							<span>Image</span>
							<input id="image-upload" type="file" class="hidden" @change="addImageToCanvas" />
						</label>
						<div
							class="bg-PrimaryContainer border border-Primary text-OnPrimaryContainer hover:bg-Primary hover:text-OnPrimary text-center w-[100px] h-[55px] p-1 rounded shadow transition cursor-pointer">
							<div>Background</div>
							<input @input="backgroundColorOnChange" v-model="backgroundColor" type="color"
								class="h-[25px] w-full" />
						</div>
						<button @click="deleteSelectedObject"
							:class="deleteBtn ? 'bg-PrimaryContainer text-OnPrimaryContainer hover:bg-Primary hover:text-OnPrimary' : 'bg-slate-500 disabled'"
							class="border border-Primary text-center w-[100px] h-[55px] p-1 rounded shadow transition cursor-pointer flex justify-center items-center">
							<img src="\icon-delete.png" class="w-[40px] h-[40px]" alt="" />
						</button>
						<!-- FONT SECTION -->
						<div
							class="hover:bg-PrimaryContainer hover:text-OnPrimaryContainer border-Primary border w-full p-1 cursor-pointer bg-Primary text-OnPrimary duration-300">
							FONT
						</div>
						<input v-model="fontSize" v-on:change="fontSizeOnChange" type="number"
							class="bg-PrimaryContainer border border-Primary text-OnPrimaryContainer hover:bg-Primary hover:text-OnPrimary text-center w-[100px] h-[55px] p-1 rounded shadow transition cursor-pointer" />
						<select v-model="fontWeight" v-on:change="fontWeightOnChange"
							class="bg-PrimaryContainer border border-Primary text-OnPrimaryContainer hover:bg-Primary hover:text-OnPrimary text-center w-[100px] h-[55px] p-1 rounded shadow transition cursor-pointer">
							<option value="normal" class="text-OnPrimaryContainer">
								Normal
							</option>
							<option value="bold" class="text-OnPrimaryContainer">
								Bold
							</option>
						</select>
						<div
							class="w-[100px] h-[55px] flex-col flex items-center cursor-pointer bg-PrimaryContainer border border-Primary text-OnPrimaryContainer hover:bg-Primary hover:text-OnPrimary p-1 rounded shadow transition">
							<div>Font Color</div>
							<input v-model="fontColor" @input="fontColorOnChange" type="color"
								class="h-[25px] w-full" />
						</div>
						<!-- canvasLeft CONTROL SIZE -->
						<div
							class="hover:bg-PrimaryContainer hover:text-OnPrimaryContainer border-Primary border w-full p-1 cursor-pointer bg-Primary text-OnPrimary duration-300">
							CANVAS SIZE
						</div>
						<div>
							Width(px)
							<input v-model="canvasWidth" @input="resizeCanvas" placeholder="Width" type="number"
								class="w-[100px] h-[55px] flex-col flex justify-center items-center cursor-pointer bg-PrimaryContainer border border-Primary text-OnPrimaryContainer hover:bg-Primary hover:text-OnPrimary py-2 px-4 rounded shadow transition" />
						</div>
						<div>
							Height(px)
							<input v-model="canvasHeight" @input="resizeCanvas" placeholder="Height" type="number"
								class="w-[100px] h-[55px] flex-col flex justify-center items-center cursor-pointer bg-PrimaryContainer border border-Primary text-OnPrimaryContainer hover:bg-Primary hover:text-OnPrimary py-2 px-4 rounded shadow transition" />
						</div>
					</div>
				</div>
				<!-- CanvasLeft SECTION -->
				<div ref="canvasLeftDiv" class="w-[90%] max-h-full h-full flex-col flex items-center overflow-auto">
					<div class="text-Primary font-bold text-lg">Canvas</div>
					<canvas ref="canvasLeftRev" class="border border-black rounded"></canvas>
				</div>
			</div>
			<!-- Button untuk pindah section -->
			<div :class="uploadType == '' ? 'flex-grow' : 'hidden'"
				class="flex justify-center items-center flex-grow space-x-5">
				<div @click="changeSection('langsung')"
					class="bg-Primary text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer w-44 h-44 rounded flex flex-col justify-center items-center hover:w-52 hover:h-52 duration-300">
					<img src="/icon-upload.png" alt="" />
					Langsung Upload
				</div>
				<div @click="changeSection('ekstraksi')"
					class="bg-Primary text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer w-44 h-44 rounded flex flex-col justify-center items-center hover:w-52 hover:h-52 duration-300">
					<img src="/icon-extract.png" alt="" />
					Ekstraksi Teks
				</div>
				<div @click="changeSection('edit')"
					class="bg-Primary text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer w-44 h-44 rounded flex flex-col justify-center items-center hover:w-52 hover:h-52 duration-300">
					<img class="w-[100px]" src="/icon-edit-content.png" alt="" />
					Edit Konten
				</div>
			</div>
			<div class="flex justify-between">
				<div v-if="uploadType != ''" @click="prevBtnClick"
					class="rounded text-white bg-red-500 w-fit px-8 py-2 cursor-pointer hover:bg-red-400 hover:text-red-500 duration-300">
					PREV
				</div>
				<div>
					<button v-if="uploadType == 'langsung'" @click="openModalSave"
						class="rounded text-white bg-Primary w-fit px-4 py-2 cursor-pointer hover:bg-PrimaryContainer hover:text-Primary duration-300">
						Upload
					</button>
					<button v-else-if="uploadType != ''" @click="toggleModal(modalSaveCanvas)"
						class="rounded text-white bg-Primary w-fit px-4 py-2 cursor-pointer hover:bg-PrimaryContainer hover:text-Primary duration-300">
						Simpan
					</button>
				</div>
			</div>
		</div>
	</div>
	<!-- MODAL SHOW LIST PENGUMUMAN -->
	<div ref="modalShowPengumuman"
		class="hidden overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
		<div
			class="p-4 w-3/4 max-w-6xl h-[calc(100vh-20px)] relative bg-white rounded-lg shadow sm:p-5 flex flex-col space-y-2">
			<div class="flex justify-between items-center pb-4 rounded-t border-b">
				<h3 class="text-lg font-semibold text-OnPrimaryContainer">Pilih Konten</h3>
				<svg @click="toggleModal(modalShowPengumuman)" xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 hover:cursor-pointer hover:bg-Primary hover:duration-500 hover:rounded-lg"
					fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</div>
			<div class="flex-col flex-grow space-y-2 overflow-auto">
				<div class="flex flex-col space-y-2 text-OnPrimaryContainer">
					<input v-model="title" type="text" class="rounded border-2 px-2 py-1" />
				</div>
				<div class="max-h-full">
					<div v-for="(data, index) in filteredAnnouncement" v-show="data.an_type != 'SIM'"
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
										<button class="rounded bg-Primary text-OnPrimary text-center px-3 py-1"
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
	<div ref="modalSaveCanvas"
		class="hidden overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
		<form @submit.prevent="saveEditedCanvas"
			class="p-4 w-3/4 max-w-6xl h-[calc(100vh-100px)] relative bg-white rounded-lg shadow sm:p-5 flex flex-col space-y-2">
			<div class="flex justify-between items-center pb-4 rounded-t border-b">
				<h3 class="text-lg font-semibold text-OnPrimaryContainer">Simpan Konten</h3>
				<svg @click="toggleModal(modalSaveCanvas)" xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 hover:cursor-pointer hover:bg-Primary hover:duration-500 hover:rounded-lg"
					fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</div>
			<div class="flex-col flex-grow space-y-2 overflow-auto">
				<label for="">Judul</label>
				<input v-model="judulKonten" type="text" class="rounded border-2 px-2 py-1 w-full" required />
				<label for="">Kategori</label>
				<select required v-model="kategoriKonten" class="rounded border-2 px-2 py-1 w-full">
					<option v-if="currentUser != null" v-for="data in currentUser.role.categoryuser" :disabled="data.category.cat_name == 'Lowongan Magang' ||
						data.category.cat_name == 'Pengumuman Kampus' ||
						data.category.cat_name == 'Pengumuman Kegiatan' ||
						data.category.cat_name == 'Lowongan Kerja'
						" :value="{ id: data.cu_cat_id, name: data.category.cat_name }">
						{{ data.category.cat_name }}
					</option>
				</select>
				<label for="">File Preview</label>
				<div class="flex justify-center">
					<img class="rounded border" v-if="canvasLeft != null" :src="previewUrl" alt="" />
					<div v-else>canvasLeft BELUM DIISI</div>
				</div>
			</div>
			<button type="submit"
				class="bg-Primary text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer duration-300 rounded py-2">
				SIMPAN
			</button>
		</form>
	</div>
	<!-- MODAL DETAIL CONTENT -->
	<ModalDetailContent :modalDetail="modalDetailContent" :dataContent="dataContent" :closeModal="closeModalDetail"
		:saveContent="saveContent" />
	<ModalShowPengumuman :modalPengumuman="isModalPengumumanOpen" :kontenType="kontenType" :imageUrl="imageUrl"
		:closeModal="closeModal" />
	<NotificationModal :modal-content="modalContent" :modal-header="modalHeader" :button-function="buttonFunction"
		:is-open="isOpen" />
	<Loading :loading="onLoading" :message="loadingMessage" />
</template>

<script setup>
import Tesseract from "tesseract.js"
const { getUserData } = useUser()
// canvas right
let canvasRight
const canvasRightDiv = ref(null)
const canvasRightRef = ref(null)
// canvas left var
let canvasLeft
const canvasLeftRev = ref(null)
const canvasHeight = ref(0)
const canvasWidth = ref(0)
const fontSize = ref(0)
const fontWeight = ref("normal")
const canvasLeftDiv = ref(null)
const ObjectWidth = ref(0)
const ObjectHeigth = ref(0)
const fontColor = ref("#000000")
const backgroundColor = ref("#ffffff")
let imageScale = { x: 1, y: 1 }; // To store the scaling ratio
let copiedObjects = []; // Array to store selected objects for copying
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
const onLoading = ref(false)
const loadingMessage = ref("")
const loadingProgress = ref(0)
const kontenType = ref("")
onBeforeMount(async () => {
	const router = useRouter();
	if (sessionStorage.getItem('currentUser') != null) {
		const token = sessionStorage.getItem('currentUser')
		currentUser.value = await getUserData(token)
		if (currentUser.value == null) {
			router.push('/')
		}
		else if (currentUser.value.role.role_name == "Admin") {
			router.push('/Admin/MasterScreenPage')
		}
	}
	else {
		router.push('/')
	}
})
const setLoadingState = (isLoading, message = "") => {
	onLoading.value = isLoading
	loadingMessage.value = message
}
const changeSection = (section) => {
	uploadType.value = section
	if (section != "langsung") {
		setUpCanvas(section)
	}
}
const toggleModal = (modal) => {
	modal.classList.toggle("hidden")
	if (modal == modalSaveCanvas.value) {
		previewUrl.value = canvasLeft.toDataURL({
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

const onFileChange = async (event) => {
	if (event.target.files == null) {
		await processOCR()
	} else {
		const file = event.target.files[0]
		const fileType = file.type
		if (fileType.includes("video")) {
			openNotif("error", "File yang diupload harus berupa gambar")
			imageUrl.value = ""
		}
		else {
			const reader = new FileReader()
			reader.onload = async (e) => {
				imageUrl.value = e.target.result
				await processOCR()
			}
			reader.readAsDataURL(file)
		}
	}
}

const onImageLoad = () => {
	isImageLoaded.value = true
}
// OCR FUNCTION
const performOCR = async () => {
	const { fabric } = await import("fabric")
	loading.value = true

	canvasLeft.clear()
	canvasRight.clear()
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

	// Get image size and initialize the canvasLeft
	const { img, imgWidth, imgHeight } = await setCanvasSizeToImage()

	const containerWidth = containerRef.value.offsetWidth
	const containerHeight = containerRef.value.offsetHeight
	const widthRatio = containerWidth / imgWidth
	const heightRatio = containerHeight / imgHeight
	canvasLeft.setWidth(containerWidth)
	canvasLeft.setHeight(containerHeight)
	// Container for textboxes, grouped by textbox
	let currentY = 0
	const textboxpacing = 20 // Vertical space between textbox
	const textbox = []
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
		if (textbox.length === 0) {
			textbox.push({ firstY: y, firstX: x, lastY: y, lastX: x, width: bbox.width, height: bbox.height, fontSize, items: [{ x, y, text: word.text }] })
		} else {
			let idx = -1
			textbox.forEach((box, index) => {
				if (difference(box.lastY, y) < 23 && difference(box.lastX + box.width, x) < 76 || difference(box.firstX, x) < 3 && difference(box.firstY, y) < 5) {
					idx = index
				}
			})
			if (idx != -1) {
				textbox[idx].items.push({ x, y, text: word.text, width: bbox.width })
				textbox[idx].lastY = y
				textbox[idx].lastX = x
				textbox[idx].width = bbox.width
				textbox[idx].height = bbox.height
			}
			else {
				textbox.push({ firstY: y, firstX: x, lastY: y, lastX: x, width: bbox.width, height: bbox.height, fontSize, items: [{ x, y, text: word.text }] })
			}
		}
	})

	console.log(textbox)
	// Create textboxes for each word
	let currentLineY = 0
	let currentX = 0
	let rowText = ""
	textbox.forEach((line) => {
		let widthTb = 0
		line.items.forEach((item) => {
			rowText += item.text + " "
			widthTb += item.width
		})
		const text = new fabric.Textbox(rowText, {
			left: line.firstX,
			top: line.firstY,
			width: 250,
			fontSize: 16,
			fill: "black",
			hasControls: false,
		})
		rowText = ""
		canvasLeft.add(text)
		rowText += "\n"
		currentLineY = line.lastY
		currentX = line.lastX
	})
	canvasLeft.renderAll()
	loading.value = false
}
const processOCR = async () => {
	const { fabric } = await import("fabric")
	canvasRight.clear()
	const containerWidth = canvasRightDiv.value.clientWidth;
	const containerHeight = canvasRightDiv.value.clientHeight;
	fabric.Image.fromURL(imageUrl.value, (img) => {
		const imgAspectRatio = img.width / img.height;
		const canvasAspectRatio = containerWidth / containerHeight;

		if (imgAspectRatio > canvasAspectRatio) {
			img.scaleToWidth(containerWidth);
			imageScale.x = containerWidth / img.width;
			imageScale.y = containerWidth / img.width; // Keep aspect ratio
		} else {
			img.scaleToHeight(containerHeight);
			imageScale.x = containerHeight / img.height;
			imageScale.y = containerHeight / img.height; // Keep aspect ratio
		}

	});
	setLoadingState(true, "Processing OCR...");
	const result = await Tesseract.recognize(imageUrl.value, 'eng', {
		logger: (m) => {
			console.log(m)
			updateProgress(m.progress)
		},
	});
	setLoadingState(false);
	const { words } = result.data;

	// Add the OCR result to the right canvas (with selectable text)
	words.forEach((word) => {
		const { bbox, text } = word;
		const left = bbox.x0 * imageScale.x;
		const top = bbox.y0 * imageScale.y;
		const width = (bbox.x1 - bbox.x0) * imageScale.x;
		const height = (bbox.y1 - bbox.y0) * imageScale.y;

		// Draw the text
		const textElement = new fabric.Text(text, {
			left: left,
			top: top,
			fontSize: 12,
			fill: 'black',
			selectable: true,
			backgroundColor: 'rgba(255, 255, 255, 0.5)',
		});
		canvasRight.add(textElement);
	});

	canvasRight.renderAll();
};
const setCanvasSizeToImage = async () => {
	return new Promise((resolve, reject) => {
		const img = new Image()
		img.src = imageUrl.value
		img.onload = () => {
			// Get the natural width and height of the image
			const imgWidth = img.naturalWidth
			const imgHeight = img.naturalHeight

			// Set the canvasLeft size to match the image size
			const canvasLeft = canvasLeftRev.value
			canvasLeft.width = imgWidth
			canvasLeft.height = imgHeight
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
// CANVAS LEFT FUNCTION
const deleteBtn = ref(false)

const setUpCanvas = async (section) => {
	// const resizeObserver = new ResizeObserver(() => {
	// })
	const { fabric } = await import("fabric")
	canvasHeight.value = canvasLeftDiv.value.offsetHeight - 30
	canvasWidth.value = canvasLeftDiv.value.offsetWidth
	canvasLeft = new fabric.Canvas(canvasLeftRev.value, {
		width: canvasWidth.value,
		height: canvasHeight.value,
		backgroundColor: "white",
	})
	if (section == "ekstraksi") {
		canvasRight = new fabric.Canvas(canvasRightRef.value, {
			width: canvasRightDiv.value.offsetWidth,
			height: canvasRightDiv.value.offsetHeight - 30,
			backgroundColor: "white",
		})
		canvasRight.on("selection:created", (event) => {
			copySelectedText()
		});
	}
	canvasLeft.on("mouse:dblclick", (event) => {
		if (event.target && event.target.type === "textbox") {
			const textbox = event.target
			textbox.enterEditing()
		}
	})
	canvasLeft.on("mouse:down", (event) => {
		if (event.target && event.target.type === "textbox") {
			const textbox = event.target
			fontSize.value = textbox.fontSize
			fontWeight.value = textbox.fontWeight
			fontColor.value = textbox.fill
			backgroundColor.value = textbox.backgroundColor
		}
		else if (event.target && event.target.type === "rect") {
			const rect = event.target
			backgroundColor.value = rect.fill
		}
		else {
			fontSize.value = 0
			fontWeight.value = "normal"
			backgroundColor.value = "#ffffff"
			fontColor.value = "#000000"
		}
	})
	canvasLeft.on("object:selected", (event) => {
		const activeObject = event.target
		activeObject.bringToFront()
	})
	canvasLeft.on("object:modified", (e) => {
		const obj = e.target

		if (obj && obj.type === "textbox") {
			const trimmedText = obj.text.trim()
			if (trimmedText === "") {
				canvasLeft.remove(obj)
			}
		}
	})
	canvasLeft.on("selection:cleared", (e) => {
		deleteBtn.value = false
	})
	canvasLeft.on("selection:created", (e) => {
		deleteBtn.value = true
	})
	canvasLeft.on("mouse:up", (event) => {
		console.log(event)
	})
}
const minimizeFunction = () => {
	minimize.value = !minimize.value
	console.log("canvasLeft OLD: ", canvasLeft.getWidth(), canvasLeft.getHeight())
}
const resizeCanvas = () => {
	const width = parseInt(canvasWidth.value, 10) || 800
	const height = parseInt(canvasHeight.value, 10) || 600
	console.log("canvasLeft OLD: ", canvasLeft.getWidth(), canvasLeft.getHeight())
	canvasLeft.setWidth(width)
	canvasLeft.setHeight(height)

	canvasLeft.renderAll()
	console.log("canvasLeft NEW: ", canvasLeft.getWidth(), canvasLeft.getHeight())
}
function fontSizeOnChange() {
	const activeObject = canvasLeft.getActiveObject()
	console.log(activeObject)
	if (activeObject && activeObject.type === "textbox") {
		activeObject.fontSize = fontSize.value
		canvasLeft.renderAll()
	} else {
		activeObject._objects.forEach((object) => {
			if (object && object.type === "textbox") {
				object.fontSize = fontSize.value
			}
		})
		canvasLeft.renderAll()
	}
}
const fontColorOnChange = () => {
	const activeObject = canvasLeft.getActiveObject()
	if (activeObject && activeObject.type === "textbox") {
		activeObject.set("fill", fontColor.value)
		canvasLeft.renderAll()
	}
}
const backgroundColorOnChange = () => {
	const activeObject = canvasLeft.getActiveObject()
	if (activeObject && activeObject.type === "textbox") {
		activeObject.set("backgroundColor", backgroundColor.value)
		canvasLeft.renderAll()
	}
	else if (activeObject && activeObject.type === "rect") {
		activeObject.set('fill', backgroundColor.value)
		canvasLeft.renderAll()
	}
	else {
		canvasLeft.setBackgroundColor(backgroundColor.value, canvasLeft.renderAll.bind(canvasLeft))

	}
}
function fontWeightOnChange() {
	const activeObject = canvasLeft.getActiveObject()
	if (activeObject && activeObject.type === "textbox") {
		activeObject.fontWeight = fontWeight.value
		canvasLeft.renderAll()
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
	canvasLeft.add(text)
	console.log(canvasLeft)
}
async function addRect() {
	const { fabric } = await import("fabric")
	const rect = new fabric.Rect({
		width: 80,
		height: 80,
		fill: "black",
	})

	canvasLeft.add(rect)
}
function deleteSelectedObject() {
	const activeObject = canvasLeft.getActiveObject(); // Get the currently selected object

	if (activeObject) {
		canvasLeft.remove(activeObject); // Remove the object from the canvasLeft
		canvasLeft.discardActiveObject(); // Deselect the object
		canvasLeft.renderAll(); // Re-render the canvasLeft
	} else {
		console.log("No object is selected.");
	}
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
				canvasLeft.add(img)
				canvasLeft.setActiveObject(img)
			})
		}
		reader.readAsDataURL(file)
	}
}
// Copy selected text from the right canvas
const copySelectedText = () => {
	copiedObjects = canvasRight.getActiveObjects();
};
// Paste copied text to the left canvas and change it to single text box
const pasteTextToLeftCanvas = () => {
	if (copiedObjects.length === 0) return;

	// Calculate the combined position and text
	let combinedText = '';
	let minLeft = Infinity;
	let minTop = Infinity;
	let leftBefore = 0;
	let topBefore = 0;
	copiedObjects.forEach((obj) => {
		const bbox = obj.getBoundingRect(); // Get bounding box of each text object
		console.log(bbox)
		minLeft = Math.min(minLeft, bbox.left);
		minTop = Math.min(minTop, bbox.top);
		if (topBefore == 0 && leftBefore == 0) {
			combinedText += obj.text;
		}
		else if (difference(minLeft, bbox.left) < 12) {
			combinedText += '\n' + obj.text;
		}
		else {
			combinedText += ' ' + obj.text;
		}
		leftBefore = bbox.left;
		topBefore = bbox.top;


	});
	console.log(combinedText)
	// Create a new Textbox with the combined text
	const combinedTextBox = new fabric.Textbox(combinedText, {
		left: 0,
		top: 0,
		fontSize: 12,
		fill: 'black',
		selectable: true, // Allow the combined text to be selected
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		width: canvasLeft.width - 100, // Adjust width based on canvas size
	});

	// Add the new Textbox to the left canvas
	canvasLeft.add(combinedTextBox);
	canvasLeft.renderAll();
};
const difference = (a, b) => {
	if (a > b) {
		return a - b;
	}
	else {
		return b - a;
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
		type: "canvasLeft",
	}
	setLoadingState(true, "Sedang menyimpan konten")
	const result = await addAnnouncement(dataContent.value)
	console.log(result)
	setLoadingState(false)
	if (result.statusCode == 200) {
		openNotif("Success", result.body.message)
	} else {
		openNotif("Konten gagal disimpan", result.body.message)
	}
}
const saveContent = async () => {
	// save content to database and passing file to resources/category
	setLoadingState(true, "Sedang menyimpan konten")
	const result = await addAnnouncement(dataContent.value)
	setLoadingState(false)
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
<style>
/* Scrollbar track */
::-webkit-scrollbar-track {
	background-color: #f1f1f1;
}

/* Scrollbar */
::-webkit-scrollbar {
	width: 4px;
	height: 4px;
}

/* Scrollbar thumb */
::-webkit-scrollbar-thumb {
	background-color: #006780;
	border-radius: 10px;
}

/* Scrollbar thumb on hover */
::-webkit-scrollbar-thumb:hover {
	background-color: #555;
}
</style>