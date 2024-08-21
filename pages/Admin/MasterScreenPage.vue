<template>
	<div class="bg-Primary h-svh w-full p-2 flex space-x-3">
		<div class="flex flex-col h-full w-[20%] bg-white rounded-xl p-2 space-y-2">
			<Navbar />
		</div>
		<div class="h-full w-[80%] bg-white rounded-xl flex-col p-2">
			<div class="flex justify-between items-center">
				<div class="text-Primary font-bold text-2xl">Daftar Monitor</div>
				<div class="flex space-x-1">
					<button
						@click="toggleModal(modalSetBGM)"
						class="p-2 bg-Primary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer text-white rounded">
						Add BGM
					</button>
				</div>
			</div>
			<div class="border-b-2 border-Primary mt-1"></div>

			<div class="flex flex-wrap m-1">
				<div
					v-for="screen in listScreen"
					class="h-[260px] w-[260px] rounded mx-1 space-y-1">
					<div
						class="bg-Primary h-[225px] w-[260px] rounded flex flex-col items-center justify-center cursor-pointer hover:shadow-2xl hover:bg-OnPrimaryContainer text-OnPrimary"
						@click="toggleModal(modalScreen, screen)">
						<img
							src="\Monitor.png"
							alt="" />
						<div>{{ screen.sc_name }}</div>
						<div>{{ screen.sc_location }}</div>
						<div>{{ screen.sc_ip }}</div>

						<div v-if="screen.playlist != null">
							{{ screen.playlist.pl_name }}
						</div>
						<div class="flex">
							Status :
							<div :class="statusClass(screen.sc_ip)">
								{{ statusText(screen.sc_ip) }}
							</div>
						</div>
					</div>
					<div
						class="bg-Primary h-[30px] w-[260px] rounded flex flex-col items-center justify-center cursor-pointer hover:shadow-2xl hover:bg-OnPrimaryContainer text-OnPrimary"
						@mouseover="isHoveredCurrentMusic[screen.sc_id] = true"
						@mouseleave="isHoveredCurrentMusic[screen.sc_id] = false">
						<div
							class="overflow-hidden flex items-start text-center max-h-[30px] w-max max-w-[260px]"
							v-if="!isHoveredCurrentMusic[screen.sc_id]">
							Current Music : {{ musicTitle(screen.sc_ip) }}
						</div>
						<marquee v-else>Current Music : {{ musicTitle(screen.sc_ip) }}</marquee>
					</div>
				</div>

				<div
					class="bg-Primary h-[260px] w-[260px] rounded flex flex-col items-center justify-center mx-1 cursor-pointer hover:shadow-2xl hover:bg-OnPrimaryContainer text-OnPrimary"
					@click="toggleModal(modalAddScreen)">
					<img
						src="/icon-add.png"
						alt="" />
					<div>Add New Screen</div>
				</div>
			</div>
		</div>
	</div>
	<div
		ref="modalScreen"
		class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 p-8 rounded-lg shadow-md z-10 h-full w-full hidden">
		<div
			class="bg-gradient-to-br from-Primary to-OnPrimaryContainer rounded-md space-x-3 flex justify-center overflow-auto max-h-[90vh] p-2">
			<div
				class="absolute top-11 right-16 cursor-pointer text-gray-300 hover:bg-Primary hover:rounded-xl duration-500">
				<svg
					@click="toggleModal(modalScreen)"
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
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
			<iframe
				v-if="currentScreen != null"
				:src="currentScreen.sc_ip + '/preview'"
				width="70%"
				height="800px"
				frameborder="2"
				sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
				style="pointer-events: none"
				class="bg-white"></iframe>
			<div class="flex-col space-y-3">
				<div
					@click="toggleModalEdit(modalEditScreen)"
					class="rounded bg-Primary text-center cursor-pointer px-6 py-2 text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer hover:duration-300">
					Ganti Data Screen
				</div>
				<div
					@click="toggleModalEdit(modalPlaylist)"
					class="rounded bg-Primary text-center cursor-pointer px-6 py-2 text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer hover:duration-300">
					Konfigurasi Playlist
				</div>
				<div
					@click="toggleModalEdit(modalChangeTemplate)"
					class="rounded bg-Primary text-center cursor-pointer px-6 py-2 text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer hover:duration-300">
					Ganti Template
				</div>
			</div>
		</div>
	</div>
	<!-- MODAL GANTI TEMPLATE -->
	<div
		ref="modalChangeTemplate"
		class="hidden overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
		<div class="p-4 w-full max-w-2xl relative bg-white rounded-lg shadow sm:p-5 flex flex-col space-y-2">
			<div class="flex gap-1 justify-between items-center pb-4 rounded-t border-b">
				<h3 class="text-lg font-semibold text-OnPrimaryContainer">Ganti Template</h3>
				<svg
					@click="toggleModalEdit(modalChangeTemplate)"
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
			<div class="flex flex-col space-y-2 max-h-[70vh] overflow-auto">
				<div class="flex space-x-2">
					<!-- TEMPLATE 1 -->
					<div class="rounded w-full h-[300px] bg-Primary flex flex-col">
						<div class="bg-black bg-opacity-40 h-full">
							<marquee class="text-OnPrimary h-[10%] bg-Primary flex items-center">
								Digital Signage ISTTS
							</marquee>
							<div class="h-[80%] flex justify-center items-center text-4xl text-white">CONTENT</div>
							<marquee class="bg-OnPrimaryContainer h-[10%] flex">
								<div class="flex items-center">
									<div class="text-PrimaryContainer">Digital Signage ISTTS</div>
									<img
										src="/LogoISTTS.png"
										alt=""
										class="h-[30px]" />
								</div>
							</marquee>
						</div>
					</div>
					<input
						v-model="screenTemplate"
						type="radio"
						name="template"
						id="template"
						value="template1" />
				</div>
				<div class="flex space-x-2">
					<!-- TEMPLATE 2 -->
					<div class="rounded w-full h-[300px] bg-Primary flex flex-col">
						<div class="bg-black bg-opacity-40 h-full">
							<marquee class="text-OnPrimary h-[10%] bg-Primary flex items-center">
								Digital Signage ISTTS
							</marquee>
							<div class="h-[80%] w-full flex justify-center items-center text-4xl text-white">
								<div class="flex flex-col h-full w-1/3 overflow-hidden shadow-lg">
									<!-- Weather UI -->
									<div
										class="h-1/2 bg-gradient-to-br from-OnPrimaryContainer to-Primary flex flex-col items-center justify-center text-base text-center">
										Informasi Cuaca dan Jam
									</div>
									<!-- Reminder -->
									<div class="h-1/2 bg-black flex flex-col justify-center items-center bg-opacity-60">
										<div class="text-white p-1 text-base">Reminder</div>
									</div>
								</div>

								<div class="flex h-full justify-center items-center w-2/3 bg-black bg-opacity-10">
									Content
								</div>
							</div>
							<marquee class="bg-OnPrimaryContainer h-[10%] flex">
								<div class="flex items-center">
									<div class="text-PrimaryContainer">Digital Signage ISTTS</div>
									<img
										src="/LogoISTTS.png"
										alt=""
										class="h-[30px]" />
								</div>
							</marquee>
						</div>
					</div>
					<input
						v-model="screenTemplate"
						type="radio"
						name="template"
						id="template"
						value="template2" />
				</div>
				<div class="flex space-x-2 justify-between">
					<!-- TEMPLATE 3 -->
					<div class="rounded w-[60%] h-[700px] bg-Primary flex flex-col">
						<div class="bg-black bg-opacity-40 h-full">
							<marquee class="text-OnPrimary h-[6%] bg-Primary flex items-center">
								Digital Signage ISTTS
							</marquee>
							<div
								class="h-[44%] bg-black bg-opacity-30 flex justify-center items-center text-4xl text-white">
								CONTENT 1
							</div>
							<div class="h-[44%] flex justify-center items-center text-4xl text-white">CONTENT 2</div>
							<marquee class="bg-OnPrimaryContainer h-[6%] flex">
								<div class="flex items-center">
									<div class="text-PrimaryContainer">Digital Signage ISTTS</div>
									<img
										src="/LogoISTTS.png"
										alt=""
										class="h-[30px]" />
								</div>
							</marquee>
						</div>
					</div>
					<input
						v-model="screenTemplate"
						type="radio"
						name="template"
						id="template"
						value="template3" />
				</div>
			</div>

			<button
				@click="changeTemplate"
				class="w-full bg-Primary text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer hover:duration-300 rounded py-2">
				Ganti Template
			</button>
		</div>
	</div>
	<!-- MODAL TAMBAH SCREEN -->
	<div
		ref="modalAddScreen"
		class="hidden overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
		<div class="p-4 w-full max-w-2xl relative bg-white rounded-lg shadow sm:p-5">
			<div class="flex gap-1 justify-between items-center pb-4 mb-4 rounded-t border-b">
				<h3 class="text-lg font-semibold text-OnPrimaryContainer">Add New Screen</h3>
				<svg
					@click="toggleModal(modalAddScreen)"
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
			<div class="flex flex-col space-y-2">
				<form @submit.prevent="addNewScreen">
					<div class="flex flex-col space-y-2 text-OnPrimaryContainer">
						<div class="flex flex-col">
							<label for="screenName">Screen Name</label>
							<input
								type="text"
								v-model="screenName"
								class="border-2 border-OnPrimaryContainer hover:border-Primary rounded-md hover:duration-300 h-10"
								required />
						</div>
						<div class="flex flex-col">
							<label for="screenLocation">Screen Location</label>
							<input
								type="text"
								v-model="screenLocation"
								class="border-2 border-OnPrimaryContainer hover:border-Primary rounded-md hover:duration-300 h-10"
								required />
						</div>
						<div class="flex flex-col">
							<label for="screenUrl">Screen IP</label>
							<input
								type="text"
								v-model="screenIP"
								class="border-2 border-OnPrimaryContainer hover:border-Primary rounded-md hover:duration-300 h-10"
								placeholder="example: 192.168.0.33"
								required />
						</div>
						<div class="flex justify-center">
							<button
								type="submit"
								class="bg-Primary text-OnPrimary rounded-md px-4 py-2 hover:text-OnPrimaryContainer hover:bg-PrimaryContainer w-full duration-300">
								Tambah
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	<!-- MODAL GANTI PLAYLIST -->
	<div
		ref="modalPlaylist"
		class="hidden overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
		<div class="p-4 w-full max-w-6xl h-5/6 relative bg-white rounded-lg shadow sm:p-5 flex flex-col space-y-2">
			<div class="flex justify-between items-center pb-4 rounded-t border-b">
				<h3 class="text-lg font-semibold text-OnPrimaryContainer">Daftar Playlist</h3>
				<div class="flex items-center space-x-4">
					<div class="relative">
						<input
							type="text"
							placeholder="Search..."
							class="block w-full py-2 pl-10 pr-4 leading-tight bg-white border border-gray-300 rounded focus:outline-none focus:bg-white focus:border-gray-500" />
						<div class="absolute inset-y-0 left-0 flex items-center pl-3">
							<svg
								class="h-6 w-6 text-gray-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 15l5 5M10 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
							</svg>
						</div>
					</div>
					<svg
						@click="toggleModalEdit(modalPlaylist)"
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
			</div>
			<div class="flex-col flex-grow space-y-2 overflow-auto">
				{{ screenPlaylist }}
				<div
					v-if="!loadPlaylist"
					v-for="(data, index) in listPlaylist">
					<div
						class="h-[120px] w-full rounded shadow-xl hover:bg-slate-50 flex items-center justify-between space-x-3 cursor-pointer">
						<div
							class="flex items-center space-x-3"
							@click="toggleDropDown(index)">
							<div class="flex-col">
								<div class="font-bold text-lg m-1">
									{{ data.pl_name }}
								</div>
								<div class="text-base mx-1">
									Dibuat :
									{{
										new Date(data.createdAt).toLocaleDateString("id-ID", {
											day: "2-digit",
											month: "long",
											year: "numeric",
										})
									}}
								</div>
								<div class="text-base mx-1">
									Jumlah List Pengumuman :
									{{ data.list_in_playlist.length }}
								</div>
							</div>
						</div>
						<div class="flex space-x-2">
							<div class="rounded-md overflow-hidden">
								<input
									v-model="selectedDate[data.pl_id]"
									type="date"
									:disabled="isDataExist(data.pl_id)" />
							</div>
							<div
								@click="toggleSelectPlaylist(data.pl_id, selectedDate[data.pl_id])"
								class="relative w-14 h-8 rounded-full p-1 border-OnPrimaryContainer border-2 flex items-center bg-slate-200">
								<input
									type="checkbox"
									:checked="isDataExist(data.pl_id)"
									disabled
									class="absolute w-6 h-6 rounded-full appearance-none cursor-pointer bg-white border-none checked:right-0 checked:left-6 transition-transform duration-1000 checked:bg-green-400" />
							</div>
						</div>
					</div>
					<div
						class="bg-white shadow-lg rounded w-[100%] duration-1000 overflow-hidden transition-all"
						:class="{
							'max-h-screen': isDropdownOpen[index],
							'max-h-0': !isDropdownOpen[index],
						}">
						<ul class="py-1">
							<li
								v-for="(dataListAn, indexListAn) in data.list_in_playlist"
								class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between w-full">
								<div class="w-full">
									<div>
										{{ indexListAn + 1 + ". " + dataListAn.listannouncement.la_title }}
									</div>
									<div>
										Kategori:
										{{ dataListAn.listannouncement.category.cat_name }}
									</div>
								</div>
								<div class="w-full">
									<div>
										Jumlah Pengumuman :
										{{ dataListAn.listannouncement.announcement_in_list.length }}
									</div>
									<div>
										Durasi List Pengumuman :
										{{
											parseInt(dataListAn.listannouncement.category.cat_duration) *
											parseInt(dataListAn.listannouncement.announcement_in_list.length)
										}}s
									</div>
									<div>
										Durasi Per Pengumuman :
										{{ parseInt(dataListAn.listannouncement.category.cat_duration) }}s
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div
				@click="uploadPlaylistFile"
				class="rounded bg-Primary text-center cursor-pointer px-6 py-2 text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer hover:duration-300">
				Simpan Playlist
			</div>
		</div>
	</div>
	<!-- MODAL EDIT SCREEN -->
	<div
		ref="modalEditScreen"
		class="hidden overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
		<form
			@submit.prevent="editScreen"
			class="p-4 w-1/2 max-w-6xl h-3/6/6 relative bg-white rounded-lg shadow sm:p-5 flex flex-col space-y-2">
			<div class="flex justify-between items-center pb-4 rounded-t border-b">
				<h3 class="text-lg font-semibold text-OnPrimaryContainer">Edit Screen Data</h3>

				<svg
					@click="toggleModalEdit(modalEditScreen)"
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
					<div class="flex flex-col">
						<label for="screenName">Screen Name</label>
						<input
							type="text"
							v-model="screenName"
							class="border-2 border-gray-500 hover:border-Primary rounded-md hover:duration-300 px-2 py-2" />
					</div>
					<div class="flex flex-col">
						<label for="screenLocation">Screen Location</label>
						<input
							type="text"
							v-model="screenLocation"
							class="border-2 border-gray-500 hover:border-Primary rounded-md hover:duration-300 px-2 py-2" />
					</div>
					<div class="flex flex-col">
						<label for="screenUrl">Screen IP</label>
						<input
							type="text"
							v-model="screenIP"
							class="border-2 border-gray-500 hover:border-Primary rounded-md hover:duration-300 px-2 py-2"
							placeholder="example: 192.168.0.33" />
					</div>
				</div>
			</div>
			<button
				@click="refreshClient"
				class="rounded bg-Primary text-center cursor-pointer px-6 py-2 text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer hover:duration-300">
				Simpan
			</button>
		</form>
	</div>
	<!-- MODAL SET BGM -->
	<div
		ref="modalSetBGM"
		class="hidden overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
		<div class="p-4 w-1/2 max-w-6xl h-3/6/6 relative bg-white rounded-lg shadow sm:p-5 flex flex-col space-y-2">
			<div class="flex justify-between items-center pb-4 rounded-t border-b">
				<h3 class="text-lg font-semibold text-OnPrimaryContainer">Select BGM</h3>
				<h1>{{ currentVideoId }}</h1>
				<svg
					@click="toggleModal(modalSetBGM)"
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
			<div class="flex flex-col flex-grow space-y-2 overflow-auto">
				<div class="flex w-full space-x-1">
					<input
						type="text"
						v-model="searchQuery"
						class="rounded border-2 border-gray-500 hover:border-Primary px-2 py-2 w-[90%]"
						placeholder="Search..." />
					<button
						@click="searchVideos"
						class="rounded bg-Primary text-OnPrimary px-2 py-2 hover:bg-PrimaryContainer hover:text-OnPrimaryContainer w-[10%]">
						Search
					</button>
				</div>
				<ul>
					<li
						v-for="video in searchResults"
						:key="video.id.videoId"
						@click="selectVideo(video.id.videoId)"
						class="cursor-pointer hover:bg-gray-200 p-2">
						{{ video.snippet.title }}
					</li>
				</ul>
				<div class="flex w-full items-center justify-center">
					<div
						id="player"
						class=""></div>
				</div>
			</div>
			<button
				@click="toggleModal(modalMonitorBGM)"
				class="rounded bg-Primary text-center cursor-pointer px-6 py-2 text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer hover:duration-300">
				Lanjut
			</button>
		</div>
	</div>
	<!-- MODAL SELECT MONITOR TO PLAY BGM -->
	<div
		ref="modalMonitorBGM"
		class="hidden overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
		<div class="p-4 w-1/2 max-w-6xl h-3/6/6 relative bg-white rounded-lg shadow sm:p-5 flex flex-col space-y-2">
			<div class="flex justify-between items-center pb-4 rounded-t border-b">
				<h3 class="text-lg font-semibold text-OnPrimaryContainer">Select Monitor</h3>
				<svg
					@click="toggleModal(modalMonitorBGM)"
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
			<div class="flex flex-wrap flex-grow overflow-auto items-center justify-center">
				<div
					v-for="screen in listScreen.filter((screen) => statusText(screen.sc_ip) == 'Online')"
					class="h-[260px] w-[260px] rounded mx-1 space-y-1">
					<div
						class="h-[225px] w-[260px] rounded flex flex-col items-center justify-center cursor-pointer hover:shadow-2xl hover:bg-OnPrimaryContainer text-OnPrimary"
						:class="selectedScreen[screen.sc_id] ? 'bg-OnPrimaryContainer' : 'bg-Primary'"
						@click="toggleSelectScreen(screen)">
						<img
							src="\Monitor.png"
							alt="" />
						<div>{{ screen.sc_name }}</div>
						<div>{{ screen.sc_location }}</div>
						<div>{{ screen.sc_ip }}</div>

						<div v-if="screen.playlist != null">
							{{ screen.playlist.pl_name }}
						</div>
						<div class="flex">
							Status :
							<div :class="statusClass(screen.sc_ip)">
								{{ statusText(screen.sc_ip) }}
							</div>
						</div>
					</div>
					<div
						class="bg-Primary h-[30px] w-[260px] rounded flex flex-col items-center justify-center cursor-pointer hover:shadow-2xl hover:bg-OnPrimaryContainer text-OnPrimary"
						@mouseover="isHoveredCurrentMusic[screen.sc_id] = true"
						@mouseleave="isHoveredCurrentMusic[screen.sc_id] = false">
						<div
							class="overflow-hidden flex items-start text-center max-h-[30px] w-max max-w-[260px]"
							v-if="!isHoveredCurrentMusic[screen.sc_id]">
							Current Music : {{ musicTitle(screen.sc_ip) }}
						</div>
						<marquee v-else>Current Music : {{ musicTitle(screen.sc_ip) }}</marquee>
					</div>
				</div>
			</div>
			<button
				@click="changeBGM"
				class="rounded bg-Primary text-center cursor-pointer px-6 py-2 text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer hover:duration-300">
				Pasang BGM
			</button>
		</div>
	</div>
	<NotificationModal
		:modal-header="modalHeader"
		:modal-content="modalContent"
		:is-open="isOpen"
		:button-function="closeNotif" />
</template>

<script setup>
	import { io } from "socket.io-client"
	const { getPlaylist } = usePlaylist()
	const { getCLient, getMusicClient } = useSocket()
	const { createScreen, deleteScreen, getScreen, updateScreen } = useScreen()
	const listScreen = ref(await getScreen())
	const isHoveredCurrentMusic = ref({})
	onBeforeMount(async () => {
		for (let i = 0; i < listScreen.value.length; i++) {
			isHoveredCurrentMusic.value[listScreen.value[i].sc_id] = false
		}
	})
	const currentScreen = ref(null)
	const selectedScreen = ref({})
	const toggleSelectScreen = (screen) => {
		if (selectedScreen.value[screen.sc_id]) {
			delete selectedScreen.value[screen.sc_id]
		} else {
			selectedScreen.value[screen.sc_id] = screen
		}
	}
	// VAR PLAYLIST
	const listPlaylist = ref(await getPlaylist())
	const router = useRouter()
	// MODAL DECLARATION
	const modalAddScreen = ref(null)
	const modalScreen = ref(null)
	const modalPlaylist = ref(null)
	const modalEditScreen = ref(null)
	const modalChangeTemplate = ref(null)
	const modalSetBGM = ref(null)
	const modalMonitorBGM = ref(null)
	// SCREEN VAR
	const screenIP = ref("")
	const screenName = ref("")
	const screenLocation = ref("")
	const screenTemplate = ref("")
	const screenPlaylist = ref([])
	const loadPlaylist = ref(true)
	const selectedDate = ref([])
	//NOTIF MODAL VAR
	let modalHeader = ""
	let modalContent = ""
	const isOpen = ref(false)
	const closeNotif = () => {
		isOpen.value = false
		const router = useRouter()
		router.go()
	}
	const openNotif = (header, content) => {
		modalHeader = header
		modalContent = content
		isOpen.value = true
	}
	// YOUTUBE API VAR
	const searchQuery = ref("")
	const searchResults = ref([])
	const currentVideoId = ref("")
	let youtubePlayer
	const isDropdownOpen = ref([])
	const toggleDropDown = (idx) => {
		isDropdownOpen.value[idx] = !isDropdownOpen.value[idx]
	}
	const isDataExist = (pl_id) => {
		return screenPlaylist.value.some((playlist) => playlist.pl_id === pl_id)
	}
	const datePlaylist = (pl_id) => {
		const playlist = screenPlaylist.value.find((playlist) => playlist.pl_id === pl_id)
		if (playlist) {
			// Parse the date string in ddmmyy format to yyyy-mm-dd format
			const formattedDate = parseDate(playlist.date)
			return formattedDate
		}
		return null
	}
	const parseDate = (dateString) => {
		// Convert ddmmyy string to yyyy-mm-dd format
		const day = dateString.substring(0, 2)
		const month = dateString.substring(2, 4)
		const year = "20" + dateString.substring(4, 6) // Assuming years are in 2000s
		return `${year}-${month}-${day}`
	}
	const formatDate = (dateString) => {
		const dateObject = new Date(dateString)
		const day = String(dateObject.getDate()).padStart(2, "0")
		const month = String(dateObject.getMonth() + 1).padStart(2, "0") // January is 0!
		const year = String(dateObject.getFullYear()).substring(2)
		return `${day}${month}${year}`
	}
	// FUNCTION TO SHOW DETAIL LIST SCREEN
	const listClient = ref(await getCLient())
	const statusText = (sc_ip) => {
		return listClient.value.some((client) => client.socket_ip === sc_ip) ? "Online" : "Offline"
	}
	const statusClass = (sc_ip) => {
		return listClient.value.some((client) => client.socket_ip === sc_ip) ? "text-green-400" : "text-red-400"
	}
	const listMusic = ref(await getMusicClient())
	console.log(listMusic.value)
	const musicTitle = (sc_ip) => {
		const music = listMusic.value.find((music) => music.socket_ip === sc_ip)
		if (music) {
			return music.title
		}
		return "-"
	}
	const host = "http://localhost:3000"
	const socket = io(host, {
		path: "/api/socket.io",
	})
	onMounted(async () => {
		const tag = document.createElement("script")
		tag.src = "https://www.youtube.com/iframe_api"
		const firstScriptTag = document.getElementsByTagName("script")[0]
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

		// Wait for the API to be ready before creating the player
		window.onYouTubeIframeAPIReady = () => {
			createPlayer()
		}
		isDropdownOpen.value.push(false)

		socket.on("connect", () => {
			socket.emit("clientType", "server")
		})
		socket.on("refresh", () => {
			router.go()
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
		socket.on("resDataPlaylist", (response) => {
			screenPlaylist.value = response.data
			for (let i = 0; i < listPlaylist.value.length; i++) {
				selectedDate.value[listPlaylist.value[i].pl_id] = datePlaylist(listPlaylist.value[i].pl_id)
			}
			loadPlaylist.value = false
		})
		socket.on("resDataMusic", (response) => {
			console.log(response)
		})
	})
	const toggleSelectPlaylist = (pl_id, date) => {
		const playlist = {
			pl_id: pl_id,
			date: formatDate(date),
		}
		if (screenPlaylist.value.some((pl) => pl.pl_id === pl_id)) {
			screenPlaylist.value = screenPlaylist.value.filter((pl) => pl.pl_id !== pl_id)
		} else {
			screenPlaylist.value.push(playlist)
		}
	}

	// FUNCTION PASS TO SOCKET
	const uploadPlaylistFile = () => {
		alert(screenPlaylist.value)
	}
	const changeTemplate = () => {
		socket.emit("changeTemplate", {
			template: screenTemplate.value,
			ip: currentScreen.value.sc_ip,
		})
	}
	const changeBGM = () => {
		for (const [key, value] of Object.entries(selectedScreen.value)) {
			console.log(value.sc_ip, currentVideoId.value)
			socket.emit("changeBgm", {
				bgm: currentVideoId.value,
				ip: value.sc_ip,
			})
		}
	}
	// FUNCTION MODAL
	const toggleModal = (modal, screen) => {
		modal.classList.toggle("hidden")
		if (modalScreen.value.classList.contains("hidden")) {
			currentScreen.value = null
			screenName.value = ""
			screenLocation.value = ""
			screenIP.value = ""
		} else {
			currentScreen.value = screen
		}
	}
	const toggleModalEdit = (modal) => {
		modal.classList.toggle("hidden")
		if (!modalPlaylist.value.classList.contains("hidden")) {
			socket.emit("reqDataPlaylist", { ip: currentScreen.value.sc_ip })
			loadPlaylist.value = true
		}
		screenName.value = currentScreen.value.sc_name
		screenLocation.value = currentScreen.value.sc_location
		screenIP.value = currentScreen.value.sc_ip
	}
	// FUNCTION CRUD SCREEN
	const editScreen = async () => {
		const data = {
			sc_id: currentScreen.value.sc_id,
			sc_name: screenName.value,
			sc_location: screenLocation.value,
			sc_ip: screenIP.value,
		}
		updateScreen(data)
			.then((res) => {
				openNotif("Success", res)
			})
			.catch((err) => {
				openNotif("Error", err)
			})
	}
	const addNewScreen = async () => {
		const data = {
			sc_name: screenName.value,
			sc_location: screenLocation.value,
			sc_ip: screenIP.value,
		}
		console.log(data)
		createScreen(data)
			.then((res) => {
				openNotif("Success", "Berhasil Menambah Screen Baru")
			})
			.catch((err) => {
				openNotif("Error", err)
			})
	}
	// FUNCTION YOUTUBE API
	const createPlayer = () => {
		youtubePlayer = new YT.Player("player", {
			height: "315",
			width: "560",
			videoId: "", // Start with no video
			playerVars: {
				loop: 1,
			},
			events: {
				onReady: onPlayerReady,
				onStateChange: onPlayerStateChange,
			},
		})
	}
	const onPlayerReady = (event) => {
		// Do nothing initially
	}
	const onPlayerStateChange = (event) => {
		// Loop the video when it ends
		if (event.data === YT.PlayerState.ENDED) {
			youtubePlayer.playVideo()
		}
	}
	const searchVideos = async () => {
		const apiKey = "AIzaSyAgnyIHF_beLeYFv8XDCPz62vnCxm8TcPA"
		const query = searchQuery.value
		const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
			query
		)}&type=video&key=${apiKey}`

		try {
			const response = await fetch(searchUrl)
			const data = await response.json()
			searchResults.value = data.items
		} catch (error) {
			console.error("Error:", error)
		}
	}
	const selectVideo = (videoId) => {
		currentVideoId.value = videoId
		if (youtubePlayer) {
			youtubePlayer.loadVideoById(videoId)
			youtubePlayer.setPlaybackQuality("tiny")
			youtubePlayer.playVideo()
		}
	}
</script>
