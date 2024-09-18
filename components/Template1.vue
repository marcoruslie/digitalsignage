<template>
    <div class="rounded w-full h-[65vh] bg-Primary flex flex-col">
        <div class="bg-black bg-opacity-40 h-full">
            <div class="h-[90%] w-full flex justify-center items-center text-4xl text-white">
                <div id="item" class="h-full w-full" v-if="currentItem1 != null">
                    {{ currentItem1 }}
                </div>
                <div id="noitem" v-else>CONTENT 1</div>
            </div>
            <div class="bg-OnPrimaryContainer h-[10%] flex">
                <div class="flex items-center justify-center w-full">
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