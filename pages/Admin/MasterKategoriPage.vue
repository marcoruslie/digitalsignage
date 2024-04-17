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
                    <img src="/public/icon-add.png" alt="" onclick="alert('clicked')"
                        class="w-[40px] cursor-pointer hover:bg-slate-300 hover:duration-300 rounded-lg">
                </div>
            </div>
            <div class="border-b-2 border-Primary mt-1"></div>
            <div class="flex">
                <div class="flex-1 font-semibold border-b border-gray-300 py-2 px-4">Nama Kategori</div>
                <div class="flex-1 font-semibold border-b border-gray-300 py-2 px-4">Hak Akses</div>
                <div class="flex-1 font-semibold border-b border-gray-300 py-2 px-4">Total Pengumuman</div>
            </div>
            <div class="flex flex-col flex-grow overflow-auto">
                <!-- Sample row -->
                <div class="flex" v-for="n in 10">
                    <div class="flex-1 border-b border-gray-300 py-2 px-4">Lowongan Pekerjaan</div>
                    <div class="flex-1 border-b border-gray-300 py-2 px-4 flex-col">
                        <div>Badan Eksekutif Mahasiswa</div>
                        <div>Badan Administrasi Keuangan</div>
                        <div>Badan Administrasi Kemahasiswaan</div>
                    </div>
                    <div class="flex-1 border-b border-gray-300 py-2 px-4">300</div>
                </div>
            </div>
        </div>
    </div>

    

</template>

<script setup>

</script>