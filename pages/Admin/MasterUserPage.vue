<template>
	<!-- Navbar Component -->
	<div class="bg-cyan-700 h-screen w-full p-2 flex space-x-3">
		<div class="flex flex-col h-full w-[20%] bg-white rounded-xl p-2 space-y-2">
			<!-- Navbar component -->
			<Navbar />
		</div>
		<div class="h-full w-[80%] bg-white rounded-xl p-2 flex flex-col">
			<!-- Header Section -->
			<div class="flex justify-between items-center">
				<div class="text-Primary font-bold text-2xl">Daftar User</div>
				<div class="flex items-center">
					<!-- Search Input -->
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
					<!-- Add New User Button -->
					<img
						@click="toggleModal(modalAddUser)"
						src="/public/icon-add.png"
						alt=""
						class="w-[40px] cursor-pointer hover:bg-slate-300 hover:duration-300 rounded-lg" />
					<!-- Add New Role Button -->
					<button
						@click="toggleModal(modalAddRole)"
						class="rounded bg-Primary py-2 px-2 text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer">
						Add Role
					</button>
				</div>
			</div>
			<!-- Divider -->
			<div class="border-b-2 border-Primary mt-1"></div>
			<!-- Table Header -->
			<div class="flex">
				<div class="flex-1 font-semibold border-b border-gray-300 py-2 px-4">Nama</div>
				<div class="flex-1 font-semibold border-b border-gray-300 py-2 px-4">Role</div>
				<div class="flex-1 font-semibold border-b border-gray-300 py-2 px-4">Tanggal Buat</div>
				<div class="flex-1 font-semibold border-b border-gray-300 py-2 px-4">Jumlah Pengumuman</div>
			</div>
			<!-- User Data Section -->
			<div class="flex flex-col flex-grow overflow-auto">
				<!-- Display User Data Here -->
				<div
					v-for="user in users"
					:key="user.id"
					class="flex items-center hover:bg-gray-100 py-2 px-4">
					<div class="flex-1">{{ user.us_username }}</div>
					<div class="flex-1">{{ user.role.role_name }}</div>
					<div class="flex-1">
						{{ formatDate(user.createdAt) }}
					</div>
					<div class="flex-1">
						{{ user.listannouncement.length }}
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal Add User -->
	<div
		ref="modalAddUser"
		class="hidden overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
		<div class="p-4 w-full max-w-2xl relative bg-white rounded-lg shadow sm:p-5">
			<div class="flex gap-1 justify-between items-center pb-4 mb-4 rounded-t border-b">
				<h3 class="text-lg font-semibold text-OnPrimaryContainer">Menambahkan User Baru</h3>
				<svg
					@click="toggleModal(modalAddUser)"
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
				<form @submit.prevent="addNewUser">
					<div class="flex flex-col space-y-2 text-OnPrimaryContainer">
						<div class="flex flex-col">
							<label for="screenName">Nama User</label>
							<input
								type="text"
								v-model="userName"
								class="px-2 border-2 border-OnPrimaryContainer hover:border-Primary rounded-md hover:duration-300 h-10"
								required />
						</div>
						<div class="flex flex-col">
							<label for="password">Password</label>
							<input
								type="text"
								v-model="password"
								class="px-2 border-2 border-OnPrimaryContainer hover:border-Primary rounded-md hover:duration-300 h-10"
								required />
						</div>
						<div class="flex flex-col">
							<label for="role">Role</label>
							<select
								v-model="role_id"
								class="text-OnPrimaryContainer rounded hover:text-OnPrimaryContainer hover:duration-300">
								<option
									class="text-OnPrimaryContainer rounded py-1 px-2"
									v-for="item in roles"
									:key="item.role_id"
									:value="item.role_id">
									{{ item.role_name }}
								</option>
							</select>
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
	<!-- Modal Add Role<v> -->
	<div
		ref="modalAddRole"
		class="hidden overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
		<div class="p-4 w-full max-w-2xl relative bg-white rounded-lg shadow sm:p-5">
			<div class="flex gap-1 justify-between items-center pb-4 mb-4 rounded-t border-b">
				<h3 class="text-lg font-semibold text-OnPrimaryContainer">Menambahkan Role Baru</h3>
				<svg
					@click="toggleModal(modalAddRole)"
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
				<form @submit.prevent="addNewRole">
					<div class="flex flex-col space-y-2 text-OnPrimaryContainer">
						<div class="flex flex-col">
							<label for="roleName">Nama Role</label>
							<input
								type="text"
								v-model="role_name"
								class="px-2 border-2 border-OnPrimaryContainer hover:border-Primary rounded-md hover:duration-300 h-10"
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
	<!-- Modal Edit User<x> -->
	<div
		ref="modalEditUser"
		class="hidden overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
		<div class="p-4 w-full max-w-2xl relative bg-white rounded-lg shadow sm:p-5">
			<div class="flex gap-1 justify-between items-center pb-4 mb-4 rounded-t border-b">
				<h3 class="text-lg font-semibold text-OnPrimaryContainer">Edit User</h3>
				<svg
					@click="toggleModal(modalEditUser)"
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
				<form @submit.prevent="editUser">
					<div class="flex flex-col space-y-2 text-OnPrimaryContainer">
						<div class="flex flex-col">
							<label for="userName">Nama User</label>
							<input
								type="text"
								v-model="userName"
								class="px-2 border-2 border-OnPrimaryContainer hover:border-Primary rounded-md hover:duration-300 h-10"
								required />
						</div>
						<div class="flex flex-col">
							<label for="password">Password</label>
							<input
								type="text"
								v-model="password"
								class="px-2 border-2 border-OnPrimaryContainer hover:border-Primary rounded-md hover:duration-300 h-10"
								required />
						</div>
						<div class="flex flex-col">
							<label for="roles">Role</label>
							<select
								name=""
								id="">
								<div
									v-for="item in roles"
									:key="item.role_id">
									{{ item.role_name }}
								</div>
							</select>
						</div>
						<div class="flex justify-center">
							<button
								type="submit"
								class="bg-Primary text-OnPrimary rounded-md px-4 py-2 hover:text-OnPrimaryContainer hover:bg-PrimaryContainer w-full duration-300">
								Ubah
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>

	<NotificationModal
		:modal-header="modalHeader"
		:modal-content="modalContent"
		:is-open="isOpen"
		:button-function="closeNotif" />
</template>

<script setup>
	const { getUser, createUser, deleteUser, getRole, createRole } = useUser()
	// Declare user parameter
	const userName = ref("")
	const password = ref("")
	const role_id = ref("")
	const role_name = ref("")
	const roles = ref(await getRole())
	// Define reactive state for users
	const users = ref(await getUser())
	// Define modal variable
	const modalAddUser = ref(null)
	const modalAddRole = ref(null)
	const modalEditUser = ref(null)
	// Notif modal variable
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
	// Fetch user data on component mount
	onMounted(async () => {
		console.log(users.value)
	})
	const toggleModal = (modal) => {
		modal.classList.toggle("hidden")
	}
	// Function to format createdAt date
	function formatDate(dateString) {
		const date = new Date(dateString)
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		})
	}

	async function addNewUser() {
		try {
			const user = {
				us_username: userName.value,
				us_password: password.value,
				role_id: role_id.value,
			}
			console.log(user)
			// Replace with actual API call to create user
			createUser(user)
				.then((response) => {
					openNotif("Success", "User berhasil ditambahkan")
				})
				.catch((error) => {
					openNotif("Error", "User gagal ditambahkan")
				})
		} catch (error) {
			console.error("Error creating user:", error)
		}
	}

	async function removeUser(userId) {
		try {
			// Replace with actual API call to delete user
			const response = await deleteUser(userId)
			console.log(response)
		} catch (error) {
			console.error("Error deleting user:", error)
		}
	}

	async function editUser(userId) {
		// Redirect to edit user page
	}

	async function addNewRole() {
		try {
			const role = {
				role_name: role_name.value,
			}
			// Replace with actual API call to create role
			createRole(role)
				.then((response) => {
					openNotif("Success", "Role berhasil ditambahkan")
				})
				.catch((error) => {
					openNotif("Error", "Role gagal ditambahkan")
				})

			console.log(response)
		} catch (error) {
			console.error("Error creating role:", error)
		}
	}
</script>

<style scoped>
	/* Add your scoped styles here */
</style>
