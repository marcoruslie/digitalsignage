<template>
	<div v-if="modalPengumuman"
		class="overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
		<div class="flex flex-col p-4 w-full max-w-6xl h-5/6 relative bg-white rounded-lg shadow sm:p-5 overflow-auto">
			<div class="flex gap-1 justify-between items-center pb-4 mb-4 rounded-t border-b">
				<h3 class="text-lg font-semibold text-OnPrimaryContainer">Detail Pengumuman</h3>
				<svg @click="closeModal" xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 hover:cursor-pointer hover:bg-Primary hover:duration-500 hover:rounded-lg"
					fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</div>
			<div class="flex flex-grow space-y-2 items-center justify-center">
				<img v-if="kontenType === 'image' && imageUrl" :src="imageUrl" alt="" class="w-3/5 h-full" />
				<video v-else-if="kontenType === 'video'" class="w-3/5" controls :src="imageUrl">
					Your browser does not support the video tag.
				</video>
			</div>
		</div>
	</div>
</template>
<script setup>
const { modalPengumuman, kontenType, imageUrl, closeModal } = defineProps([
	"modalPengumuman",
	"kontenType",
	"imageUrl",
	"closeModal",
])
</script>
