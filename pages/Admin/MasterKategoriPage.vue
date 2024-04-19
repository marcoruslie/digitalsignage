<template>

    <div class="bg-cyan-700 h-svh w-full p-2 flex space-x-3">
        <div class="flex flex-col h-full w-[20%] bg-white rounded-xl p-2 space-y-2">
            <Navbar />
        </div>
        <div class="h-full w-[80%] bg-white rounded-xl p-2 flex flex-col">
            <div class="flex justify-between items-center">
                <div class="text-Primary font-bold text-2xl">Daftar Kategori</div>
                <div class="flex items-center">
                    <div class="relative">
                        <input type="text" placeholder="Search..."
                            class="block w-full py-2 pl-10 pr-4 leading-tight bg-white border border-gray-300 rounded focus:outline-none focus:bg-white focus:border-gray-500">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 15l5 5M10 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                            </svg>
                        </div>
                    </div>
                    <img src="/public/icon-add.png" alt="" @click="toggleModal(modalAddKategori)"
                        class="w-[40px] cursor-pointer hover:bg-slate-300 hover:duration-300 rounded-lg">
                </div>
            </div>
            <div class="border-b-2 border-Primary mt-1"></div>
            <div class="flex">
                <div class="w-2/5 font-semibold border-b border-gray-300 py-2 px-4">Nama Kategori</div>
                <div class="w-2/5 font-semibold border-b border-gray-300 py-2 px-4">Hak Akses</div>
                <div class="w-1/5 font-semibold border-b border-gray-300 py-2 px-4">Durasi Per Pengumuman</div>
                <div class="w-1/5 font-semibold border-b border-gray-300 py-2 px-4">Pengumuman Per List</div>
                <div class="w-1/5 font-semibold border-b border-gray-300 py-2 px-4">Total Pengumuman</div>
                <div class="w-1/5 font-semibold border-b border-gray-300 py-2 px-4">-</div>
            </div>
            <div class="flex flex-col flex-grow overflow-auto">
                <!-- Sample row -->
                <div class="flex hover:bg-slate-200 hover:duration-300 hover:cursor-pointer"
                    v-for="data in listCategory.body.data">
                    <div class="w-2/5 border-b border-gray-300 py-2 px-4">{{ data.cat_name }}</div>
                    <div class="w-2/5 border-b border-gray-300 py-2 px-4 flex-col">
                        <div v-if="data.categoryuser.length > 0" v-for="(userData, index) in data.categoryuser">
                            {{ (index + 1) }}.
                            {{ userData.user.role.role_name }}
                        </div>
                        <div v-else="data.categoryuser.length == 0">(NONE)</div>
                    </div>
                    <div class="w-1/5 border-b border-gray-300 py-2 px-4 flex-col">{{ data.cat_duration }}</div>
                    <div class="w-1/5 border-b border-gray-300 py-2 px-4 flex-col">{{ data.cat_qty }}</div>
                    <div class="w-1/5 border-b border-gray-300 py-2 px-4">{{ data.listannouncement.length }}</div>
                    <div class="w-1/5 border-b border-gray-300 py-2 px-4 flex items-center">
                        <img src="/public/icon-edit.png" alt="" @click="toggleModalEdit(modalEditKategori, data)"
                            class="w-[60px] h-[60px] p-[10px] cursor-pointer hover:bg-slate-300 hover:duration-300 rounded-lg">
                        <img src="/public/icon-delete.png" alt=""
                            class="w-[60px] h-[60px] cursor-pointer hover:bg-slate-300 hover:duration-300 rounded-lg">
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
                <h3 class="text-lg font-semibold text-OnPrimaryContainer">
                    Tambah Kategori
                </h3>
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
                                required>
                        </div>
                        <div class="flex flex-col">
                            <label for="categoryQty">Jumlah Pengumuman (Dalam 1 List Pengumuman)</label>
                            <input type="text" v-model="categoryQty"
                                class="border-2 px-2 border-OnPrimaryContainer hover:border-Primary rounded-md hover:duration-300 h-10"
                                required>
                        </div>
                        <div class="flex flex-col">
                            <label for="categoryDuration">Durasi Pengumuman</label>
                            <input type="text" v-model="categoryDuration"
                                class="border-2 px-2 border-OnPrimaryContainer hover:border-Primary rounded-md hover:duration-300 h-10"
                                placeholder="example: 192.168.0.33" required>

                        </div>
                        <div class="flex justify-center">
                            <button type="submit"
                                class="bg-Primary text-OnPrimary rounded-md px-4 py-2 hover:text-OnPrimaryContainer hover:bg-PrimaryContainer w-full duration-300">Tambah</button>
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
                <h3 class="text-lg font-semibold text-OnPrimaryContainer">
                    Setting Kategori
                </h3>
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
                                required>
                        </div>
                        <div class="flex flex-col">
                            <label for="categoryQty">Jumlah Pengumuman (Dalam 1 List Pengumuman)</label>
                            <input type="text" v-model="categoryQty"
                                class="border-2 px-2 border-OnPrimaryContainer hover:border-Primary rounded-md hover:duration-300 h-10"
                                required>
                        </div>
                        <div class="flex flex-col">
                            <label for="categoryDuration">Durasi Per Pengumuman</label>
                            <input type="text" v-model="categoryDuration"
                                class="border-2 px-2 border-OnPrimaryContainer hover:border-Primary rounded-md hover:duration-300 h-10"
                                placeholder="example: 192.168.0.33" required>

                        </div>
                        <div v-for="user in listUser" class="flex justify-between">
                            <div class="uppercase">{{ user.us_username }} - {{ user.role.role_name }}</div>

                            <div
                                class="relative w-14 h-8 rounded-full p-1 border-OnPrimaryContainer border-2 flex items-center bg-slate-200">
                                <input :checked="isChecked(user.us_username)" type="checkbox"
                                    @change="toggleUser(user.us_username)"
                                    class="absolute w-6 h-6 rounded-full appearance-none cursor-pointer bg-white border-none checked:right-0 checked:left-6 transition-transform duration-1000 checked:bg-green-400">
                            </div>
                        </div>

                        <div class="flex justify-center">
                            <button type="submit"
                                class="bg-Primary text-OnPrimary rounded-md px-4 py-2 hover:text-OnPrimaryContainer hover:bg-PrimaryContainer w-full duration-300">UBAH</button>
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
import useUser from '~/composables/useUser';

const { addCategory, getCategory, editCategory } = useCategory()
const { getUser } = useUser()
// MODAL NOTIFICATION VARIABLE
const modalHeader = ref('')
const modalContent = ref('')
const isOpen = ref(false)
const listUser = ref(await getUser())
const listCategory = ref(await getCategory())
const modalEditKategori = ref(false);
const selectedUser = ref([]);

const modalAddKategori = ref(false);
const categoryName = ref('');
const categoryQty = ref(0);
const categoryDuration = ref(0);
const categoryId = ref('');
const categoryUser = ref([]);
const isChecked = (user) => {
    return categoryUser.value.some(item => item.cu_us_username === user)
}
const toggleModal = (modal) => {
    modalAddKategori.value = !modal;
}
const toggleModalEdit = (modal, data) => {
    modalEditKategori.value = !modal;
    if (modalEditKategori.value) {
        categoryName.value = data.cat_name
        categoryDuration.value = data.cat_duration
        categoryQty.value = data.cat_qty
        categoryId.value = data.cat_id
        categoryUser.value = data.categoryuser
        data.categoryuser.forEach(element => {
            toggleUser(element.cu_us_username)
        });
    }
    else {
        categoryName.value = ''
        categoryDuration.value = ''
        categoryQty.value = ''
        categoryId.value = ''
        selectedUser.value = []
    }
}
const addNewKategori = async () => {
    const data = {
        cat_name: categoryName.value,
        cat_qty: categoryQty.value,
        cat_duration: categoryDuration.value
    }
    const result = await addCategory(data)
    if (result.statusCode == 200) {
        isOpen.value = true
        modalHeader.value = 'Berhasil'
        modalContent.value = 'Berhasil menambahkan kategori'
    } else {
        isOpen.value = true
        modalHeader.value = 'Gagal'
        modalContent.value = result.body.message
    }
}
const editKategori = async () => {
    const data = {
        cat_id: categoryId.value,
        cat_name: categoryName.value,
        cat_qty: categoryQty.value,
        cat_duration: categoryDuration.value,
        user: selectedUser.value
    }
    const result = await editCategory(data)
    if (result.statusCode == 200) {
        isOpen.value = true
        modalHeader.value = 'Berhasil'
        modalContent.value = 'Berhasil mengubah kategori'
    } else {
        isOpen.value = true
        modalHeader.value = 'Gagal'
        modalContent.value = result.body.message
    }
}
const toggleUser = (user) => {
    const data = {
        cu_cat_id: categoryId.value,
        cu_us_username: user
    }
    const isDataIncluded = selectedUser.value.some(item =>
        item.cu_cat_id === data.cu_cat_id &&
        item.cu_us_username === data.cu_us_username
    );
    if (isDataIncluded) {
        selectedUser.value = selectedUser.value.filter(item =>
            item.cu_cat_id !== data.cu_cat_id ||
            item.cu_us_username !== data.cu_us_username
        );
    } else {
        selectedUser.value.push(data);
    }
}
const closeNotif = () => {
    const router = useRouter()
    isOpen.value = false
    router.go()
}
</script>
