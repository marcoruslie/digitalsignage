<template>
    <div class="rounded w-full h-[65vh] bg-Primary flex flex-col">
        <div class="bg-black bg-opacity-40 h-full">
            <div class="h-[90%] w-full flex justify-center items-center text-4xl text-white">
                <div class="flex flex-col h-full w-1/3 overflow-hidden shadow-lg">
                    <!-- Weather UI -->
                    <div
                        class="h-1/2 bg-gradient-to-br from-OnPrimaryContainer to-Primary flex flex-col items-center justify-center text-base text-center">
                        Informasi Cuaca dan Jam
                    </div>
                    <!-- Reminder -->
                    <div class="h-1/2 bg-black flex flex-col justify-center items-center bg-opacity-60">
                        <div class="text-white p-1 text-base">Reminder</div>
                    </div>
                </div>

                <div class="flex h-full justify-center items-center w-2/3 bg-black bg-opacity-10">
                    CONTENT
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
const { currentItem1 = "" } = defineProps(["currentItem1"])
</script>