<template>
	<div
		v-if="modalDetail"
		class="overflow-x-hidden flex fixed top-0 right-0 left-0 z-10 justify-center items-center h-screen bg-black bg-opacity-50">
		<div class="flex flex-col p-4 w-full max-w-6xl h-5/6 relative bg-white rounded-lg shadow sm:p-5 overflow-auto">
			<div class="flex gap-1 justify-between items-center pb-4 mb-4 rounded-t border-b">
				<h3 class="text-lg font-semibold text-OnPrimaryContainer">Detail Pengumuman</h3>
				<svg
					@click="closeModal"
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 hover:cursor-pointer hover:bg-Primary hover:duration-500 hover:rounded-lg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12" />
				</svg>
			</div>
			<div class="flex-col flex w-full rounded border shadow-lg p-2">
				<div class="font-bold">{{ dataContent.title }}</div>
				<div class="flex justify-between">
					<div>Kategori: {{ dataContent.category.name }}</div>
					<div>Type: {{ dataContent.kontenType }}</div>
				</div>
			</div>
			<div class="flex flex-grow space-y-2 items-center justify-center w-full">
				<img
					v-if="dataContent.kontenType === 'image' && dataContent.previewUrl"
					:src="dataContent.previewUrl"
					alt=""
					class="w-2/5" />
				<video
					v-else-if="dataContent.kontenType === 'video'"
					class="w-3/5"
					controls
					:src="dataContent.previewUrl">
					Your browser does not support the video tag.
				</video>
			</div>
			{{ dataContent.previewUrl }}
			<button
				@click="saveContent"
				class="w-full border py-2 bg-Primary text-OnPrimary hover:text-OnPrimaryContainer hover:bg-PrimaryContainer rounded duration-300">
				Simpan
			</button>
		</div>
	</div>
</template>
<script setup>
	const { modalDetail, dataContent, closeModal, saveContent } = defineProps([
		"modalDetail",
		"dataContent",
		"closeModal",
		"saveContent",
	])
</script>
