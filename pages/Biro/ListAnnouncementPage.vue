<template>
	<div class="bg-cyan-700 h-svh w-full p-2 flex space-x-3">
		<div class="flex flex-col h-full w-[20%] bg-white rounded-xl p-2 space-y-2">
			<NavbarBiro />
		</div>
		<div class="h-full w-[80%] bg-white rounded-xl p-2 flex-col overflow-auto">
			<div class="flex justify-between items-center">
				<div class="text-Primary font-bold text-2xl">Daftar List Pengumuman</div>
				<div class="flex space-x-2">
					<button v-if="true" @click="toggleModalReminder"
						class="p-2 bg-Primary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer text-white rounded">
						Set Reminder
					</button>
					<div class="relative">
						<input v-model="searchedList" type="text" placeholder="Search..."
							class="block w-full py-2 pl-10 pr-4 leading-tight bg-white border border-gray-300 rounded focus:outline-none focus:bg-white focus:border-gray-500" />
						<div class="absolute inset-y-0 left-0 flex items-center pl-3">
							<svg class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M15 15l5 5M10 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
							</svg>
						</div>
					</div>
					<img src="/public/icon-add.png" alt=""
						class="w-[40px] cursor-pointer hover:bg-slate-300 hover:duration-300 rounded-lg"
						@click="toggleModal(modalAddListPengumuman)" />
				</div>
			</div>
			<div class="border-b-2 border-Primary mt-1"></div>
			<div class="flex-grow flex-col p-1 space-y-1">
				<!-- List - List Pengumuman -->
				<div v-if="currentUser != null" v-for="(data, index) in dataListAnnouncement.filter(
					(item) => item.la_us_username == currentUser.us_username && item.la_title.toLowerCase().includes(searchedList.toLowerCase())
				)" class="h-[150px] w-full rounded shadow-xl flex items-center justify-between space-x-3 px-2">
					<div class="flex items-center space-x-3 justify-between w-full">
						<!-- <div class="w-[100px] h-[100px] bg-PrimaryContainer rounded-l">
                                <img :src="data.pengumuman_namafile" alt="">
                            </div> -->
						<div class="w-full">
							<div class="font-bold text-lg m-1">{{ data.la_title }}</div>
							<div class="text-base mx-1">Kategori : {{ data.category.cat_name }}</div>
							<div class="text-base mx-1">
								{{
									new Date(data.createdAt).toLocaleDateString("id-ID", {
										day: "2-digit",
										month: "long",
										year: "numeric",
									}) +
									" | " +
									new Date(data.createdAt).toLocaleTimeString("id-ID", {
										hour: "2-digit",
										minute: "2-digit",
										hour12: false,
										timeZone: "Asia/Jakarta",
									}) +
									" WIB"
								}}
							</div>
							<div class="text-base mx-1">Durasi : {{ formatDuration(data.category.cat_duration *
								data.announcement_in_list.length) }}</div>
						</div>
						<div class="w-full flex space-x-2 justify-end">
							<img src="/icon_detail.png"
								@click="toggleModalShowListPengumuman(modalShowListPengumuman, data)"
								class="w-[50px] h-[50px] hover:bg-slate-200 rounded hover:duration-300" />
							<img @click="hapusListPengumuman(data)" src="/icon-delete.png"
								class="w-[50px] h-[50px] hover:bg-slate-200 rounded hover:duration-300" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- modal show pengumuman -->
	<div ref="modalShowListPengumuman"
		class="hidden overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
		<div
			class="p-4 w-3/4 max-w-6xl h-[calc(100vh-20px)] relative bg-white rounded-lg shadow sm:p-5 flex flex-col space-y-2 overflow-hidden">
			<div class="flex justify-between items-center pb-4 rounded-t border-b">
				<h3 class="text-lg font-semibold text-OnPrimaryContainer">List Pengumuman</h3>
				<svg @click="toggleModal(modalShowListPengumuman)" xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 hover:cursor-pointer hover:bg-Primary hover:duration-500 hover:rounded-lg"
					fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</div>
			<div class="h-[100px] w-full rounded shadow-xl flex items-center justify-between space-x-3 px-2"
				v-if="dataAnnouncementInList != null">
				<div class="font-bold text-lg m-1">
					{{ dataAnnouncementInList.announcement_in_list[currentIndex].announcement.an_title }}
				</div>
			</div>
			<!-- Image Slider -->
			<div class="relative flex items-center justify-center flex-grow overflow-auto">
				<div class="overflow-hidden w-2/3 h-full">
					<div class="flex h-full transition-transform duration-500 ease-in-out"
						:style="{ transform: `translateX(-${currentIndex * 100}%)` }">
						<!-- Loop through images -->
						<div v-if="dataAnnouncementInList != null"
							v-for="(data, index) in dataAnnouncementInList.announcement_in_list" :key="index"
							class="flex-shrink-0 w-full h-full flex justify-center items-center">
							<img v-if="data.announcement.an_type == 'image'" :src="data.announcement.an_url"
								alt="Announcement Image"
								class="max-w-full max-h-full object-contain rounded-lg shadow-xl" />
							<video v-else class="max-w-full max-h-full object-contain rounded-lg shadow-xl" controls
								:src="data.announcement.an_url"></video>
						</div>
					</div>
				</div>

				<!-- Navigation Controls -->
				<button v-if="currentIndex > 0" @click="prevSlide"
					class="absolute top-1/2 transform -translate-y-1/2 left-0 bg-Primary text-OnPrimary p-2 rounded-full hover:bg-OnPrimaryContainer">
					Prev
				</button>
				<button v-if="
					dataAnnouncementInList != null &&
					currentIndex < dataAnnouncementInList.announcement_in_list.length - 1
				" @click="nextSlide"
					class="absolute top-1/2 transform -translate-y-1/2 right-0 bg-Primary text-OnPrimary p-2 rounded-full hover:bg-OnPrimaryContainer">
					Next
				</button>
			</div>
		</div>
	</div>
	<!-- MODAL SET REMINDER -->
	<div v-if="modalSetReminder"
		class="overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
		<div class="p-4 w-full max-w-6xl h-5/6 relative bg-white rounded-lg shadow sm:p-5 flex flex-col space-y-2">
			<div class="flex justify-between items-center pb-4 rounded-t border-b">
				<h3 class="text-lg font-semibold text-OnPrimaryContainer">List Reminder</h3>
				<div class="flex items-center space-x-4">
					<div class="relative">
						<input type="text" placeholder="Search..."
							class="block w-full py-2 pl-10 pr-4 leading-tight bg-white border border-gray-300 rounded focus:outline-none focus:bg-white focus:border-gray-500" />
						<div class="absolute inset-y-0 left-0 flex items-center pl-3">
							<svg class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M15 15l5 5M10 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
							</svg>
						</div>
					</div>
					<svg @click="toggleModalReminder" xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 hover:cursor-pointer hover:bg-Primary hover:duration-500 hover:rounded-lg"
						fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M6 18L18 6M6 6l12 12" />
					</svg>
				</div>
			</div>
			<div class="flex-col flex-grow space-y-1 overflow-auto p-4 rounded">
				<!-- Dropdown with IP List -->
				<div>Select Screen</div>
				<select v-if="listReminder != null && listReminder.length > 0" class="w-full rounded py-2 border mb-4"
					v-model="reminderScreenIp" @change="reminderData">
					<option v-if="listScreen != null" v-for="ip in listReminder.filter((item) => item.socket_ip != '')"
						:value="ip.socket_ip" class="text-onPrimary">{{
							ip.socket_ip + " - " + ScreenDetail(ip.socket_ip).sc_name + " - " +
							ScreenDetail(ip.socket_ip).sc_location }}
					</option>
				</select>

				<!-- Reminders List -->
				<div v-for="(reminder, index) in tempReminder"
					class="flex items-center justify-between p-3 rounded cursor-pointer bg-gray-100 border hover:bg-slate-700 text-black hover:text-OnPrimary">
					<div>{{ reminder.Judul }}</div>

					<div class="flex justify-center items-center space-x-2">
						<div>{{ reminder.Deadline }}</div>
						<img src="\icon-delete.png" @click="deleteReminder(index)"
							class="w-10 h-10 hover:bg-red-950 bg-red-400 rounded duration-300">
					</div>
				</div>
				<!-- New Reminder Input (shown when 'Add New' is clicked) -->
				<div v-if="showNewReminderInput" class="space-y-1">
					<input v-model="newReminderTitle" type="text" placeholder="New Reminder Title"
						class="w-full p-2 rounded text-OnPrimaryContainer bg-primaryContainer border border-primary">
					<input v-model="newReminderDeadline" type="date" placeholder="New Reminder Deadline"
						class="w-full p-2 rounded text-OnPrimaryContainer bg-primaryContainer border border-primary">
					<button @click="addNewReminder"
						class="w-full bg-Primary text-OnPrimary py-2 rounded-lg hover:bg-onPrimaryContainer">
						Save
					</button>
				</div>
				<!-- Add New Button -->
				<button @click="showNewReminderInput = !showNewReminderInput"
					class="w-full bg-PrimaryContainer text-OnPrimaryContainer py-2 rounded-lg hover:bg-OnPrimaryContainer hover:text-PrimaryContainer duration-300">
					{{ showNewReminderInput ? "Cancel" : "Add New" }}
				</button>


			</div>

			<div @click="openModalSaveReminder"
				class="rounded bg-Primary text-center cursor-pointer px-6 py-2 text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer hover:duration-300">
				Simpan Reminder
			</div>
		</div>
	</div>
	<div v-if="modalSaveReminder"
		class="overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50 duration-500">
		<div class="p-4 w-3/4 max-w-6xl h-4/6 relative bg-white rounded-lg shadow sm:p-5 flex flex-col space-y-2">
			<div class="flex justify-between items-center pb-4 rounded-t border-b">
				<h3 class="text-lg font-semibold text-OnPrimaryContainer">
					Save Reminder
				</h3>
			</div>
			<div class="flex-col flex-grow space-y-1 overflow-auto">
				<div v-for="(reminder, index) in tempReminder"
					class="flex items-center justify-between p-3 rounded cursor-pointer bg-gray-100 border text-black hover:text-OnPrimary">
					<div>{{ reminder.Judul }}</div>
					<div>{{ reminder.Deadline }}</div>
				</div>
			</div>
			<div class="flex space-x-2">
				<div @click="modalSaveReminder = false"
					class="rounded bg-red-500 text-center cursor-pointer px-6 py-2 text-OnPrimary hover:bg-red-300 hover:duration-300">
					Cancel</div>
				<div @click="saveReminder()"
					class="rounded bg-Primary text-center cursor-pointer px-6 py-2 text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer hover:duration-300">
					Simpan Untuk Semua Screen
				</div>
				<div @click="saveReminder(reminderScreenIp)"
					class="rounded bg-Primary text-center cursor-pointer px-6 py-2 text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer hover:duration-300">
					Simpan Untuk Screen {{ ScreenDetail(reminderScreenIp).sc_name }}
				</div>
			</div>
		</div>
	</div>
	<!-- Modal add list pengumuman -->
	<div ref="modalAddListPengumuman" v-if="currentUser != null"
		class="hidden overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
		<form @submit.prevent="tambahListPengumuman"
			class="p-4 w-3/4 max-w-6xl h-[calc(100vh-20px)] relative bg-white rounded-lg shadow sm:p-5 flex flex-col space-y-2">
			<div class="flex justify-between items-center pb-4 rounded-t border-b">
				<h3 class="text-lg font-semibold text-OnPrimaryContainer">Tambah List Pengumuman</h3>
				<svg @click="toggleModal(modalAddListPengumuman)" xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 hover:cursor-pointer hover:bg-Primary hover:duration-500 hover:rounded-lg"
					fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</div>
			<div class="flex-col flex-grow space-y-2 overflow-auto">
				<div class="flex flex-col space-y-2 text-OnPrimaryContainer">
					<div class="flex flex-col">
						<label for="listName">List Name</label>
						<input v-model="listName" type="text" required
							class="border-2 border-gray-500 hover:border-Primary rounded-md hover:duration-300 px-2 py-2" />
					</div>

					<select v-model="kategori" name="" id="" required>
						<option value="">Pilih Kategori pengumuman</option>
						<option v-for="data in currentUser.role.categoryuser"
							:value="{ id: data.cu_cat_id, name: data.category.cat_name }">
							{{ data.category.cat_name }}
						</option>
					</select>
				</div>
				<div v-if="kategori != null" class="max-h-full">
					<!-- Kategori pengumuman kampus -->
					<div v-if="kategori.name.toUpperCase() == 'pengumuman kampus'.toUpperCase()"
						v-for="(data, index) in dataPengumuman"
						class="h-[100px] w-full rounded shadow-xl hover:bg-slate-50 flex items-center justify-between space-x-3">
						<div class="flex justify-between items-center w-full space-x-3">
							<div class="font-bold text-lg m-1 w-full">{{ data.pengumuman_judul }}</div>
							<div class="w-fit flex justify-end space-x-4">
								<button type="button" class="rounded bg-Primary text-OnPrimary text-center px-3 py-1"
									@click="openModalQr(data.pengumuman_namafile)">
									Detail
								</button>
								<div @click="toggleSelection(data)"
									class="relative w-14 h-8 rounded-full p-1 border-OnPrimaryContainer border-2 flex items-center bg-slate-200 cursor-pointer">
									<input type="checkbox" v-on:click="toggleSelection(data)"
										:checked="isSelected(data)"
										class="absolute w-6 h-6 rounded-full appearance-none bg-white border-none checked:right-0 checked:left-6 transition-transform duration-1000 checked:bg-green-400"
										disabled />
								</div>
							</div>
						</div>
					</div>
					<!-- Kategori lowongan magang/kerja -->
					<div v-else-if="kategori.name.toUpperCase().includes('LOWONGAN')"
						v-for="(data, index) in filteredLowongan"
						class="h-[100px] w-full rounded shadow-xl hover:bg-slate-50 flex items-center justify-between space-x-3">
						<div class="flex items-center space-x-3 w-full">
							<div class="flex-col w-full">
								<div class="font-bold text-lg m-1">{{ data.lowongan_judul }}</div>
								<div class="flex justify-between w-full items-center">
									<div class="w-full">
										<div>{{ data.perusahaan_nama }}</div>
										<div>{{ data.lowongan_posisi }}</div>
									</div>
									<div class="w-full">
										<div>Lokasi : {{ data.kota_nama }}</div>
										<div>
											Start : {{ data.lowongan_entried }} Deadline : {{ data.lowongan_deadline }}
										</div>
									</div>
									<div class="w-fit flex justify-end space-x-4">
										<button type="button"
											class="rounded bg-Primary text-OnPrimary text-center px-3 py-1"
											@click="openModalLowongan(data)">
											Detail
										</button>
										<div @click="toggleSelection(data)"
											class="relative w-14 h-8 rounded-full p-1 border-OnPrimaryContainer border-2 flex items-center bg-slate-200 cursor-pointer">
											<input type="checkbox" :checked="isSelected(data)" disabled
												class="absolute w-6 h-6 rounded-full appearance-none bg-white border-none checked:right-0 checked:left-6 transition-transform duration-1000 checked:bg-green-400" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- Kategori kegiatan kampus -->
					<div v-else-if="kategori.name.toUpperCase() == 'pengumuman kegiatan'.toUpperCase()"
						v-for="(data, index) in dataLaporanBAK.filter((item) => item.poster_preview_link != null)"
						class="h-[100px] w-full rounded shadow-xl hover:bg-slate-50 flex items-center justify-between space-x-3">
						<div class="flex items-center space-x-3 w-full" @click="">
							<div class="flex-col w-full">
								<div class="font-bold text-lg m-1">{{ data.keg_nama }}</div>
								<div class="flex justify-between w-full items-center">
									<div class="w-full">
										<div>Organisasi :</div>
										<div>{{ data.org_nama }}</div>
									</div>
									<div class="w-full">
										<div>Lokasi : {{ data.keg_tempat }}</div>
										<div>
											Start : {{ convertDate(data.keg_tanggal_start) }} Deadline : {{
												convertDate(data.keg_tanggal_end) }}
										</div>
									</div>
									<div v-if="data.poster_preview_link != null"
										class="w-fit flex justify-end space-x-4">
										<button type="button"
											class="rounded bg-Primary text-OnPrimary text-center px-3 py-1"
											@click="openModalKegiatan(data)">
											Detail
										</button>
										<div @click="toggleSelection(data)"
											class="relative w-14 h-8 rounded-full p-1 border-OnPrimaryContainer border-2 flex items-center bg-slate-200 cursor-pointer">
											<input type="checkbox" :checked="isSelected(data)" disabled
												class="absolute w-6 h-6 rounded-full appearance-none bg-white border-none checked:right-0 checked:left-6 transition-transform duration-1000 checked:bg-green-400" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div v-else-if="kategori.name.toUpperCase() == 'poster tugas akhir'.toUpperCase()"
						v-for="(folder, index) in dataPosterTA"
						class="w-full rounded shadow-xl hover:bg-slate-50 flex items-center justify-between space-x-3">
						<div class="flex items-center space-x-3 w-full" @click="">
							<div class="flex-col w-full space-y-2">
								<div class="font-bold text-lg m-1">{{ folder.name }}</div>
								<div v-for="file in folder.posterFile" class="flex justify-between w-full items-center">
									<div class="w-full">
										<div>{{ file.name }}</div>
									</div>
									<div class="w-fit flex justify-end space-x-4">
										<button type="button"
											class="rounded bg-Primary text-OnPrimary text-center px-3 py-1"
											@click="openModalPoster(file)">
											Detail
										</button>
										<div @click="toggleSelection(file)"
											class="relative w-14 h-8 rounded-full p-1 border-OnPrimaryContainer border-2 flex items-center bg-slate-200 cursor-pointer">
											<input type="checkbox" :checked="isSelected(file)" disabled
												class="absolute w-6 h-6 rounded-full appearance-none bg-white border-none checked:right-0 checked:left-6 transition-transform duration-1000 checked:bg-green-400" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- Kategori lain -->
					<div v-else
						v-for="(data, index) in dataAnnouncement.filter((item) => item.an_cat_id == kategori.id)"
						class="h-[100px] w-full rounded shadow-xl hover:bg-slate-50 flex items-center justify-between space-x-3">
						<div class="flex items-center space-x-3 w-full">
							<div class="flex-col w-full">
								<div class="font-bold text-lg m-1">{{ data.an_title }}</div>
								<div class="flex justify-between w-full items-center">
									<div class="w-full">
										<div>Tanggal Dibuat : {{ convertDate(data.createdAt) }}</div>
										<div>Jenis Konten : {{ data.an_type }}</div>
									</div>
									<div class="w-fit flex justify-end space-x-4">
										<button type="button"
											class="rounded bg-Primary text-OnPrimary text-center px-3 py-1"
											@click="openModalKonten(data)">
											Detail
										</button>
										<div @click="toggleSelection(data)"
											class="relative w-14 h-8 rounded-full p-1 border-OnPrimaryContainer border-2 flex items-center bg-slate-200 cursor-pointer">
											<input type="checkbox" :checked="isSelected(data)" disabled
												class="absolute w-6 h-6 rounded-full appearance-none bg-white border-none checked:right-0 checked:left-6 transition-transform duration-1000 checked:bg-green-400" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-if="kategori.name.toUpperCase() == 'poster tugas akhir'.toUpperCase()">
				<div class="flex justify-between items-center">
					<button type="button" @click="prevPoster"
						class="rounded bg-Primary text-OnPrimary text-center px-3 py-1">
						Prev
					</button>
					<div>
						<div class="flex flex-col max-h-full overflow-auto" v-for="item in selectedItems">
							<div class="flex justify-between">{{ item.foldername + '|' + item.name }}
								<div @click="toggleSelection(item)"
									class="border-OnPrimaryContainer border-2 flex items-center justify-center bg-slate-200 cursor-pointer rounded px-2">
									x
								</div>
							</div>
						</div>
					</div>
					{{ posterPage + "/" + Math.ceil(posterFolder.length / 4) }}
					<button type="button" @click="nextPoster"
						class="rounded bg-Primary text-OnPrimary text-center px-3 py-1">
						Next
					</button>
				</div>
			</div>
			<button type="submit"
				class="rounded bg-Primary text-center cursor-pointer px-6 py-2 text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer hover:duration-300">
				Tambahkan
			</button>
		</form>
	</div>
	<ModalShowPengumuman :modalPengumuman="isModalPengumumanOpen" :imageUrl="imageUrl" :kontenType="kontenType"
		:closeModal="closeModal" />
	<NotificationModal :modalHeader="modalHeader" :modalContent="modalContent" :buttonFunction="buttonNotification"
		:isOpen="isOpen" />
	<Loading :loading="onLoading" :message="loadingMessage" />
</template>

<script setup>
import { io } from "socket.io-client"
const searchedList = ref("")
const onLoading = ref(false)
const loadingMessage = ref("")
const currentIndex = ref(0)
const { getUserData } = useUser()
const { getLaporanBAK, getPengumuman, getLowongan, dataPosterMhs, getPosterTA } = useDataISTTS()
const { getCLient, getMusicClient, getReminderClient } = useSocket()
const { getScreen } = useScreen()
const listClient = ref(await getCLient())
const { getCategory } = useCategory()
const { getListAnnouncement, addListAnnouncement, deleteListAnnouncement, getAnnouncement } = useAnnouncement()
const modalHeader = ref("")
const modalContent = ref("")
const isOpen = ref(false)
const buttonNotification = () => {
	isOpen.value = false
	if (modalHeader.value == "Berhasil") {
		const router = useRouter()
		router.go()
	}
}
// POSTER VARIABLE
const posterPage = ref(1)
const posterFolder = ref(await getPosterTA('1cRmvFauuKumDPWt4Wy5olf9gLEybVBeb'))
const isModalPengumumanOpen = ref(false)
const modalAddListPengumuman = ref(null)
const modalShowListPengumuman = ref(null)
// const pengumumanRes = await getPengumuman()
const [pengumumanRes, lowonganRes, laporanBAKRes] = await Promise.all([
	getPengumuman(),
	getLowongan(),
	getLaporanBAK(),
])
const dataPengumuman = pengumumanRes.response
const dataLowongan = lowonganRes.response
const dataLaporanBAK = laporanBAKRes.response
const dataPosterTA = ref([])
const dataAnnouncement = ref(await getAnnouncement())
const dataListAnnouncement = ref(await getListAnnouncement())
const dataAnnouncementInList = ref(null)
const listName = ref("")
const kategori = ref({ name: "", id: "" })
const currentUser = ref(null)
// Variabel untuk menampung data pengumuman yang dipilih
const listScreen = ref(await getScreen())
const imageUrl = ref(null)
const kontenType = ref(null)
const selectedItems = ref([])
// MODAL REMINDER
const modalSetReminder = ref(false)
const listReminder = ref(await getReminderClient())
console.log("CLIENT:", listReminder.value)

const host = "http://192.168.9.203"
// const host = "http://localhost:3000"
const socket = io(host, {
	path: "/api/socket.io",
})
onMounted(async () => {
	socket.on("connect", () => {
		socket.emit("clientType", "server")
	})
	socket.on("success", (response) => {
		openNotif("Success", response)
	})

	socket.on("userConnect", async (response) => {
		listClient.value = await getCLient()
		console.log("User Connected: ", response)
		const clientsWithSameIP = listClient.value.filter((client) => client.socket_ip === response.ip)
		console.log(clientsWithSameIP)
		if (clientsWithSameIP.length === 1) {
			router.go()
		}
	})
	socket.on("userDisconnect", async (response) => {
		console.log("User Disconnected: ", response)
		listClient.value = await getCLient()
		const isExistingClient = listClient.value.some((client) => client.socket_ip === response.ip)
		if (!isExistingClient) {
			router.go()
		}
	})
})

const toggleModalReminder = () => {
	if (modalSetReminder.value == true) {
		reminderScreenIp.value = ''
		tempReminder.value = null
	}
	modalSetReminder.value = !modalSetReminder.value

}
// FUNCTION REMINDER
const reminderScreenIp = ref("")
const showNewReminderInput = ref(false)
const newReminderTitle = ref("")
const newReminderDeadline = ref('')
const tempReminder = ref(null)
const modalSaveReminder = ref(false)
const deleteReminder = (index) => {
	tempReminder.value.splice(index, 1)
}
const reminderData = () => {
	console.log(reminderScreenIp.value)
	const reminder = listReminder.value.find((reminder) => reminder.socket_ip === reminderScreenIp.value)
	if (reminder) {
		tempReminder.value = reminder.reminder
		tempReminder.value.sort((a, b) => new Date(a.Deadline) - new Date(b.Deadline))
	}
}
const ScreenDetail = (ip) => {
	const screen = listScreen.value.find((screen) => screen.sc_ip === ip)
	if (screen) {
		return screen
	}
}
const addNewReminder = () => {
	if (tempReminder.value == null) {
		tempReminder.value = []
	}
	const newReminder = {
		Judul: newReminderTitle.value,
		Deadline: new Date(newReminderDeadline.value).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
	}
	tempReminder.value.push(newReminder)
	tempReminder.value.sort((a, b) => new Date(a.Deadline) - new Date(b.Deadline))
}
const openModalSaveReminder = () => {
	if (tempReminder.value == null || reminderScreenIp.value == '') {
		openNotif("Error", "Reminder kosong/belum memilih screen")
		console.log(tempReminder.value)
	}
	else {
		modalSaveReminder.value = true
	}
}
const saveReminder = (data) => {
	if (data == null) {
		socket.emit("sendReminder", {
			ip: '',
			reminder: tempReminder.value,
		})
	}
	else {
		socket.emit("sendReminder", {
			ip: reminderScreenIp.value,
			reminder: tempReminder.value,
		})
	}
	openNotif("Success", "Reminder Berhasil Disimpan")
}
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
	console.log(currentUser.value)
	dataPosterTA.value = await dataPosterMhs(posterPage.value)
})
watch(kategori, () => {
	selectedItems.value = []
})
watch(posterPage, async () => {
	dataPosterTA.value = await dataPosterMhs(posterPage.value)
})
// function to next poster modal
const nextPoster = async () => {
	if (posterFolder.value.length / 4 > posterPage.value) {
		posterPage.value++
	}
}
const prevPoster = async () => {
	if (posterPage.value > 1) {
		posterPage.value--
	}
}
// Function to open or close modal
const toggleModalShowListPengumuman = (modal, data) => {
	toggleModal(modal)
	if (modal.classList.contains("hidden")) {
		dataAnnouncementInList.value = null
	} else {
		dataAnnouncementInList.value = data
	}
}
const toggleModal = (modal) => {
	console.log(modal)
	currentIndex.value = 0
	modal.classList.toggle("hidden")
}
// MODAL TO SHOW PENGUMUMAN
const openModalQr = (pdfUrl) => {
	isModalPengumumanOpen.value = !isModalPengumumanOpen.value
	kontenType.value = "image"
	convertPDFtoQrCode(pdfUrl)
}
const openModalLowongan = (data) => {
	isModalPengumumanOpen.value = !isModalPengumumanOpen.value
	kontenType.value = "image"
	imageUrl.value = data.link
}
const openModalKegiatan = (data) => {
	isModalPengumumanOpen.value = !isModalPengumumanOpen.value
	kontenType.value = "image"
	const link = `https://drive.google.com/thumbnail?id=${data.poster_link}&sz=w1000`
	imageUrl.value = link
}

const openModalPoster = (data) => {
	isModalPengumumanOpen.value = !isModalPengumumanOpen.value
	kontenType.value = "image"
	const link = `https://drive.google.com/thumbnail?id=${data.link}&sz=w1000`
	imageUrl.value = link
}
const openModalKonten = (data) => {
	isModalPengumumanOpen.value = !isModalPengumumanOpen.value
	imageUrl.value = data.an_url
	kontenType.value = data.an_type
}

const closeModal = () => {
	isModalPengumumanOpen.value = !isModalPengumumanOpen.value
}
const filteredLowongan = computed(() => {
	if (kategori.value.name.toUpperCase() == "LOWONGAN MAGANG") {
		return dataLowongan.filter((item) => item.lowongan_judul == "Lowongan Magang")
	} else {
		return dataLowongan.filter((item) => item.lowongan_judul == "Lowongan Kerja")
	}
})
const convertPDFtoQrCode = (pdfUrl) => {
	imageUrl.value = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${pdfUrl}`
}
const toggleSelection = (data) => {
	const index = selectedItems.value.indexOf(data)
	if (index !== -1) {
		selectedItems.value.splice(index, 1)
	} else {
		const category = currentUser.value.role.categoryuser.find((item) => item.cu_cat_id == kategori.value.id)
		if (category.category.cat_qty > selectedItems.value.length) {
			selectedItems.value.push(data)
		} else {
			openNotif("Error", "Jumlah pengumuman sudah mencapai limit")
		}
	}
}
const openNotif = (header, content) => {
	modalHeader.value = header
	modalContent.value = content
	isOpen.value = true
}
// COMPARE OBJECT
const areObjectsEqual = (obj1, obj2) => {
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);

	if (keys1.length !== keys2.length) return false;

	return keys1.every(key => obj2.hasOwnProperty(key) && obj1[key] === obj2[key]);
};

const arrayContainsObject = (a, b) => {
	return a.some(item => areObjectsEqual(item, b));
};
const isSelected = (data) => {
	return arrayContainsObject(selectedItems.value, data)
	// return selectedItems.value.includes(data)
}
const tambahListPengumuman = async () => {
	let dataItem
	if (kategori.value.name.toUpperCase() == "pengumuman kampus".toUpperCase()) {
		dataItem = selectedItems.value.map((item) => {
			return {
				an_id: item.pengumuman_kode,
				an_title: item.pengumuman_judul,
				an_url: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${item.pengumuman_namafile}`,
				an_type: "image",
			}
		})
	} else if (kategori.value.name.toUpperCase() == "pengumuman kegiatan".toUpperCase()) {
		dataItem = selectedItems.value.map((item) => {
			return {
				an_id: item.keg_kode,
				an_title: item.keg_nama,
				an_url: item.poster_link,
				an_type: "image",
			}
		})
	} else if (kategori.value.name.toUpperCase().includes("LOWONGAN")) {
		dataItem = selectedItems.value.map((item) => {
			return {
				an_id: item.lowongan_id,
				an_title: `${item.perusahaan_nama} ${item.lowongan_judul}`,
				an_url: item.link,
				an_type: "image",
			}
		})
	} else if (kategori.value.name.toUpperCase() == "poster tugas akhir".toUpperCase()) {
		dataItem = selectedItems.value.map((item) => {
			return {
				an_id: item.link,
				an_title: item.name,
				an_url: item.link,
				an_type: "image",
			}
		})
	}
	else {
		dataItem = selectedItems.value.map((item) => {
			return {
				an_id: item.an_id,
				an_title: item.an_title,
				an_url: item.an_url,
				an_type: item.an_type,
			}
		})
	}
	const data = {
		listName: listName.value,
		kategori: kategori.value.id,
		kategoriName: kategori.value.name,
		currentUser: currentUser.value.us_username,
		announcements: dataItem,
	}
	setLoadingState(true, "Menambahkan List Pengumuman")
	const result = await addListAnnouncement(data)
	setLoadingState(false)
	if (result.statusCode == 200) {
		openNotif("Berhasil", result.body.message)
	} else {
		openNotif("Error", result.body.message)
	}
}
const hapusListPengumuman = async (data) => {
	setLoadingState(true, "Menghapus List Pengumuman")
	const result = await deleteListAnnouncement(data)
	console.log(result)
	if (result.status == 200) {
		setLoadingState(false)
		openNotif("Berhasil", result.statusText)
	} else {
		openNotif("Error", result.statusText)
	}
}
// Pagination untuk image slider
const nextSlide = () => {
	if (currentIndex.value < dataAnnouncementInList.value.announcement_in_list.length - 1) {
		currentIndex.value++
	}
}
const prevSlide = () => {
	if (currentIndex.value > 0) {
		currentIndex.value--
	}
}
// Convert createdAt to readable date DD Month Year in Indonesian
const convertDate = (date) => {
	const options = { year: "numeric", month: "long", day: "numeric" }
	return new Date(date).toLocaleDateString("id-ID", options)
}
// LOADING STATE
const setLoadingState = (isLoading, message = "") => {
	onLoading.value = isLoading
	loadingMessage.value = message
}
function formatDuration(durationInSeconds) {
	const minutes = Math.floor(durationInSeconds / 60)
	const seconds = durationInSeconds % 60
	return minutes > 0 ? `${minutes} Menit ${seconds} Detik` : `${seconds} Detik`
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