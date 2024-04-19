<template>

    <div class="bg-cyan-700 h-svh w-full p-2 flex space-x-3">
        <div class="flex flex-col h-full w-[20%] bg-white rounded-xl p-2 space-y-2">
            <NavbarBiro />
        </div>
        <div class="h-full w-[80%] bg-white rounded-xl p-2 flex-col overflow-auto">
            <div class="flex justify-between items-center">
                <div class="text-Primary font-bold text-2xl">Daftar List Pengumuman</div>
                <div class="flex">
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
                    <img src="/public/icon-add.png" alt=""
                        class="w-[40px] cursor-pointer hover:bg-slate-300 hover:duration-300 rounded-lg"
                        @click="toggleModal(modalAddListPengumuman)">
                </div>
            </div>
            <div class="border-b-2 border-Primary mt-1"></div>
            <div class="flex-grow flex-col p-1 space-y-1">
                <!-- List Playlist -->
                <div v-for="(data, index) in dataPengumuman" @click="openModalQr(data.pengumuman_namafile)"
                    class="h-[100px] w-full rounded shadow-xl hover:bg-slate-50 flex items-center justify-between space-x-3">
                    <div class="flex items-center space-x-3">
                        <!-- <div class="w-[100px] h-[100px] bg-PrimaryContainer rounded-l">
                                <img :src="data.pengumuman_namafile" alt="">
                            </div> -->
                        <div class="font-bold text-lg m-1">{{ data.pengumuman_judul }}</div>
                    </div>

                </div>
            </div>
        </div>

    </div>

    <div ref="modalAddListPengumuman"
        class="hidden overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
        <div
            class="p-4 w-3/4 max-w-6xl h-[calc(100vh-20px)] relative bg-white rounded-lg shadow sm:p-5 flex flex-col space-y-2">
            <div class="flex justify-between items-center pb-4 rounded-t border-b">
                <h3 class="text-lg font-semibold text-OnPrimaryContainer">
                    Tambah List Pengumuman
                </h3>
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
                        <input v-model="listName" type="text"
                            class="border-2 border-gray-500 hover:border-Primary rounded-md hover:duration-300 px-2 py-2">
                    </div>
                    <select v-model="kategori" name="" id="">
                        <option value="">Pilih Kategori Pengumuman</option>
                        <option value="lowongan magang">Lowongan Magang</option>
                        <option value="lowongan kerja">Lowongan Kerja</option>
                        <option value="pengumuman kegiatan">Pengumuman Kegiatan</option>
                        <option value="pengumuman kampus">Pengumuman Kampus</option>
                        <option value="iklan">Iklan</option>
                    </select>
                </div>
                <div class="max-h-full">
                    <div v-if="kategori == 'pengumuman kampus'" v-for="(data, index) in dataPengumuman"
                        class="h-[100px] w-full rounded shadow-xl hover:bg-slate-50 flex items-center justify-between space-x-3">
                        <div class="flex items-center space-x-3" @click="">
                            <div class="font-bold text-lg m-1">{{ data.pengumuman_judul }}</div>
                        </div>
                    </div>
                    <div v-if="kategori.includes('lowongan')" v-for="(data, index) in filteredLowongan"
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
                                        <div>Start : {{ data.lowongan_entried }} Deadline : {{ data.lowongan_deadline }}
                                        </div>
                                    </div>
                                    <div class="w-full flex justify-center">
                                        
                                    </div>
                                    <div class="w-fit flex justify-end space-x-4">
                                        <button class="rounded bg-Primary text-OnPrimary text-center px-3 py-1" 
                                            @click="openModalLowongan(data)">
                                            Detail
                                        </button>
                                        <div
                                            class="relative w-14 h-8 rounded-full p-1 border-OnPrimaryContainer border-2 flex items-center bg-slate-200">
                                            <input type="checkbox" @click="toggle"
                                                class="absolute w-6 h-6 rounded-full appearance-none cursor-pointer bg-white border-none checked:right-0 checked:left-6 transition-transform duration-1000 checked:bg-green-400">
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="kategori == 'pengumuman kegiatan'" v-for="(data, index) in dataLaporanBAK"
                        class="h-[100px] w-full rounded shadow-xl hover:bg-slate-50 flex items-center justify-between space-x-3">
                        <div class="flex items-center space-x-3" @click="">
                            <div>{{ index }}</div>
                            <div class="font-bold text-lg m-1">{{ data.keg_nama }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div @click=""
                class="rounded bg-Primary text-center cursor-pointer px-6 py-2 text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer hover:duration-300">
                Simpan</div>
        </div>
    </div>
    <ModalShowPengumuman :modalPengumuman="isModalPengumumanOpen" :imageUrl="imageUrl" :closeModal="closeModal" />


</template>

<script setup>

const { getLaporanBAK, getPengumuman, getLowongan } = useDataISTTS();
const { createPlaylist, deletePlaylist, getPlaylist } = usePlaylist();
const isModalPengumumanOpen = ref(false)
const modalAddListPengumuman = ref(null)

const [pengumumanRes, lowonganRes, laporanBAKRes] = await Promise.all([getPengumuman(), getLowongan(), getLaporanBAK()])
const dataPengumuman = pengumumanRes.response
const dataLowongan = lowonganRes.response
const dataLaporanBAK = laporanBAKRes.response

const listName = ref('')
const kategori = ref('')

const imageUrl = ref('');
const toggleModal = (modal) => {
    modal.classList.toggle('hidden')
}
const openModalQr = (pdfUrl) => {
    isModalPengumumanOpen.value = !isModalPengumumanOpen.value
    convertPDFtoQrCode(pdfUrl)
}
const openModalLowongan = (data) => {
    isModalPengumumanOpen.value = !isModalPengumumanOpen.value
    imageUrl.value = data.link
}
const closeModal = () => {
    isModalPengumumanOpen.value = !isModalPengumumanOpen.value
}
const filteredLowongan = computed(() => {
    if (kategori.value == "lowongan magang") {
        return dataLowongan.filter((item) => item.lowongan_judul == "Lowongan Magang")
    }
    else {
        return dataLowongan.filter((item) => item.lowongan_judul == "Lowongan Kerja")
    }
})
const convertPDFtoQrCode = (pdfUrl) => {
    imageUrl.value = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${pdfUrl}`;
}

</script>