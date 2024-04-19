<template>
    <div class="text-cyan-700 font-extrabold text-center text-3xl">Biro Panel</div>
    <div class="w-full border-b border-Primary my-2"></div>
    <div class="flex flex-grow flex-col justify-end">
        <NuxtLink to="/Biro/ListAnnouncementPage"
            class="flex w-full h-[35px] bg-gradient-to-br from-cyan-700 to-slate-900 rounded-sm items-center justify-center text-cyan-50 hover:duration-1000  hover:bg-gradient-to-br hover:to-cyan-400 hover:from-slate-500 hover:cursor-pointer mt-2"
            active-class="bg-gradient-to-br from-cyan-200 to-slate-700">
            List Pengumuman</NuxtLink>
        <NuxtLink to="/Biro/EditAnnouncementPage"
            class="flex w-full h-[35px] bg-gradient-to-br from-cyan-700 to-slate-900 rounded-sm items-center justify-center text-cyan-50 hover:duration-1000  hover:bg-gradient-to-br hover:to-cyan-400 hover:from-slate-500 hover:cursor-pointer mt-2"
            active-class="bg-gradient-to-br from-cyan-200 to-slate-700">
            Edit Pengumuman</NuxtLink>
        <!-- LOGOUT BUTTON -->
        <div
            class="flex w-full h-[35px] bg-gradient-to-br from-red-700 to-slate-800 rounded-md items-center justify-center text-cyan-50 hover:duration-1000  hover:bg-gradient-to-br hover:to-red-400 hover:from-slate-500 hover:cursor-pointer mt-auto">
            Logout
        </div>
    </div>
</template>

<script setup>

</script>