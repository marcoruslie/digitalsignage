<template>
    <div class="rounded w-[50%] h-[65vh] bg-Primary flex flex-col">
        <div class="bg-black bg-opacity-40 h-full">
            <div class="h-[30%] w-full flex justify-center items-center text-white">
                <div class="h-full w-1/2 bg-black bg-opacity-60 flex justify-center items-center text-center">
                    Informasi
                    Cuaca dan Jam</div>
                <div class="h-full w-1/2 bg-black bg-opacity-30 flex justify-center items-center">
                    Reminder</div>
            </div>
            <div class="h-[64%] flex justify-center items-center text-4xl text-white">
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