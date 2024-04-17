<template>
    <div v-if="modalPengumuman"
        class="overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
        <div class="p-4 w-full max-w-6xl h-5/6 relative bg-white rounded-lg shadow sm:p-5 overflow-auto">
            <div class="flex gap-1 justify-between items-center pb-4 mb-4 rounded-t border-b">
                <h3 class="text-lg font-semibold text-OnPrimaryContainer">
                    Daftar Pengumuman
                </h3>
                <svg @click="closeModal" xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 hover:cursor-pointer hover:bg-Primary hover:duration-500 hover:rounded-lg"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <div class="flex flex-col space-y-2 items-center">
                <img :src="imageUrl" alt="" class="w-2/5">
            </div>
        </div>
    </div>
</template>
<script setup>
const { modalPengumuman, imageUrl,closeModal } = defineProps(['modalPengumuman','imageUrl','closeModal']);


</script>