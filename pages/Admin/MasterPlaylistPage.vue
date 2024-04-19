<template>
    <div class="">
        <div class="bg-cyan-700 h-svh w-full p-2 flex space-x-3">
            <div class="flex flex-col h-full w-[20%] bg-white rounded-xl p-2 space-y-2">
                <Navbar />
            </div>
            <div class="h-full w-[80%] bg-white rounded-xl p-2 flex-col">
                <div class="flex justify-between items-center">
                    <div class="text-Primary font-bold text-2xl">Daftar Playlist Pengumuman</div>
                    <div class="flex items-center">
                        <div class="relative">
                            <input type="text" placeholder="Search..."
                                class="block w-full py-2 pl-10 pr-4 leading-tight bg-white border border-gray-300 rounded focus:outline-none focus:bg-white focus:border-gray-500">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 15l5 5M10 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                                </svg>
                            </div>
                        </div>
                        <img src="/public/icon-add.png" alt="" @click="toggleModal(modalAddPlaylist)"
                            class="w-[40px] cursor-pointer hover:bg-slate-300 hover:duration-300 rounded-lg">
                    </div>
                </div>
                <div class="border-b-2 border-Primary mt-1"></div>
                <div class="max-h-[95%] overflow-auto h-full flex-col p-1 space-y-1">
                    <!-- List Playlist -->
                    <div
                        class="h-[170px] w-full rounded shadow-xl hover:bg-slate-50 flex items-center justify-between space-x-3">
                        <div class="flex items-center space-x-3">
                            <div class="w-[170px] h-[170px] bg-PrimaryContainer rounded-l"></div>
                            <div class="font-bold text-lg m-1">Pengumuman Wisuda</div>
                        </div>
                        <div class="flex items-center space-x-3">
                            <div class="relative">
                                <select
                                    class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                    <option value="" disabled selected>Pilih Monitor</option>
                                    <option value="1">Monitor Gedung B</option>
                                    <option value="2">Monitor Gedung U</option>
                                    <option value="3">Monitor Gedung L</option>
                                    <option value="4">Monitor Gedung E</option>
                                </select>
                                <div
                                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20">
                                        <path d="M10 12l-6-6 1.41-1.41L10 9.17l4.59-4.58L16 6z" />
                                    </svg>
                                </div>
                            </div>
                            <div
                                class="relative w-14 h-8 rounded-full p-1 border-OnPrimaryContainer border-2 flex items-center bg-slate-200">
                                <input type="checkbox" @click="toggle"
                                    class="absolute w-6 h-6 rounded-full appearance-none cursor-pointer bg-white border-none checked:right-0 checked:left-6 transition-transform duration-1000 checked:bg-green-400">
                            </div>
                            <img src="/icon-edit.png" aria-label="Edit Playlist" @click="toggleModal(modalPlaylist)"
                                class="cursor-pointer rounded hover:shadow-inner w-11 bg-transparent">
                            <img src="/icon-delete.png"
                                class="cursor-pointer rounded hover:shadow-2xl w-14 hover:bg-red-300 hover:duration-1000 bg-transparent">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div ref="modalPlaylist"
            class="hidden overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
            <div class="p-4 w-full max-w-6xl h-5/6 relative bg-white rounded-lg shadow sm:p-5 overflow-auto">
                <div class="flex gap-1 justify-between items-center pb-4 mb-4 rounded-t border-b">
                    <h3 class="text-lg font-semibold text-OnPrimaryContainer">
                        Daftar List Pengumuman
                    </h3>
                    <svg @click="toggleModal(modalPlaylist)" xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 hover:cursor-pointer hover:bg-Primary hover:duration-500 hover:rounded-lg"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <div class="flex flex-col space-y-2">
                    <div>
                        <div @click="toggleDropDown(0)"
                            class="h-[150px] w-full rounded shadow-xl hover:bg-slate-50 flex items-center justify-between space-x-3 cursor-pointer">
                            <div class="flex items-center space-x-3">
                                <div class="w-[150px] h-[150px] bg-PrimaryContainer rounded-l"></div>
                                <div class="flex-col">
                                    <div class="font-bold text-lg m-1">Pengumuman Pertama</div>
                                    <div class="text-base mx-1">Diposting : BAU</div>
                                    <div class="text-base mx-1">Kategori : Pengumuman Kampus</div>
                                    <div class="text-base mx-1">22 Maret 2024 | 10:55 WIB</div>
                                    <div class="text-base mx-1">Durasi : 00 Menit 58 Detik</div>
                                </div>
                            </div>
                            <div class="flex items-center space-x-3">
                                <img src="/icon-delete.png"
                                    class="cursor-pointer rounded hover:shadow-2xl w-14 hover:bg-red-300 hover:duration-1000 bg-transparent">
                            </div>
                        </div>
                        <div class="bg-white shadow-lg rounded w-[100%] duration-1000 overflow-hidden transition-all"
                            :class="{ 'max-h-screen': isDropdownOpen[0], 'max-h-0': !isDropdownOpen[0] }">
                            <ul class="py-1">
                                <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between">
                                    <div>1. Pengumuman Tempat Duduk</div>
                                    <div>
                                        <div>Tipe : Gambar</div>
                                        <div>Durasi : 40 Detik</div>
                                    </div>
                                </li>
                                <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between">
                                    <div>2. Daftar Acara</div>
                                    <div>
                                        <div>Tipe : Video</div>
                                        <div>Durasi : 18 Detik</div>
                                    </div>
                                </li>
                            </ul>

                        </div>
                    </div>
                    <div
                        class="w-full flex items-center justify-center bg-cyan-950 hover:duration-500 hover:bg-OnPrimaryContainer rounded-md cursor-pointer">
                        <img src="/icon-add.png" alt="" class="h-10">
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
const listPlaylist = ref([]);
const playlist = ref([]);
const modalPlaylist = ref(null);
const modalAddPlaylist = ref(null);
const isDropdownOpen = ref([]);
onMounted(() => {
    isDropdownOpen.value.push(false);

})
const toggleModal = (modal) => {
    modal.classList.toggle('hidden');
}
const toggleDropDown = (idx) => {
    isDropdownOpen.value[idx] = !isDropdownOpen.value[idx];
}  
</script>