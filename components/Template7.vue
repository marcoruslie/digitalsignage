<template>
    <div class="rounded w-[50%] h-[65vh] bg-Primary flex flex-col">
        <div class="bg-black bg-opacity-40 h-full">
            <div class="h-[47%] flex justify-center items-center text-white">
                <div class="w-1/2 h-full bg-black bg-opacity-30 flex justify-center items-center">
                    CONTENT 1</div>
                <div class="w-1/2 h-full bg-black bg-opacity-60 flex justify-center items-center">
                    CONTENT 2</div>
            </div>
            <div class="h-[47%] flex justify-center items-center text-4xl text-white">
                <div class="flex items-center justify-center w-3/5">
                    CONTENT 3
                </div>
                <div class="flex items-center bg-black bg-opacity-10 h-full justify-center w-2/5 text-xl text-center">
                    Informasi Cuaca dan Jam
                </div>
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
const { currentItem1 = "", currentItem2 = "", currentItem3 = "" } = defineProps(["currentItem1", "currentItem2", "currentItem3"])
</script>