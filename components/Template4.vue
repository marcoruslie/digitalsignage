<template>
    <div class="rounded w-full h-[65vh] bg-Primary flex flex-col">
        <div class="bg-black bg-opacity-40 h-full">
            <div class="h-[90%] w-full flex justify-center items-center text-4xl text-white">
                <div class="flex justify-center items-center h-full w-1/2">
                    CONTENT 1
                </div>

                <div class="flex h-full justify-center items-center w-1/2 bg-black bg-opacity-10">
                    CONTENT 2
                </div>
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
const { currentItem1 = "", currentItem2 = "" } = defineProps(["currentItem1", "currentItem2"])
</script>