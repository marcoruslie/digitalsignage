<template>
	<div class="bg-cyan-700 h-svh w-full p-2 flex space-x-3">
		<div class="flex flex-col h-full w-[20%] bg-white rounded-xl p-2 space-y-2">
			<Navbar />
		</div>
		<div class="h-full w-[80%] bg-white rounded-xl p-2 flex-col overflow-hidden">
			<div class="flex justify-between items-center">
				<div class="text-Primary font-bold text-2xl">Daftar Playlist Pengumuman</div>
				<div class="flex items-center">
					<div class="relative">
						<input v-model="playlistNameSearch" type="text" placeholder="Search..."
							class="block w-full py-2 pl-10 pr-4 leading-tight bg-white border border-gray-300 rounded focus:outline-none focus:bg-white focus:border-gray-500" />
						<div class="absolute inset-y-0 left-0 flex items-center pl-3">
							<svg class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M15 15l5 5M10 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
							</svg>
						</div>
					</div>
					<img src="/icon-add.png" alt="" @click="toggleModal(modalAddPlaylist)"
						class="w-[40px] cursor-pointer hover:bg-slate-300 hover:duration-300 rounded-lg" />
				</div>
			</div>
			<div class="border-b-2 border-Primary mt-1"></div>
			<div class="max-h-[95%] overflow-auto h-full flex-col p-1 space-y-1">
				<!-- List Playlist -->
				<div v-for="item in searchedPlaylist" :key="item.id"
					class="h-[100px] w-full rounded shadow-xl hover:bg-slate-50 flex items-center justify-between space-x-3 px-2">
					<div class="flex flex-col">
						<div class="font-bold text-lg">{{ item.pl_name }}</div>
						<div class="text-base mx-1">
							{{
								new Date(item.createdAt).toLocaleDateString("id-ID", {
									day: "2-digit",
									month: "long",
									year: "numeric",
								}) +
								" | " +
								new Date(item.createdAt).toLocaleTimeString("id-ID", {
									hour: "2-digit",
									minute: "2-digit",
									hour12: false,
									timeZone: "Asia/Jakarta",
								}) +
								" WIB"
							}}
						</div>
					</div>
					<div class="flex items-center space-x-3">
						<img src="/Monitor.png" alt="" @click="toggleModalPlaylist(item)"
							class="w-14 cursor-pointer hover:shadow-2xl hover:bg-Primary hover:duration-300 rounded" />
						<img src="/icon-edit.png" aria-label="Edit Playlist" @click="toggleModalShowPlaylist(item)"
							class="cursor-pointer rounded hover:shadow-inner w-11 bg-transparent" />
						<img src="/icon-delete.png" @click="deletePlaylistData(item.pl_id)"
							class="cursor-pointer rounded hover:shadow-2xl w-14 hover:bg-red-300 hover:duration-1000 bg-transparent" />
					</div>
				</div>
			</div>
		</div>
	</div>
	<div v-if="modalPlaylist"
		class="overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
		<div class="flex flex-col p-4 w-full max-w-6xl h-5/6 relative bg-white rounded-lg shadow sm:p-5">
			<div class="flex gap-1 justify-between items-center pb-4 mb-4 rounded-t border-b">
				<h3 class="text-lg font-semibold text-OnPrimaryContainer">Daftar List Pengumuman</h3>
				<svg @click="toggleModalShowPlaylist(null)" xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 hover:cursor-pointer hover:bg-Primary hover:duration-500 hover:rounded-lg"
					fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</div>
			<!-- @submit.prevent="updatePlaylistData" -->
			<div class="flex flex-col flex-grow space-y-2 overflow-hidden">

				<div class="flex-grow overflow-auto h-full">
					<div v-for="(item, index) in searchedListAnnouncement.filter((item) => {
						return selectedItems.includes(item)
					})">
						<div
							class="h-[150px] w-full rounded shadow-xl hover:bg-slate-50 flex items-center justify-between space-x-3 cursor-pointer">
							<div class="flex items-center space-x-3" @click="toggleDropDown(index)">
								<div class="flex-col">
									<div class="font-extrabold text-lg m-1">{{ item.la_title }}</div>
									<div class="text-base mx-1">Diposting : {{ item.la_us_username }}</div>
									<div class="text-base mx-1 font-bold">Kategori : {{ item.category.cat_name }}</div>
									<div class="text-base mx-1">
										{{
											new Date(item.createdAt).toLocaleDateString("id-ID", {
												day: "2-digit",
												month: "long",
												year: "numeric",
											}) +
											" | " +
											new Date(item.createdAt).toLocaleTimeString("id-ID", {
												hour: "2-digit",
												minute: "2-digit",
												hour12: false,
												timeZone: "Asia/Jakarta",
											}) +
											" WIB"
										}}
									</div>
									<div class="text-base mx-1">
										Durasi:
										{{
											formatDuration(
												item.category.cat_duration * item.announcement_in_list.length
											)
										}}
									</div>
								</div>
							</div>
							<div class="flex items-center space-x-3">
								<!-- <div @click="toggleSelection(item)"
									class="relative w-14 h-8 rounded-full p-1 border-OnPrimaryContainer border-2 flex items-center bg-slate-200 cursor-pointer">
									<input type="checkbox" v-on:click="toggleSelection(item)"
										:checked="isSelected(item)"
										class="absolute w-6 h-6 rounded-full appearance-none bg-white border-none checked:right-0 checked:left-6 transition-transform duration-1000 checked:bg-green-400"
										disabled />
								</div> -->
							</div>
						</div>
						<div class="bg-white shadow-lg rounded w-[100%] duration-1000 overflow-hidden transition-all"
							:class="{ 'max-h-screen': isDropdownOpen[index], 'max-h-0': !isDropdownOpen[index] }">
							<div v-for="(ann, idxAnn) in item.announcement_in_list" :key="idxAnn"
								class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between">
								<div>{{ idxAnn + 1 }}. {{ ann.announcement.an_title }}
								</div>
								<div>
									<div v-if="ann.announcement.an_type == 'image'">
										<!-- Display image if the URL is an image -->
										<img @click="toggleModalMedia(ann.announcement.an_url, 'image')"
											:src="ann.announcement.an_url" alt="Image" class="w-32 h-32 object-cover">
									</div>
									<div v-else-if="ann.announcement.an_type == 'video'">
										<!-- Display video if the URL is a video -->
										<video @click="toggleModalMedia(ann.announcement.an_url, 'video')"
											:src="ann.announcement.an_url" controls
											class="w-96 h-44 object-cover"></video>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- <button type="submit"
					class="w-full flex items-center justify-center bg-Primary text-OnPrimary hover:duration-500 hover:bg-PrimaryContainer hover:text-OnPrimaryContainer rounded cursor-pointer py-2">
					Simpan
				</button> -->
			</div>
		</div>
	</div>
	<div ref="modalAddPlaylist"
		class="hidden overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">

		<form @submit.prevent="createNewPlaylist"
			class="p-4 w-3/4 max-w-6xl h-[calc(100vh-20px)] relative bg-white rounded-lg shadow sm:p-5 flex flex-col space-y-2">
			<div class="flex justify-between items-center pb-4 rounded-t border-b">
				<h3 class="text-lg font-semibold text-OnPrimaryContainer">Tambah List Pengumuman</h3>
				<svg @click="closeModal(modalAddPlaylist)" xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 hover:cursor-pointer hover:bg-Primary hover:duration-500 hover:rounded-lg"
					fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</div>
			<input v-model="searchList" type="text" class="rounded border-2 py-2 px-2" placeholder="Cari..." />
			<div class="flex-col flex-grow space-y-2 overflow-auto">
				<div class="flex flex-col space-y-2 text-OnPrimaryContainer">
					<div class="flex flex-col">
						<label for="listName">Nama Playlist</label>
						<input v-model="playlistName" type="text" required
							class="border-2 border-gray-500 hover:border-Primary rounded-md hover:duration-300 px-2 py-2" />
					</div>
				</div>
				<div class="max-h-full">
					<div v-for="(item, index) in searchedListAnnouncement">
						<div
							class="h-[150px] w-full rounded shadow-xl hover:bg-slate-50 flex items-center justify-between space-x-3 cursor-pointer">
							<div class="flex items-center space-x-3" @click="toggleDropDown(index)">
								<div class="flex-col">
									<div class="font-bold text-lg m-1">{{ item.la_title }}</div>
									<div class="text-base mx-1">Diposting : {{ item.la_us_username }}</div>
									<div class="text-base mx-1">Kategori : {{ item.category.cat_name }}</div>
									<div class="text-base mx-1">
										{{
											new Date(item.createdAt).toLocaleDateString("id-ID", {
												day: "2-digit",
												month: "long",
												year: "numeric",
											}) +
											" | " +
											new Date(item.createdAt).toLocaleTimeString("id-ID", {
												hour: "2-digit",
												minute: "2-digit",
												hour12: false,
												timeZone: "Asia/Jakarta",
											}) +
											" WIB"
										}}
									</div>
									<div class="text-base mx-1">Durasi : {{ formatDuration(item.category.cat_duration *
										item.announcement_in_list.length) }}</div>
								</div>
							</div>
							<div class="flex items-center space-x-3">
								<div @click="toggleSelection(item)"
									class="relative w-14 h-8 rounded-full p-1 border-OnPrimaryContainer border-2 flex items-center bg-slate-200 cursor-pointer">
									<input type="checkbox" v-on:click="toggleSelection(item)"
										:checked="isSelected(item)"
										class="absolute w-6 h-6 rounded-full appearance-none bg-white border-none checked:right-0 checked:left-6 transition-transform duration-1000 checked:bg-green-400"
										disabled />
								</div>
							</div>
						</div>
						<div class="bg-white shadow-lg rounded w-[100%] duration-1000 overflow-hidden transition-all"
							:class="{ 'max-h-screen': isDropdownOpen[index], 'max-h-0': !isDropdownOpen[index] }">
							<ul class="py-1">
								<li v-for="(ann, idxAnn) in item.announcement_in_list"
									class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between">
									<div>{{ idxAnn + 1 }}. {{ ann.announcement.an_title }}</div>
									<div>
										<div>Tipe : {{ ann.announcement.an_type }}</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<button type="submit"
				class="rounded bg-Primary text-center cursor-pointer px-6 py-2 text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer hover:duration-300">
				Tambahkan
			</button>
		</form>
	</div>
	<!-- MODAL ADD PLAYLIST TO SCREEN -->
	<div v-if="modalAddPlaylistToScreen"
		class="overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
		<form @submit.prevent="sendFileToClient"
			class="p-4 w-3/4 max-w-6xl h-[calc(100vh-20px)] relative bg-white rounded-lg shadow sm:p-5 flex flex-col space-y-2">
			<div class="flex justify-between items-center pb-4 rounded-t border-b">
				<h3 class="text-lg font-semibold text-OnPrimaryContainer">Tambah Playlist Ke Screen</h3>
				<svg @click="toggleModalPlaylist(null, modalAddPlaylistToScreen)" xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 hover:cursor-pointer hover:bg-Primary hover:duration-500 hover:rounded-lg"
					fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</div>
			<div class="flex-col flex-grow space-y-2 overflow-auto">
				<div class="max-h-full space-y-3">
					<div v-for="screen in listScreen.filter((screen) => statusText(screen.sc_ip) == 'Online')"
						class="h-fit w-full rounded flex justify-between items-center bg-OnPrimaryContainer p-2" :class="{
							'bg-UnselectedBg text-UnselectedText': !isScreenSelected(screen),
							'bg-SelectedBg text-SelectedText': isScreenSelected(screen),
						}">
						<div @click="toggleScreenSelection(screen)"
							class="bg-Primary h-[210px] w-[210px] rounded flex flex-col items-center justify-center cursor-pointer hover:shadow-2xl text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer hover:duration-300"
							:class="{
								'bg-UnselectedBg text-UnselectedText': !isScreenSelected(screen),
								'bg-Primary text-OnPrimary': isScreenSelected(screen),
							}">
							<img src="\Monitor.png" alt="" />
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
						<div class="flex flex-col space-y-1">
							<div class="flex space-x-1 justify-center items-center">
								<input v-model="playDate[screen.sc_ip]" :disabled="!isScreenSelected(screen)"
									class="rounded border-2 border-gray-500 hover:border-Primary px-2 py-2"
									:min="new Date().toISOString().split('T')[0]" type="date" name="" id="" required />

								<div @click="toggleModalEdit(screen)"
									class="rounded bg-Primary text-center cursor-pointer px-4 py-2 text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer hover:duration-300"
									:class="{
										'bg-UnselectedBg text-UnselectedText hidden': !isScreenSelected(screen),
										'bg-Primary text-OnPrimary ': isScreenSelected(screen),
									}">
									Setting Template
								</div>
								<div @click="toggleModalPreview(screen)"
									class="rounded shadow-lg px-1 py-2 cursor-pointer hover:bg-PrimaryContainer hover:text-OnPrimaryContainer hover:duration-300"
									:class="{
										'bg-UnselectedBg text-UnselectedText hidden': !isScreenSelected(screen),
										'bg-Primary text-OnPrimary ': isScreenSelected(screen),
									}">
									Current Template
								</div>
							</div>
							<div class="bg-Primary text-OnPrimary px-2 py-1 rounded" :class="{
								'bg-UnselectedBg text-UnselectedText hidden': !isScreenSelected(screen),
								'bg-Primary text-OnPrimary ': isScreenSelected(screen),
							}">
								<div class="mb-2">Template: {{ playTemplate[screen.sc_ip].toUpperCase() }}</div>
								<table class="table-fixed">
									<thead>
										<tr>
											<th></th>
											<th v-for="category in uniqueCategory" class="border">{{ category.cat_name
												}}</th>
										</tr>
									</thead>
									<tbody>
										<tr v-if="template1Content.includes(playTemplate[screen.sc_ip])">
											<td>CONTENT 1</td>
											<td v-for="category in uniqueCategory" class="text-center">
												<input @change="setPlaylistData(playContent[screen.sc_ip], screen)"
													type="checkbox" v-model="playContent[screen.sc_ip][category.cat_id]"
													value="A" />
											</td>
										</tr>
										<tr v-if="template2Content.includes(playTemplate[screen.sc_ip])">
											<td>CONTENT 2</td>
											<td v-for="category in uniqueCategory" class="text-center">
												<input @change="setPlaylistData(playContent[screen.sc_ip], screen)"
													type="checkbox" v-model="playContent[screen.sc_ip][category.cat_id]"
													value="B" />
											</td>
										</tr>
										<tr v-if="template3Content.includes(playTemplate[screen.sc_ip])">
											<td>CONTENT 3</td>
											<td v-for="category in uniqueCategory" class="text-center">
												<input @change="setPlaylistData(playContent[screen.sc_ip], screen)"
													type="checkbox" v-model="playContent[screen.sc_ip][category.cat_id]"
													value="C" />
											</td>
										</tr>
									</tbody>

								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<button type="submit"
				class="rounded bg-Primary text-center cursor-pointer px-6 py-2 text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer hover:duration-300">
				Tambahkan
			</button>
		</form>
	</div>
	<!-- MODAL PILIH TEMPLATE -->
	<div v-if="modalChangeTemplate"
		class="overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
		<div class="p-4 w-full max-w-5xl relative bg-white rounded-lg shadow sm:p-5 flex flex-col space-y-2">
			<div class="flex gap-1 justify-between items-center pb-4 rounded-t border-b">
				<h3 class="text-lg font-semibold text-OnPrimaryContainer">Pilih Template untuk {{
					currentScreen.sc_name }}</h3>
				<svg @click="toggleModalEdit()" xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 hover:cursor-pointer hover:bg-Primary hover:duration-500 hover:rounded-lg"
					fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</div>
			<div class="flex flex-col space-y-2 max-h-[70vh] overflow-auto">
				<!-- TEMPLATE 1 -->
				<div class="flex space-x-2 justify-between items-center">
					<div class="flex-col w-full">
						<div class="text-lg font-bold text-center">TEMPLATE 1</div>
						<Template1 />
					</div>
					<input v-model="screenTemplate" class="w-5 h-5" type="radio" name="template" id="template"
						value="template1" />
				</div>
				<!-- TEMPLATE 2 -->
				<div class="flex space-x-2 justify-between items-center">
					<div class="flex-col w-full">
						<div class="text-lg font-bold text-center">TEMPLATE 2</div>
						<Template2 />
					</div>
					<input v-model="screenTemplate" class="w-5 h-5" type="radio" name="template" id="template"
						value="template2" />
				</div>
				<!-- TEMPLATE 3 -->
				<div class="flex space-x-2 justify-between items-center">
					<div class="flex-col w-full">
						<div class="text-lg font-bold text-center">TEMPLATE 3</div>
						<Template3 />
					</div>
					<input v-model="screenTemplate" class="w-5 h-5" type="radio" name="template" id="template"
						value="template3" />
				</div>
				<!-- TEMPLATE 4 -->
				<div class="flex space-x-2 justify-between items-center">
					<div class="flex-col w-full">
						<div class="text-lg font-bold text-center">TEMPLATE 4</div>
						<Template4 />
					</div>
					<input v-model="screenTemplate" class="w-5 h-5" type="radio" name="template" id="template"
						value="template4" />
				</div>
				<!-- TEMPLATE 5 -->
				<div class="flex space-x-2 justify-between items-center">
					<div class="flex-col w-full">
						<div class="text-lg font-bold text-center">TEMPLATE 5</div>
						<Template5 />
					</div>
					<input v-model="screenTemplate" class="w-5 h-5" type="radio" name="template" id="template"
						value="template5" />
				</div>
				<!-- TEMPLATE 6 -->
				<div class="flex space-x-2 justify-between items-center">
					<div class="flex-col w-full">
						<div class="text-lg font-bold text-center">TEMPLATE 6</div>
						<Template6 />
					</div>
					<input v-model="screenTemplate" class="w-5 h-5" type="radio" name="template" id="template"
						value="template6" />
				</div>
				<!-- TEMPLATE 7 -->
				<div class="flex space-x-2 justify-between items-center">
					<div class="flex-col w-full">
						<div class="text-lg font-bold text-center">TEMPLATE 7</div>
						<Template7 />
					</div>
					<input v-model="screenTemplate" class="w-5 h-5" type="radio" name="template" id="template"
						value="template7" />
				</div>
				<!-- TEMPLATE 8 -->
				<div class="flex space-x-2 justify-between items-center">
					<div class="flex-col w-full">
						<div class="text-lg font-bold text-center">TEMPLATE 8</div>
						<Template8 />
					</div>
					<input v-model="screenTemplate" class="w-5 h-5" type="radio" name="template" id="template"
						value="template8" />
				</div>
			</div>

			<button @click="changeTemplate"
				class="w-full bg-Primary text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer hover:duration-300 rounded py-2">
				Pilih Template
			</button>
		</div>
	</div>
	<!-- MODAL PREVIEW -->
	<div v-if="modalPreview"
		class="overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
		<div class="p-4 w-full max-w-5xl relative bg-white rounded-lg shadow sm:p-5 flex flex-col space-y-2">
			<div class="flex gap-1 justify-between items-center pb-4 rounded-t border-b">
				<h3 class="text-lg font-semibold text-OnPrimaryContainer">TEMPLATE</h3>
				<svg @click="toggleModalPreview()" xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 hover:cursor-pointer hover:bg-Primary hover:duration-500 hover:rounded-lg"
					fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</div>
			<div class="flex-col flex space-y-2 max-h-[70vh] h-[70vh] overflow-auto items-center w-full">
				<div v-if="playTemplate[currentScreen.sc_ip] == 'template1'" class="w-full h-full">
					<Template1 />
				</div>
				<div v-if="playTemplate[currentScreen.sc_ip] == 'template2'" class="w-full h-full">
					<Template2 />
				</div>
				<div v-if="playTemplate[currentScreen.sc_ip] == 'template3'" class="w-full h-full">
					<Template3 />
				</div>
				<div v-if="playTemplate[currentScreen.sc_ip] == 'template4'" class="w-full h-full">
					<Template4 />
				</div>
				<div v-if="playTemplate[currentScreen.sc_ip] == 'template5'" class="w-full h-full">
					<Template5 />
				</div>
				<div v-if="playTemplate[currentScreen.sc_ip] == 'template6'" class="w-full h-full">
					<Template6 />
				</div>
				<div v-if="playTemplate[currentScreen.sc_ip] == 'template7'" class="w-full h-full">
					<Template7 />
				</div>
				<div v-if="playTemplate[currentScreen.sc_ip] == 'template8'" class="w-full h-full">
					<Template8 />
				</div>

				<!-- CATEGORY:{{ uniqueCategory }}
				<br>
				CONTENT:{{ playContent[currentScreen.sc_ip] }}
				<br>
				<br>
				<div class="w-full">Playlist: {{ jsonDataContent[currentScreen.sc_ip].playlist_id }}</div>
				<div v-for="item in jsonDataContent[currentScreen.sc_ip].data">
					<div>Judul: {{ item.judul }}</div>
					<div>Screen: {{ item.screen }}</div>
					<div>{{ item.dataContent }}</div>
					<div>----------------------------</div>
				</div> -->
			</div>
		</div>
	</div>
	<!-- Modal for maximizing image or video -->
	<div v-if="modalMedia" @click.self="toggleModalMedia"
		class="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
		<div class="relative">
			<!-- Close button -->
			<button @click="toggleModalMedia" class="absolute top-0 right-0 text-white text-2xl">&times;</button>

			<!-- Display the maximized image or video -->
			<div v-if="modalType === 'image'">
				<img :src="modalContent" alt="Maximized Image" class="max-w-full max-h-screen">
			</div>
			<div v-else-if="modalType === 'video'">
				<video :src="modalContent" controls class="max-w-full max-h-screen"></video>
			</div>
		</div>
	</div>
	<NotificationModal :modal-header="modalHeader" :modal-content="modalContent" :is-open="isOpen"
		:button-function="closeNotif" />
	<Loading :loading="loading" message="Loading..."></Loading>
</template>

<script setup>
import { io } from "socket.io-client"
const loading = ref(false)
const { getPlaylist, createPlaylist, deletePlaylist, updatePlaylist } = usePlaylist()
const { getListAnnouncement } = useAnnouncement()
const { getUserData } = useUser()
const { getScreen } = useScreen()
const { getCLient } = useSocket()
const { getFileData } = useLocalDir()
const template1Content = ["template1", "template2", "template3", "template4", "template5", "template6", "template7", "template8"]
const template2Content = ["template3", , "template4", "template7", "template8"]
const template3Content = ["template3", "template7"]
const listScreen = ref(await getScreen())
const listPlaylist = ref(await getPlaylist())
const listClient = ref(await getCLient())
const currentUser = ref(null)
const currentScreen = ref(null)
const host = "http://192.168.9.203"
const socket = io(host, {
	path: "/api/socket.io",
})
onBeforeMount(async () => {
	const router = useRouter()
	const token = sessionStorage.getItem("currentUser")
	currentUser.value = await getUserData(token)
	if (currentUser.value == null) {
		router.push("/")
	}
	else if (currentUser.value.role.role_name !== "Admin") {
		router.push("/Biro/ListAnnouncementPage")
	}
})
onMounted(async () => {
	const router = useRouter()
	socket.on("connect", () => {
		socket.emit("clientType", "server")
	})
	socket.on("userConnect", async (response) => {
		listClient.value = await getCLient()
	})
	socket.on("userDisconnect", async (response) => {
		listClient.value = await getCLient()
	})
})
const statusText = (sc_ip) => {
	return listClient.value.some((client) => client.socket_ip === sc_ip) ? "Online" : "Offline"
}
const statusClass = (sc_ip) => {
	return listClient.value.some((client) => client.socket_ip === sc_ip) ? "text-green-400" : "text-red-400"
}
const listListAnnouncement = ref(await getListAnnouncement())
// Declare playlist variable
const playlistName = ref("")
const playlistNameSearch = ref("")
const playlist = ref([])
const modalPlaylist = ref(false)
const modalAddPlaylist = ref(null)
const modalAddPlaylistToScreen = ref(false)
const modalChangeTemplate = ref(false)
const modalPreview = ref(false)
const modalMedia = ref(false)
const screenTemplate = ref("false")
// Declare search variable
const searchList = ref("")
const isDropdownOpen = ref([])
const selectedItems = ref([])
const selectedScreens = ref([])
const modalHeader = ref("")
const modalContent = ref("")
const isOpen = ref(false)
// Declare process upload data to client var
const loadingProgress = ref(0)
const playDate = ref({})
const playTemplate = ref({})
const playContent = ref({})
const uniqueCategory = ref(null)
const jsonDataContent = ref({})
const currentItem1 = ref({})
const currentItem2 = ref({})
const currentItem3 = ref({})
const mediaUrl = ref('')
const mediaType = ref('')
const closeNotif = () => {
	isOpen.value = false
	if (modalHeader.value == "Success") {
		const router = useRouter()
		router.go()
	}
}
const openNotif = (header, content) => {
	modalHeader.value = header
	modalContent.value = content
	isOpen.value = true
}
const searchedListAnnouncement = computed(() => {
	return listListAnnouncement.value.filter((item) => {
		return item.la_title.toLowerCase().includes(searchList.value.toLowerCase())
	})
})
const searchedPlaylist = computed(() => {
	return listPlaylist.value
		.filter((item) => {
			return item.pl_name.toLowerCase().includes(playlistNameSearch.value.toLowerCase())
		})
		.sort((a, b) => {
			return b.playlist_in_screen.length - a.playlist_in_screen.length
		})
})
// FUNCTION MODAL
const toggleModal = (modal) => {
	modal.classList.toggle("hidden")
	isDropdownOpen.value.fill(false)
}
const toggleModalEdit = (screen = null) => {
	modalChangeTemplate.value = !modalChangeTemplate.value
	currentScreen.value = screen
}
const toggleModalPreview = (screen = null) => {
	modalPreview.value = !modalPreview.value
	currentScreen.value = screen
	if (screen != null) {
		currentItem1.value = jsonDataContent.value[screen.sc_ip]
	}
}
const toggleModalShowPlaylist = (data) => {
	modalPlaylist.value = !modalPlaylist.value
	if (data != null) {
		playlist.value = data
		const listInPlaylistData = data.list_in_playlist
		const dataMaped = listInPlaylistData.flatMap((item) => item.listannouncement)
		const laIds = dataMaped.map((item) => item.la_id) // Extract la_id values
		const dataFiltered = listListAnnouncement.value.filter((item) => laIds.includes(item.la_id))
		selectedItems.value = dataFiltered
	}
}
const toggleModalPlaylist = (data) => {

	modalAddPlaylistToScreen.value = !modalAddPlaylistToScreen.value
	if (data != null) {
		playlist.value = data
		const listInPlaylistData = data.list_in_playlist
		const dataMaped = listInPlaylistData.flatMap((item) => item.listannouncement)
		const laIds = dataMaped.map((item) => item.la_id) // Extract la_id values
		const dataFiltered = listListAnnouncement.value.filter((item) => laIds.includes(item.la_id))
		selectedItems.value = dataFiltered
		uniqueCategory.value = Array.from(
			new Map(
				selectedItems.value.map(item => [item.category.cat_id, {
					cat_id: item.category.cat_id,
					cat_name: item.category.cat_name
				}])
			).values()
		);


		listScreen.value.filter((screen) => statusText(screen.sc_ip) == 'Online').forEach((screen) => {
			playDate.value[screen.sc_ip] = new Date().toISOString().split('T')[0]
			playTemplate.value[screen.sc_ip] = "template1"
			playContent.value[screen.sc_ip] = {}
			uniqueCategory.value.forEach((category) => {
				playContent.value[screen.sc_ip][category.cat_id] = ['A']
			})
			setPlaylistData("", screen)
		})
	} else {
		selectedItems.value = []
	}
}
const closeModal = (modal) => {
	toggleModal(modal)
	clearSelected()
}
const toggleModalMedia = (url, type) => {
	if (url != null && type != null) {
		mediaUrl.value = url
		mediaType.value = type
		modalMedia.value = true
	}
	else {
		modalMedia.value = false
	}
}
// Function dropdown list announcement
const toggleDropDown = (idx) => {
	isDropdownOpen.value.forEach((item, index) => {
		if (index !== idx) {
			isDropdownOpen.value[index] = false
		}
	})
	isDropdownOpen.value[idx] = !isDropdownOpen.value[idx]
}
// Function selection list announcement
const toggleSelection = (data) => {
	const index = selectedItems.value.indexOf(data)
	if (index !== -1) {
		selectedItems.value.splice(index, 1)
	} else {
		selectedItems.value.push(data)
	}
}
const isSelected = (data) => {
	return selectedItems.value.includes(data)
}
const clearSelected = () => {
	selectedItems.value = []
}
const createNewPlaylist = async () => {
	const data = {
		pl_name: playlistName.value,
		list_announcement_id: selectedItems.value.map((item) => item.la_id),
	}
	loading.value = true
	await createPlaylist(data).then((res) => {
		loading.value = false
		if (res.statusCode == 200) {
			openNotif("Success", res.body.message)
		} else {
			openNotif("Error", res.body)
		}
	})
	loading.value = false
}
const deletePlaylistData = async (data) => {
	loading.value = true
	await deletePlaylist(data).then((res) => {
		loading.value = false
		if (res.statusCode == 200) {
			openNotif("Success", res.body.message)
		} else {
			openNotif("Error", res.body)
		}
	})
}
const updatePlaylistData = async () => {
	const data = {
		listannouncement: selectedItems.value.map((item) => item.la_id),
		pl_id: playlist.value.pl_id,
	}
	loading.value = true
	await updatePlaylist(data).then((res) => {
		loading.value = false
		if (res.statusCode == 200) {
			openNotif("Success", res.body.message)
		} else {
			console.log(res.body.message)
			openNotif("Error", res.body.message)
		}
	})
	loading.value = false
}
// FUNCTION SUCCESS FROM RASPBERRY
socket.on("notif", (data) => {

	loading.value = false
	console.log(data)
	openNotif("Success", data)
})
// FUNCTION TO SELECT SCREEN
function toggleScreenSelection(screen) {
	if (isScreenSelected(screen)) {
		selectedScreens.value = selectedScreens.value.filter((s) => s.sc_id !== screen.sc_id)
	} else {
		selectedScreens.value.push(screen)
	}
}
function isScreenSelected(screen) {
	return selectedScreens.value.some((s) => s.sc_id === screen.sc_id)
}
function setPlaylistData(contentPosition, screen) {
	const data = []

	selectedItems.value.forEach((item) => {
		const dataContent = []
		let position = ""
		item.announcement_in_list.forEach((list, index) => {
			dataContent.push({
				index,
				url: list.announcement.an_url.replace("/_nuxt", ""),
				type: list.announcement.an_type,
				title: list.announcement.an_title,
			})
		})
		if (contentPosition == "") {
			position = ["A"]
		}
		else {
			position = contentPosition[item.category.cat_id]
		}
		const temp = {
			judul: item.la_title,
			duration: item.category.cat_duration,
			screen: position,
			dataContent: dataContent,
		}
		data.push(temp)
	})
	jsonDataContent.value[screen.sc_ip] = {
		playlist_id: playlist.value.pl_id,
		data: data,
	}
}
// FUNCTION TO SEND FILE TO CLIENT
function sendFileToClient() {
	if (selectedScreens.value.length == 0) {
		openNotif("Error", "Screen Belum Dipilih")
	} else {
		const content = {
			screen: selectedScreens.value.map((item) => {
				return {
					ip: item.sc_ip,
					date: playDate.value[item.sc_ip],
					jsonData: jsonDataContent.value[item.sc_ip],
					template: playTemplate.value[item.sc_ip]
				}
			}),
			selectedItems: selectedItems.value,
		}

		console.log(content)
		loading.value = true
		socket.emit("sendFile", content)
	}
}
// FORMAT DURATION FUNCTION
function formatDuration(durationInSeconds) {
	const minutes = Math.floor(durationInSeconds / 60)
	const seconds = durationInSeconds % 60
	return minutes > 0 ? `${minutes} Menit ${seconds} Detik` : `${seconds} Detik`
}
// FUnciton to change template
function changeTemplate() {
	if (screenTemplate.value == "false") {
		openNotif("Error", "Template Belum Dipilih")
	} else {
		playTemplate.value[currentScreen.value.sc_ip] = screenTemplate.value
		// template1Content.includes(screenTemplate.value) ? playContent.value[currentScreen.value.sc_ip] = { A: {} } : ""
		// template2Content.includes(screenTemplate.value) ? playContent.value[currentScreen.value.sc_ip] = { A: {}, B: {} } : ""
		// template3Content.includes(screenTemplate.value) ? playContent.value[currentScreen.value.sc_ip] = { A: {}, B: {}, C: {} } : ""
		toggleModalEdit()
	}
}

const currentPage = ref(0);
const totalPages = ref(0)
const prevPage = () => {
	if (currentPage.value > 0) {
		currentPage.value--;
	}
};

const nextPage = () => {
	if (currentPage.value < totalPages.value - 1) {
		currentPage.value++;
	}
};

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