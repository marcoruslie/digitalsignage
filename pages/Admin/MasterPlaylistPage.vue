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
                            class="block w-full py-2 pl-10 pr-4 leading-tight bg-white border border-gray-300 rounded focus:outline-none focus:bg-white focus:border-gray-500">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 15l5 5M10 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                            </svg>
                        </div>
                    </div>
                    <img src="/icon-add.png" alt="" @click="toggleModal(modalAddPlaylist)"
                        class="w-[40px] cursor-pointer hover:bg-slate-300 hover:duration-300 rounded-lg">
                </div>
            </div>
            <div class="border-b-2 border-Primary mt-1"></div>
            <div class="max-h-[95%] overflow-auto h-full flex-col p-1 space-y-1">
                <!-- List Playlist -->
                <div v-for="item in searchedPlaylist" :key="item.id"
                    class="h-[100px] w-full rounded shadow-xl hover:bg-slate-50 flex items-center justify-between space-x-3 px-2">
                    <div class="flex flex-col">
                        <div class="font-bold text-lg">{{ item.pl_name }}</div>
                        <div v-if="item.playlist_in_screen.length == 0" class="font-light">Tidak Aktif Di Screen Manapun
                        </div>
                        <div v-else class="font-light">
                            <div class="font-bold" v-for="screen in item.playlist_in_screen">
                                {{ screen.screen.sc_name + " - " + screen.screen.sc_location }}
                            </div>
                        </div>

                    </div>
                    <div class="flex items-center space-x-3">
                        <img src="/Monitor.png" alt="" @click="toggleModalPlaylist(item, modalAddPlaylistToScreen)"
                            class="w-14 cursor-pointer hover:shadow-2xl hover:bg-Primary hover:duration-300 rounded">
                        <img src="/icon-edit.png" aria-label="Edit Playlist"
                            @click="toggleModalPlaylist(item, modalPlaylist)"
                            class="cursor-pointer rounded hover:shadow-inner w-11 bg-transparent">
                        <img src="/icon-delete.png" @click="deletePlaylistData(item.pl_id)"
                            class="cursor-pointer rounded hover:shadow-2xl w-14 hover:bg-red-300 hover:duration-1000 bg-transparent">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div ref="modalPlaylist"
        class="hidden overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
        <div class="flex flex-col p-4 w-full max-w-6xl h-5/6 relative bg-white rounded-lg shadow sm:p-5">
            <div class="flex gap-1 justify-between items-center pb-4 mb-4 rounded-t border-b">
                <h3 class="text-lg font-semibold text-OnPrimaryContainer">
                    Daftar List Pengumuman
                </h3>
                <svg @click="toggleModalPlaylist(null, modalPlaylist)" xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 hover:cursor-pointer hover:bg-Primary hover:duration-500 hover:rounded-lg"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <form @submit.prevent="updatePlaylistData" class="flex flex-col flex-grow space-y-2 overflow-hidden">
                <input v-model="searchList" type="text" class="flex-1 rounded border-2 py-2 px-2" placeholder="Cari...">
                <div class="flex-grow overflow-auto h-full">
                    <div v-for="(item, index) in searchedListAnnouncement">
                        <div
                            class="h-[150px] w-full rounded shadow-xl hover:bg-slate-50 flex items-center justify-between space-x-3 cursor-pointer">
                            <div class="flex items-center space-x-3" @click="toggleDropDown(index)">
                                <div class="flex-col">
                                    <div class="font-bold text-lg m-1">{{ item.la_title }}</div>
                                    <div class="text-base mx-1">Diposting : {{ item.la_us_username }}</div>
                                    <div class="text-base mx-1">Kategori : {{ item.category.cat_name }}
                                    </div>
                                    <div class="text-base mx-1">
                                        {{ new Date(item.createdAt).toLocaleDateString('id-ID', {
                            day:
                                '2-digit', month:
                                'long', year: 'numeric'
                        }) + ' | ' + new
                            Date(item.createdAt).toLocaleTimeString('id-ID', {
                                hour:
                                    '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jakarta'
                            }) + ' WIB' }}
                                    </div>
                                    <div class="text-base mx-1">Durasi : 00 Menit 58 Detik</div>
                                </div>
                            </div>
                            <div class="flex items-center space-x-3">
                                <div @click="toggleSelection(item)"
                                    class="relative w-14 h-8 rounded-full p-1 border-OnPrimaryContainer border-2 flex items-center bg-slate-200 cursor-pointer">
                                    <input type="checkbox" v-on:click="toggleSelection(item)"
                                        :checked="isSelected(item)"
                                        class="absolute w-6 h-6 rounded-full appearance-none bg-white border-none checked:right-0 checked:left-6 transition-transform duration-1000 checked:bg-green-400"
                                        disabled>
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
                <button type="submit"
                    class="w-full flex items-center justify-center bg-Primary text-OnPrimary hover:duration-500 hover:bg-PrimaryContainer hover:text-OnPrimaryContainer rounded cursor-pointer py-2">
                    Simpan
                </button>
            </form>
        </div>
    </div>
    <div ref="modalAddPlaylist"
        class="hidden overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
        <form @submit.prevent="createNewPlaylist"
            class="p-4 w-3/4 max-w-6xl h-[calc(100vh-20px)] relative bg-white rounded-lg shadow sm:p-5 flex flex-col space-y-2">
            <div class="flex justify-between items-center pb-4 rounded-t border-b">
                <h3 class="text-lg font-semibold text-OnPrimaryContainer">
                    Tambah List Pengumuman
                </h3>
                <svg @click="closeModal(modalAddPlaylist)" xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 hover:cursor-pointer hover:bg-Primary hover:duration-500 hover:rounded-lg"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>

            </div>
            <div class="flex-col flex-grow space-y-2 overflow-auto">
                <div class="flex flex-col space-y-2 text-OnPrimaryContainer">
                    <div class="flex flex-col">
                        <label for="listName">Nama Playlist</label>
                        <input v-model="playlistName" type="text" required
                            class="border-2 border-gray-500 hover:border-Primary rounded-md hover:duration-300 px-2 py-2">
                    </div>
                </div>
                <div class="max-h-full">
                    <div v-for="(item, index) in listListAnnouncement">
                        <div
                            class="h-[150px] w-full rounded shadow-xl hover:bg-slate-50 flex items-center justify-between space-x-3 cursor-pointer">
                            <div class="flex items-center space-x-3" @click="toggleDropDown(index)">
                                <div class="flex-col">
                                    <div class="font-bold text-lg m-1">{{ item.la_title }}</div>
                                    <div class="text-base mx-1">Diposting : {{ item.la_us_username }}
                                    </div>
                                    <div class="text-base mx-1">Kategori : {{ item.category.cat_name }}
                                    </div>
                                    <div class="text-base mx-1">
                                        {{ new Date(item.createdAt).toLocaleDateString('id-ID', {
                            day: '2-digit', month: 'long', year: 'numeric'
                        }) + ' | ' + new Date(item.createdAt).toLocaleTimeString('id-ID', {
                            hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jakarta'
                        }) + ' WIB' }}
                                    </div>
                                    <div class="text-base mx-1">Durasi : 00 Menit 58 Detik</div>
                                </div>
                            </div>
                            <div class="flex items-center space-x-3">


                                <div @click="toggleSelection(item)"
                                    class="relative w-14 h-8 rounded-full p-1 border-OnPrimaryContainer border-2 flex items-center bg-slate-200 cursor-pointer">
                                    <input type="checkbox" v-on:click="toggleSelection(item)"
                                        :checked="isSelected(item)"
                                        class="absolute w-6 h-6 rounded-full appearance-none bg-white border-none checked:right-0 checked:left-6 transition-transform duration-1000 checked:bg-green-400"
                                        disabled>
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
                Tambahkan</button>
        </form>
    </div>
    <div ref="modalAddPlaylistToScreen"
        class="hidden overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
        <form @submit.prevent=""
            class="p-4 w-3/4 max-w-6xl h-[calc(100vh-20px)] relative bg-white rounded-lg shadow sm:p-5 flex flex-col space-y-2">
            <div class="flex justify-between items-center pb-4 rounded-t border-b">
                <h3 class="text-lg font-semibold text-OnPrimaryContainer">
                    Tambah Playlist Ke Screen
                </h3>
                <svg @click="toggleModalPlaylist(null, modalAddPlaylistToScreen)" xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 hover:cursor-pointer hover:bg-Primary hover:duration-500 hover:rounded-lg"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>

            </div>
            <div class="flex-col flex-grow space-y-2 overflow-auto">
                <div class="max-h-full">
                    <div v-for="(item, index) in listListAnnouncement">
                        <div
                            class="h-[150px] w-full rounded shadow-xl hover:bg-slate-50 flex items-center justify-between space-x-3 cursor-pointer">
                            <div class="flex items-center space-x-3" @click="toggleDropDown(index)">
                                <div class="flex-col">
                                    <div class="font-bold text-lg m-1">{{ item.la_title }}</div>
                                    <div class="text-base mx-1">Diposting : {{ item.la_us_username }}
                                    </div>
                                    <div class="text-base mx-1">Kategori : {{ item.category.cat_name }}
                                    </div>
                                    <div class="text-base mx-1">
                                        {{ new Date(item.createdAt).toLocaleDateString('id-ID', {
                            day: '2-digit', month: 'long', year: 'numeric'
                        }) + ' | ' + new Date(item.createdAt).toLocaleTimeString('id-ID', {
                            hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jakarta'
                        }) + ' WIB' }}
                                    </div>
                                    <div class="text-base mx-1">Durasi : 00 Menit 58 Detik</div>
                                </div>
                            </div>
                            <div class="flex items-center space-x-3">


                                <div @click="toggleSelection(item)"
                                    class="relative w-14 h-8 rounded-full p-1 border-OnPrimaryContainer border-2 flex items-center bg-slate-200 cursor-pointer">
                                    <input type="checkbox" v-on:click="toggleSelection(item)"
                                        :checked="isSelected(item)"
                                        class="absolute w-6 h-6 rounded-full appearance-none bg-white border-none checked:right-0 checked:left-6 transition-transform duration-1000 checked:bg-green-400"
                                        disabled>
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
                Tambahkan</button>
        </form>
    </div>
    <NotificationModal :modal-header="modalHeader" :modal-content="modalContent" :is-open="isOpen"
        :button-function="closeNotif" />
</template>

<script setup>
import { io } from 'socket.io-client';
onMounted(async () => {
    for (let i = 0; i < listListAnnouncement.value.length; i++) {
        isDropdownOpen.value.push(false);
    }
    const host = 'http://localhost:3000';
    const socket = io(host, {
        path: '/api/socket.io',
    });
    socket.on('connect', () => {
        socket.emit('clientType', "server")
    })
})
const { getPlaylist, createPlaylist, deletePlaylist, updatePlaylist } = usePlaylist()
const { getListAnnouncement } = useAnnouncement()
const { getScreen } = useScreen()
const { getCLient } = useSocket()
const listScreen = ref(await getScreen());
const listPlaylist = ref(await getPlaylist());
const listListAnnouncement = ref(await getListAnnouncement());
// Declare playlist variable
const playlistName = ref('');
const playlistNameSearch = ref('')
const playlist = ref([]);
const modalPlaylist = ref(null);
const modalAddPlaylist = ref(null);
const modalAddPlaylistToScreen = ref(null);
// Declare search variable
const searchList = ref('');
const isDropdownOpen = ref([]);
const selectedItems = ref([]);

const modalHeader = ref('')
const modalContent = ref('')
const isOpen = ref(false)
const closeNotif = () => {
    isOpen.value = false
    const router = useRouter()
    router.go()
}
const openNotif = (header, content) => {
    modalHeader.value = header
    modalContent.value = content
    isOpen.value = true
}
const toggleModal = (modal) => {
    modal.classList.toggle('hidden');
    isDropdownOpen.value.fill(false);
}
const searchedListAnnouncement = computed(() => {
    return listListAnnouncement.value.filter((item) => {
        return item.la_title.toLowerCase().includes(searchList.value.toLowerCase());
    });
});
const searchedPlaylist = computed(() => {
    return listPlaylist.value.filter((item) => {
        return item.pl_name.toLowerCase().includes(playlistNameSearch.value.toLowerCase());
    }).sort((a, b) => {
        return b.playlist_in_screen.length - a.playlist_in_screen.length
    });
});
const toggleModalPlaylist = (data, modal) => {
    if (data != null) {
        playlist.value = data;
        const listInPlaylistData = data.list_in_playlist
        const dataMaped = listInPlaylistData.flatMap((item) => item.listannouncement);
        const laIds = dataMaped.map((item) => item.la_id); // Extract la_id values
        const dataFiltered = listListAnnouncement.value.filter((item) => laIds.includes(item.la_id));
        selectedItems.value = dataFiltered;
    }
    else {
        selectedItems.value = [];
    }
    toggleModal(modal);
}
const toggleDropDown = (idx) => {
    isDropdownOpen.value[idx] = !isDropdownOpen.value[idx];
}

const toggleSelection = (data) => {
    const index = selectedItems.value.indexOf(data);
    if (index !== -1) {
        selectedItems.value.splice(index, 1);
    } else {
        selectedItems.value.push(data);
    }
}

const isSelected = (data) => {
    return selectedItems.value.includes(data);
};
const clearSelected = () => {
    selectedItems.value = [];
}
const closeModal = (modal) => {
    toggleModal(modal)
    clearSelected();
}
const createNewPlaylist = async () => {
    const data = {
        pl_name: playlistName.value,
        list_announcement_id: selectedItems.value.map((item) => item.la_id)
    }
    await createPlaylist(data).then((res) => {
        if (res.statusCode == 200) {
            openNotif('Success', res.body.message)
        }
        else {
            openNotif('Error', res.body)
        }
    });
}
const deletePlaylistData = async (data) => {
    await deletePlaylist(data).then((res) => {
        if (res.statusCode == 200) {
            openNotif('Success', res.body.message)
        }
        else {
            openNotif('Error', res.body)
        }
    })
}
const updatePlaylistData = async () => {
    const data = {
        listannouncement: selectedItems.value.map((item) => item.la_id),
        pl_id: playlist.value.pl_id
    }
    await updatePlaylist(data).then((res) => {
        if (res.statusCode == 200) {
            openNotif('Success', res.body.message)
        }
        else {
            console.log(res.body.message)
            openNotif('Error', res.body.message)
        }
    })
}
</script>