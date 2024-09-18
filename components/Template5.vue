<template>
	<div class="rounded w-[50%] h-[65vh] bg-Primary flex flex-col">
		<div class="bg-black bg-opacity-40 h-full">
			<div class="h-[94%] bg-black bg-opacity-30 flex justify-center items-center text-4xl text-white">
				CONTENT 1
			</div>
			<div class="bg-OnPrimaryContainer h-[6%] flex">
				<div class="flex items-center w-full justify-center">
					<div class="text-PrimaryContainer">Digital Signage ISTTS</div>
					<img src="/LogoISTTS.png" alt="" class="h-[30px]" />
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
const { currentItem1 = "" } = defineProps(["currentItem1"]);
</script>