<template>
    <div class="bg-Primary h-svh w-full p-2 flex space-x-3">
        <div class="flex flex-col h-full w-[20%] bg-white rounded-xl p-2 space-y-2">
            <Navbar />
        </div>
        <div class="h-full w-[80%] bg-white rounded-xl flex-col p-2">
            <div class="flex justify-between items-center">
                <div class="text-Primary font-bold text-2xl">Daftar Monitor</div>

            </div>
            <div class="border-b-2 border-Primary mt-1"></div>
            <div class="flex flex-wrap m-1">
                <div v-for="screen in listScreen"
                    class="bg-Primary h-[260px] w-[260px] rounded flex flex-col items-center justify-center cursor-pointer hover:shadow-2xl hover:bg-OnPrimaryContainer text-OnPrimary mx-1"
                    @click="toggleModal(modalScreen, screen)">
                    <img src="\Monitor.png" alt="">
                    <div>{{ screen.sc_name }}</div>
                    <div>{{ screen.sc_location }}</div>
                    <div>{{ screen.sc_ip }}</div>

                    <div v-if="screen.playlist != null">{{ screen.playlist.pl_name }}</div>
                    <div class="flex">Status : <div :class="statusClass(screen.sc_ip)">{{ statusText(screen.sc_ip) }}
                        </div>
                    </div>
                </div>
                <div class="bg-Primary h-[260px] w-[260px] rounded flex flex-col items-center justify-center mx-1 cursor-pointer hover:shadow-2xl hover:bg-OnPrimaryContainer text-OnPrimary"
                    @click="toggleModal(modalAddScreen)">
                    <img src="/icon-add.png" alt="">
                    <div>Add New Screen</div>
                </div>
            </div>

        </div>
    </div>
    <div ref="modalScreen"
        class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 p-8 rounded-lg shadow-md z-10 h-full w-full hidden">
        <div
            class="bg-gradient-to-br from-Primary to-OnPrimaryContainer rounded-md space-x-3 flex justify-center overflow-auto max-h-[90vh] p-2">
            <div
                class="absolute top-11 right-16 cursor-pointer text-gray-300 hover:bg-Primary hover:rounded-xl duration-500">
                <svg @click="toggleModal(modalScreen)" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <iframe v-if="currentScreen != null" :src="currentScreen.sc_ip + '/preview'" width="70%" height="600px"
                frameborder="2" sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                style="pointer-events: none;" class="bg-white"></iframe>
            <div class="flex-col space-y-3">
                <div @click="toggleModalEdit(modalEditScreen)"
                    class="rounded bg-Primary text-center cursor-pointer px-6 py-2 text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer hover:duration-300">
                    Ganti Data Screen</div>
                <div @click="toggleModalEdit(modalPlaylist)"
                    class="rounded bg-Primary text-center cursor-pointer px-6 py-2 text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer hover:duration-300">
                    Konfigurasi Playlist</div>
                <div @click="toggleModalEdit(modalChangeTemplate)"
                    class="rounded bg-Primary text-center cursor-pointer px-6 py-2 text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer hover:duration-300">
                    Ganti Template</div>
            </div>
        </div>
    </div>
    <!-- MODAL GANTI TEMPLATE -->
    <div ref="modalChangeTemplate"
        class="hidden overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
        <div class="p-4 w-full max-w-2xl relative bg-white rounded-lg shadow sm:p-5">
            <div class="flex gap-1 justify-between items-center pb-4 mb-4 rounded-t border-b">
                <h3 class="text-lg font-semibold text-OnPrimaryContainer">
                    Ganti Template
                </h3>
                <svg @click="toggleModalEdit(modalChangeTemplate)" xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 hover:cursor-pointer hover:bg-Primary hover:duration-500 hover:rounded-lg"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <form @submit.prevent="changeTemplate" class="flex flex-col space-y-2">
                <div>
                    Template 1
                    <input v-model="screenTemplate" type="radio" name="template" id="template" value="template1">
                </div>
                <div>
                    Template 2
                    <input v-model="screenTemplate" type="radio" name="template" id="template" value="template2">
                </div>
                <div>
                    Template 3
                    <input v-model="screenTemplate" type="radio" name="template" id="template" value="template3">
                </div>
                <button type="submit"
                    class="w-full bg-Primary text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer hover:duration-300 rounded py-2">Ganti
                    Template</button>
            </form>
        </div>
    </div>
    <!-- MODAL TAMBAH SCREEN -->
    <div ref="modalAddScreen"
        class="hidden overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
        <div class="p-4 w-full max-w-2xl relative bg-white rounded-lg shadow sm:p-5">
            <div class="flex gap-1 justify-between items-center pb-4 mb-4 rounded-t border-b">
                <h3 class="text-lg font-semibold text-OnPrimaryContainer">
                    Add New Screen
                </h3>
                <svg @click="toggleModal(modalAddScreen)" xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 hover:cursor-pointer hover:bg-Primary hover:duration-500 hover:rounded-lg"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <div class="flex flex-col space-y-2">
                <form @submit.prevent="addNewScreen">
                    <div class="flex flex-col space-y-2 text-OnPrimaryContainer">
                        <div class="flex flex-col">
                            <label for="screenName">Screen Name</label>
                            <input type="text" v-model="screenName"
                                class="border-2 border-OnPrimaryContainer hover:border-Primary rounded-md hover:duration-300 h-10"
                                required>
                        </div>
                        <div class="flex flex-col">
                            <label for="screenLocation">Screen Location</label>
                            <input type="text" v-model="screenLocation"
                                class="border-2 border-OnPrimaryContainer hover:border-Primary rounded-md hover:duration-300 h-10"
                                required>
                        </div>
                        <div class="flex flex-col">
                            <label for="screenUrl">Screen IP</label>
                            <input type="text" v-model="screenIP"
                                class="border-2 border-OnPrimaryContainer hover:border-Primary rounded-md hover:duration-300 h-10"
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
    <!-- MODAL GANTI PLAYLIST -->
    <div ref="modalPlaylist"
        class="hidden overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
        <div class="p-4 w-full max-w-6xl h-5/6 relative bg-white rounded-lg shadow sm:p-5 flex flex-col space-y-2">
            <div class="flex justify-between items-center pb-4 rounded-t border-b">
                <h3 class="text-lg font-semibold text-OnPrimaryContainer">
                    Daftar Playlist
                </h3>
                <div class="flex items-center space-x-4">
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
                    <svg @click="toggleModalEdit(modalPlaylist)" xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 hover:cursor-pointer hover:bg-Primary hover:duration-500 hover:rounded-lg"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

            </div>
            <div class="flex-col flex-grow space-y-2 overflow-auto">
                {{ screenPlaylist }}
                <div v-if="!loadPlaylist" v-for="(data, index) in listPlaylist">
                    <div
                        class="h-[120px] w-full rounded shadow-xl hover:bg-slate-50 flex items-center justify-between space-x-3 cursor-pointer">
                        <div class="flex items-center space-x-3" @click="toggleDropDown(index)">
                            <div class="flex-col">
                                <div class="font-bold text-lg m-1">{{ data.pl_name }}</div>
                                <div class="text-base mx-1">Dibuat : {{
                    new Date(data.createdAt).toLocaleDateString('id-ID', {
                        day: '2-digit', month:
                            'long', year: 'numeric'
                    })
                }}</div>
                                <div class="text-base mx-1">Jumlah List Pengumuman : {{
                        data.list_in_playlist.length
                    }}</div>
                            </div>
                        </div>
                        <div class="flex space-x-2">
                            <div class="rounded-md overflow-hidden">
                                <input v-model="selectedDate[data.pl_id]" type="date" :disabled="isDataExist(data.pl_id)">
                            </div>
                            <div @click="toggleSelectPlaylist(data.pl_id, selectedDate[data.pl_id])"
                                class="relative w-14 h-8 rounded-full p-1 border-OnPrimaryContainer border-2 flex items-center bg-slate-200">
                                <input type="checkbox" :checked="isDataExist(data.pl_id)" disabled
                                    class="absolute w-6 h-6 rounded-full appearance-none cursor-pointer bg-white border-none checked:right-0 checked:left-6 transition-transform duration-1000 checked:bg-green-400">
                            </div>

                        </div>
                    </div>
                    <div class="bg-white shadow-lg rounded w-[100%] duration-1000 overflow-hidden transition-all"
                        :class="{ 'max-h-screen': isDropdownOpen[index], 'max-h-0': !isDropdownOpen[index] }">
                        <ul class="py-1">
                            <li v-for="(dataListAn, indexListAn) in data.list_in_playlist"
                                class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between w-full">
                                <div class="w-full">
                                    <div>
                                        {{ (indexListAn + 1) + '. ' + dataListAn.listannouncement.la_title }}
                                    </div>
                                    <div>
                                        Kategori: {{ dataListAn.listannouncement.category.cat_name }}
                                    </div>
                                </div>
                                <div class="w-full">
                                    <div>Jumlah Pengumuman :
                                        {{ dataListAn.listannouncement.announcement_in_list.length }}
                                    </div>
                                    <div>
                                        Durasi List Pengumuman :
                                        {{ parseInt(dataListAn.listannouncement.category.cat_duration) *
                    parseInt(dataListAn.listannouncement.announcement_in_list.length) }}s
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
            <div @click="uploadPlaylistFile"
                class="rounded bg-Primary text-center cursor-pointer px-6 py-2 text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer hover:duration-300">
                Simpan Playlist</div>
        </div>
    </div>
    <!-- MODAL EDIT SCREEN -->
    <div ref="modalEditScreen"
        class="hidden overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
        <form @submit.prevent="editScreen"
            class="p-4 w-1/2 max-w-6xl h-3/6/6 relative bg-white rounded-lg shadow sm:p-5 flex flex-col space-y-2">
            <div class="flex justify-between items-center pb-4 rounded-t border-b">
                <h3 class="text-lg font-semibold text-OnPrimaryContainer">
                    Edit Screen Data
                </h3>

                <svg @click="toggleModalEdit(modalEditScreen)" xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 hover:cursor-pointer hover:bg-Primary hover:duration-500 hover:rounded-lg"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>

            </div>
            <div class="flex-col flex-grow space-y-2 overflow-auto">
                <div class="flex flex-col space-y-2 text-OnPrimaryContainer">
                    <div class="flex flex-col">
                        <label for="screenName">Screen Name</label>
                        <input type="text" v-model="screenName"
                            class="border-2 border-gray-500 hover:border-Primary rounded-md hover:duration-300 px-2 py-2">
                    </div>
                    <div class="flex flex-col">
                        <label for="screenLocation">Screen Location</label>
                        <input type="text" v-model="screenLocation"
                            class="border-2 border-gray-500 hover:border-Primary rounded-md hover:duration-300 px-2 py-2">
                    </div>
                    <div class="flex flex-col">
                        <label for="screenUrl">Screen IP</label>
                        <input type="text" v-model="screenIP"
                            class="border-2 border-gray-500 hover:border-Primary rounded-md hover:duration-300 px-2 py-2"
                            placeholder="example: 192.168.0.33">
                    </div>
                </div>
            </div>
            <button @click="refreshClient"
                class="rounded bg-Primary text-center cursor-pointer px-6 py-2 text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer hover:duration-300">
                Simpan
            </button>
        </form>
    </div>
    <NotificationModal :modal-header="modalHeader" :modal-content="modalContent" :is-open="isOpen"
        :button-function="closeNotif" />
</template>

<script setup>
import { io } from 'socket.io-client';
const { getPlaylist } = usePlaylist()
const { sendMessage, refreshConnectedClient, getCLient } = useSocket()
const { createScreen, deleteScreen, getScreen, updateScreen } = useScreen()
const listScreen = ref(await getScreen())
const currentScreen = ref(null)
// VAR PLAYLIST
const listPlaylist = ref(await getPlaylist())
const router = useRouter()
// MODAL DECLARATION
const modalAddScreen = ref(null);
const modalScreen = ref(null);
const modalPlaylist = ref(null);
const modalEditScreen = ref(null);
const modalChangeTemplate = ref(null);
// SCREEN VAR
const screenIP = ref('');
const screenName = ref('');
const screenLocation = ref('');
const screenTemplate = ref('');
const screenPlaylist = ref([]);
const loadPlaylist = ref(true)
const selectedDate = ref([])
//NOTIF MODAL VAR
let modalHeader = '';
let modalContent = '';
const isOpen = ref(false);
const closeNotif = () => {
    isOpen.value = false;
    const router = useRouter()
    router.go()
}
const openNotif = (header, content) => {
    modalHeader = header;
    modalContent = content;
    isOpen.value = true;
}

const isDropdownOpen = ref([]);
const toggleDropDown = (idx) => {
    isDropdownOpen.value[idx] = !isDropdownOpen.value[idx];
}
const isDataExist = (pl_id) => {
    return screenPlaylist.value.some(playlist => playlist.pl_id === pl_id)
}
const datePlaylist = (pl_id) => {
    const playlist = screenPlaylist.value.find(playlist => playlist.pl_id === pl_id)
    if (playlist) {
        // Parse the date string in ddmmyy format to yyyy-mm-dd format
        const formattedDate = parseDate(playlist.date);
        return formattedDate;
    }
    return null;

}
const parseDate = (dateString) => {
    // Convert ddmmyy string to yyyy-mm-dd format
    const day = dateString.substring(0, 2);
    const month = dateString.substring(2, 4);
    const year = '20' + dateString.substring(4, 6); // Assuming years are in 2000s
    return `${year}-${month}-${day}`;
}
const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = String(dateObject.getFullYear()).substring(2);
    return `${day}${month}${year}`;
}
const listClient = ref(await getCLient())
const statusText = (sc_ip) => {
    return listClient.value.some(client => client.socket_ip === sc_ip) ? "Online" : "Offline";
};
const statusClass = (sc_ip) => {
    return listClient.value.some(client => client.socket_ip === sc_ip) ? "text-green-400" : "text-red-400";
};
const host = 'http://localhost:3000';
const socket = io(host, {
    path: '/api/socket.io',
});
onMounted(async () => {
    isDropdownOpen.value.push(false);

    socket.on('connect', () => {
        socket.emit('clientType', "server")
    })
    socket.on('userConnect', async (response) => {
        listClient.value = await getCLient()
        console.log('User Connected: ', response)
        const clientsWithSameIP = listClient.value.filter(client => client.socket_ip === response.ip);
        console.log(clientsWithSameIP)
        if (clientsWithSameIP.length === 1) {
            router.go();
        }
    })
    socket.on('userDisconnect', async (response) => {
        console.log('User Disconnected: ', response)
        listClient.value = await getCLient()
        const isExistingClient = listClient.value.some(client => client.socket_ip === response.ip)
        if (!isExistingClient) {
            router.go()
        }
    })
    socket.on('resDataPlaylist', (response) => {
        screenPlaylist.value = response.data;
        for (let i = 0; i < listPlaylist.value.length; i++) {
            selectedDate.value[listPlaylist.value[i].pl_id] = datePlaylist(listPlaylist.value[i].pl_id)
        }
        loadPlaylist.value = false
    })

})
const toggleSelectPlaylist = (pl_id, date) => {
    const playlist = {
        pl_id: pl_id,
        date: formatDate(date)
    }
    if (screenPlaylist.value.some(pl => pl.pl_id === pl_id)) {
        screenPlaylist.value = screenPlaylist.value.filter(pl => pl.pl_id !== pl_id)
    } else {
        screenPlaylist.value.push(playlist)
    }
}
const uploadPlaylistFile = () => {
    alert(screenPlaylist.value)

}
const changeTemplate = () => {
    socket.emit('changeTemplate', { template: screenTemplate.value, ip: currentScreen.value.sc_ip })
}
const toggleModal = (modal, screen) => {
    modal.classList.toggle('hidden');
    if (modalScreen.value.classList.contains('hidden')) {
        currentScreen.value = null;
        screenName.value = "";
        screenLocation.value = "";
        screenIP.value = "";
    }
    else {
        currentScreen.value = screen;
    }
}
const toggleModalEdit = (modal) => {
    modal.classList.toggle('hidden');
    if (!modalPlaylist.value.classList.contains('hidden')) {
        socket.emit('reqDataPlaylist', { ip: currentScreen.value.sc_ip })
        loadPlaylist.value = true
    }
    screenName.value = currentScreen.value.sc_name;
    screenLocation.value = currentScreen.value.sc_location;
    screenIP.value = currentScreen.value.sc_ip;
}
const editScreen = async () => {
    const data = {
        sc_id: currentScreen.value.sc_id,
        sc_name: screenName.value,
        sc_location: screenLocation.value,
        sc_ip: screenIP.value
    }
    updateScreen(data).then((res) => {
        openNotif('Success', res);
    }).catch((err) => {
        openNotif('Error', err);
    })

}
const addNewScreen = async () => {
    const data = {
        sc_name: screenName.value,
        sc_location: screenLocation.value,
        sc_ip: screenIP.value
    }
    console.log(data)
    createScreen(data).then((res) => {
        openNotif('Success', "Berhasil Menambah Screen Baru");
    }).catch((err) => {
        openNotif('Error', err);
    })
}

</script>