<template>
    <div class="">
        <div class="bg-cyan-700 h-svh w-full p-2 flex space-x-3">
            <div class="flex flex-col h-full w-[20%] bg-white rounded-xl p-2 space-y-2">
                <Navbar />
            </div>
            <div class="h-full w-[80%] bg-white rounded-xl p-2">
                <div class="h-[60%] overflow-auto flex flex-col">
                    <div class="flex justify-between items-center">
                        <div class="text-Primary font-bold text-2xl">Daftar List Pengumuman</div>
                    </div>
                    <div class="border-b-2 border-Primary mt-1"></div>
                    <div class="flex-grow overflow-auto">
                        <div class="flex flex-col space-y-2 mt-1" @click="toggleModal(modalListPengumuman)">
                            <div
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
                        </div>
                    </div>
                </div>
                <div class="h-[40%]">
                    <div class="flex justify-between items-center">
                        <div class="text-Primary font-bold text-2xl">Setting Template List Pengumuman</div>
                    </div>
                    <div class="border-b-2 border-Primary mt-1"></div>
                    <div class="flex-col text-OnPrimaryContainer">
                        <div>Pilih Kategori : </div>
                        <div>Jumlah Maksimal Pengumuman : </div>
                        <div>Durasi Maksimal List Pengumuman : </div>
                        <button
                            class="rounded hover:bg-OnPrimaryContainer hover:text-Primary px-3 py-1 bg-Primary text-OnPrimary hover:duration-500">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div ref="modalListPengumuman"
        class="hidden overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
        <div class="p-4 w-full max-w-6xl h-5/6 relative bg-white rounded-lg shadow sm:p-5 overflow-auto">
            <div class="flex gap-1 justify-between items-center pb-4 mb-4 rounded-t border-b">
                <h3 class="text-lg font-semibold text-OnPrimaryContainer">
                    Daftar Pengumuman
                </h3>
                <svg @click="toggleModal(modalListPengumuman)" xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 hover:cursor-pointer hover:bg-Primary hover:duration-500 hover:rounded-lg"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <div class="flex flex-col space-y-2">
                <div>
                    <div
                        class="h-[350px] w-full rounded shadow-xl hover:bg-slate-50 flex items-center cursor-pointer">
                        <div class="w-[90%] flex justify-center">
                            <img src="/Monitor.png" alt="" class="h-[350px]">
                        </div>
                        
                        <div class="w-[10%]">
                            <img src="/icon-delete.png"
                                class="cursor-pointer rounded hover:shadow-2xl w-14 hover:bg-red-300 hover:duration-1000 bg-transparent">
                        </div>



                    </div>

                </div>
                <div
                    class="w-full flex items-center justify-center bg-cyan-950 hover:duration-500 hover:bg-OnPrimaryContainer rounded-md cursor-pointer">
                    <img src="/icon-add.png" alt="" class="h-10">
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>

const modalListPengumuman = ref(null)
const toggleModal = (modal) => {
    modal.classList.toggle('hidden')
}

</script>