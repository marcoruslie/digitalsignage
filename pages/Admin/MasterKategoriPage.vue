<template>
	<div class="bg-cyan-700 h-svh w-full p-2 flex space-x-3">
		<div class="flex flex-col h-full w-[20%] bg-white rounded-xl p-2 space-y-2">
			<Navbar />
		</div>
		<div class="h-full w-[80%] bg-white rounded-xl p-2 flex flex-col">
			<div class="flex justify-between items-center">
				<div class="text-Primary font-bold text-2xl">Daftar Kategori</div>
				<div class="flex items-center">
					<img src="/public/icon-add.png" alt="" @click="toggleModal(modalAddKategori)"
						class="w-[40px] cursor-pointer hover:bg-slate-300 hover:duration-300 rounded-lg" />
				</div>
			</div>
			<div class="border-b-2 border-Primary mt-1"></div>
			<div class="flex">
				<div class="w-2/5 font-semibold border-b border-gray-300 py-2 px-4">Nama Kategori</div>
				<div class="w-2/5 font-semibold border-b border-gray-300 py-2 px-4">Hak Akses</div>
				<div class="w-1/5 font-semibold border-b border-gray-300 py-2 px-4">Durasi Per Konten</div>
				<div class="w-1/5 font-semibold border-b border-gray-300 py-2 px-4">Konten Per List</div>
				<div class="w-1/5 font-semibold border-b border-gray-300 py-2 px-4">Jumlah List Konten</div>
				<div class="w-1/5 font-semibold border-b border-gray-300 py-2 px-4">-</div>
			</div>
			<div class="flex flex-col flex-grow overflow-auto">
				<!-- Sample row -->
				<div class="flex hover:bg-slate-200 hover:duration-300 hover:cursor-pointer"
					v-for="data in listCategory">
					<div class="w-2/5 border-b border-gray-300 py-2 px-4">{{ data.cat_name }}</div>
					<div class="w-2/5 border-b border-gray-300 py-2 px-4 flex-col">
						<div v-if="data.categoryuser.length > 0" v-for="(userData, index) in data.categoryuser">
							{{ index + 1 }}.
							{{ userData.role.role_name }}
						</div>
						<div v-else="data.categoryuser.length == 0">(NONE)</div>
					</div>
					<div class="w-1/5 border-b border-gray-300 py-2 px-4 flex-col">{{ data.cat_duration }} Detik</div>
					<div class="w-1/5 border-b border-gray-300 py-2 px-4 flex-col">{{ data.cat_qty }} Konten</div>
					<div class="w-1/5 border-b border-gray-300 py-2 px-4">{{ data.listannouncement.length }} List</div>
					<div class="w-1/5 border-b border-gray-300 py-2 px-4 flex items-center">
						<img src="/public/icon-edit.png" alt="" @click="toggleModalEdit(modalEditKategori, data)"
							class="w-[60px] h-[60px] p-[10px] cursor-pointer hover:bg-slate-300 hover:duration-300 rounded-lg" />
						<div
							class="relative w-14 h-8 rounded-full p-1 border-OnPrimaryContainer border-2 flex items-center bg-slate-200">
							<input type="checkbox" @click="deleteCategory(data.cat_id)"
								:checked="data.deletedAt == null"
								class="absolute w-6 h-6 rounded-full appearance-none cursor-pointer bg-white border-none checked:right-0 checked:left-6 transition-transform duration-1000 checked:bg-green-400" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- MODAL TAMBAH KATEGORI -->
	<div v-if="modalAddKategori"
		class="overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
		<div class="p-4 w-full max-w-2xl relative bg-white rounded-lg shadow sm:p-5">
			<div class="flex gap-1 justify-between items-center pb-4 mb-4 rounded-t border-b">
				<h3 class="text-lg font-semibold text-OnPrimaryContainer">Tambah Kategori</h3>
				<svg @click="toggleModal(modalAddKategori)" xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 hover:cursor-pointer hover:bg-Primary hover:duration-500 hover:rounded-lg"
					fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</div>
			<div class="flex flex-col space-y-2">
				<form @submit.prevent="addNewKategori">
					<div class="flex flex-col space-y-2 text-OnPrimaryContainer">
						<div class="flex flex-col">
							<label for="categoryName">Nama Kategori</label>
							<input type="text" v-model="categoryName"
								class="border-2 px-2 border-OnPrimaryContainer hover:border-Primary rounded-md hover:duration-300 h-10"
								required />
						</div>
						<div class="flex flex-col">
							<label for="categoryQty">Jumlah Pengumuman (Dalam 1 List Pengumuman)</label>
							<input type="text" v-model="categoryQty"
								class="border-2 px-2 border-OnPrimaryContainer hover:border-Primary rounded-md hover:duration-300 h-10"
								required />
						</div>
						<div class="flex flex-col">
							<label for="categoryDuration">Durasi Pengumuman</label>
							<input type="text" v-model="categoryDuration"
								class="border-2 px-2 border-OnPrimaryContainer hover:border-Primary rounded-md hover:duration-300 h-10"
								placeholder="example: 192.168.0.33" required />
						</div>
						<div class="flex justify-center">
							<button type="submit"
								class="bg-Primary text-OnPrimary rounded-md px-4 py-2 hover:text-OnPrimaryContainer hover:bg-PrimaryContainer w-full duration-300">
								Tambah
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	<!-- MODAL EDIT KATEGORI -->
	<div v-if="modalEditKategori"
		class="overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
		<div class="p-4 w-full max-w-2xl relative bg-white rounded-lg shadow sm:p-5">
			<div class="flex gap-1 justify-between items-center pb-4 mb-4 rounded-t border-b">
				<h3 class="text-lg font-semibold text-OnPrimaryContainer">Setting Kategori</h3>
				<svg @click="toggleModalEdit(modalEditKategori, null)" xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 hover:cursor-pointer hover:bg-Primary hover:duration-500 hover:rounded-lg"
					fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</div>
			<div class="flex flex-col space-y-2">
				<form @submit.prevent="editKategori">
					<div class="flex flex-col space-y-2 text-OnPrimaryContainer">
						<div class="flex flex-col">
							<label for="categoryName">Nama Kategori</label>
							<input type="text" v-model="categoryName"
								class="border-2 px-2 border-OnPrimaryContainer hover:border-Primary rounded-md hover:duration-300 h-10"
								required />
						</div>
						<div class="flex flex-col">
							<label for="categoryQty">Jumlah Pengumuman (Dalam 1 List Pengumuman)</label>
							<input type="text" v-model="categoryQty"
								class="border-2 px-2 border-OnPrimaryContainer hover:border-Primary rounded-md hover:duration-300 h-10"
								required />
						</div>
						<div class="flex flex-col">
							<label for="categoryDuration">Durasi Per Pengumuman</label>
							<input type="text" v-model="categoryDuration"
								class="border-2 px-2 border-OnPrimaryContainer hover:border-Primary rounded-md hover:duration-300 h-10"
								placeholder="example: 192.168.0.33" required />
						</div>
						<div v-for="role in listRole" class="flex justify-between">
							<div class="uppercase">{{ role.role_name }}</div>

							<div
								class="relative w-14 h-8 rounded-full p-1 border-OnPrimaryContainer border-2 flex items-center bg-slate-200">
								<input :checked="isChecked(role.role_id)" type="checkbox"
									@change="toggleUser(role.role_id)"
									class="absolute w-6 h-6 rounded-full appearance-none cursor-pointer bg-white border-none checked:right-0 checked:left-6 transition-transform duration-1000 checked:bg-green-400" />
							</div>
						</div>

						<div class="flex justify-center">
							<button type="submit"
								class="bg-Primary text-OnPrimary rounded-md px-4 py-2 hover:text-OnPrimaryContainer hover:bg-PrimaryContainer w-full duration-300">
								UBAH
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	<NotificationModal :modal-header="modalHeader" :modal-content="modalContent" :is-open="isOpen"
		:button-function="closeNotif" />
</template>

<script setup>
const { addCategory, getAllCategory, editCategory, setActiveCategory } = useCategory()
const { getRole } = useUser()
// MODAL NOTIFICATION VARIABLE
const modalHeader = ref("")
const modalContent = ref("")
const isOpen = ref(false)
const listCategory = ref(await getAllCategory())
const modalEditKategori = ref(false)
const selectedUser = ref([])
const listRole = ref(await getRole())
const modalAddKategori = ref(false)
const categoryName = ref("")
const categoryQty = ref(0)
const categoryDuration = ref(0)
const categoryId = ref("")
const categoryUser = ref([])
onBeforeMount(async () => {
	currentUser.value = JSON.parse(sessionStorage.getItem("currentUser"))
	const router = useRouter()
	if (currentUser.value == null) {
		router.push("/")
	}
	else if (currentUser.value.us_role != "admin") {
		router.push("/Biro/ListAnnouncementPage")
	}
})
const isChecked = (role_id) => {
	return categoryUser.value.some((item) => item.role.role_id === role_id)
}
const toggleModal = (modal) => {
	modalAddKategori.value = !modal
}
const toggleModalEdit = (modal, data) => {
	modalEditKategori.value = !modal
	if (modalEditKategori.value) {
		categoryName.value = data.cat_name
		categoryDuration.value = data.cat_duration
		categoryQty.value = data.cat_qty
		categoryId.value = data.cat_id
		categoryUser.value = data.categoryuser
		data.categoryuser.forEach((element) => {
			toggleUser(element.cu_role_id)
		})
	} else {
		categoryName.value = ""
		categoryDuration.value = ""
		categoryQty.value = ""
		categoryId.value = ""
		selectedUser.value = []
	}
}
const addNewKategori = async () => {
	const data = {
		cat_name: categoryName.value,
		cat_qty: categoryQty.value,
		cat_duration: categoryDuration.value,
	}
	const result = await addCategory(data)
	if (result.statusCode == 200) {
		isOpen.value = true
		modalHeader.value = "Berhasil"
		modalContent.value = "Berhasil menambahkan kategori"
	} else {
		isOpen.value = true
		modalHeader.value = "Gagal"
		modalContent.value = result.body.message
	}
}
const editKategori = async () => {
	const data = {
		cat_id: categoryId.value,
		cat_name: categoryName.value,
		cat_qty: categoryQty.value,
		cat_duration: categoryDuration.value,
		user: selectedUser.value,
	}
	editCategory(data).then((result) => {
		if (result.statusCode == 200) {
			isOpen.value = true
			modalHeader.value = "Berhasil"
			modalContent.value = result.body.message
		} else {
			isOpen.value = true
			modalHeader.value = "Gagal"
			modalContent.value = result.body.message
		}
	})
}
const deleteCategory = async (data) => {
	const result = await setActiveCategory(data)
	if (result.statusCode == 200) {
		isOpen.value = true
		modalHeader.value = "Berhasil"
		modalContent.value = result.body.message
	} else {
		isOpen.value = true
		modalHeader.value = "Gagal"
		modalContent.value = result.body.message
	}
}
const toggleUser = (role_id) => {
	const data = {
		cu_cat_id: categoryId.value,
		cu_role_id: role_id,
	}
	const isDataIncluded = selectedUser.value.some(
		(item) => item.cu_cat_id === data.cu_cat_id && item.cu_role_id === data.cu_role_id
	)
	if (isDataIncluded) {
		selectedUser.value = selectedUser.value.filter(
			(item) => item.cu_cat_id !== data.cu_cat_id || item.cu_role_id !== data.cu_role_id
		)
	} else {
		selectedUser.value.push(data)
	}
}
const closeNotif = () => {
	const router = useRouter()
	isOpen.value = false
	router.go()
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