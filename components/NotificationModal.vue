<template>
    <div v-if="isOpen"
        class="overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50 duration-500">
        <div class="p-4 w-1/4 max-w-6xl h-3/6/6 relative bg-white rounded-lg shadow sm:p-5 flex flex-col space-y-2">
            <div class="flex justify-between items-center pb-4 rounded-t border-b">
                <h3 class="text-lg font-semibold text-OnPrimaryContainer">
                    {{modalHeader}}
                </h3>
            </div>
            <div class="flex-col flex-grow space-y-2 overflow-auto">
                <div class="flex flex-wrap space-y-2 text-OnPrimaryContainer">
                    <div>{{modalContent}}</div>
                </div>
            </div>
            <div @click="closeModal"
                class="rounded bg-Primary text-center cursor-pointer px-6 py-2 text-OnPrimary hover:bg-PrimaryContainer hover:text-OnPrimaryContainer hover:duration-300">
                OKE</div>
        </div>
    </div>
</template>
<script setup>
const { modalHeader, modalContent, closeModal, isOpen } = defineProps(['modalHeader', 'modalContent', 'closeModal', 'isOpen']);
</script>