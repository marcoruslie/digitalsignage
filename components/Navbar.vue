<template>
    <div class="text-cyan-700 font-extrabold text-center text-3xl">Admin Panel</div>
    <div class="w-full border-b border-Primary my-2"></div>
    <div class="flex flex-grow flex-col justify-end">
        <NuxtLink to="/Admin/MasterScreenPage"
            class="flex w-full h-[35px] bg-gradient-to-br from-cyan-700 to-slate-900 rounded-sm items-center justify-center text-cyan-50 hover:duration-1000  hover:bg-gradient-to-br hover:to-cyan-400 hover:from-slate-500 hover:cursor-pointer mt-2"
            active-class="bg-gradient-to-br from-cyan-200 to-slate-700">
            Master Screen
        </NuxtLink>
        <NuxtLink to="/Admin/MasterPlaylistPage"
            class="flex w-full h-[35px] bg-gradient-to-br from-cyan-700 to-slate-900 rounded-sm items-center justify-center text-cyan-50 hover:duration-1000  hover:bg-gradient-to-br hover:to-cyan-400 hover:from-slate-500 hover:cursor-pointer mt-2"
            active-class="bg-gradient-to-br from-cyan-200 to-slate-700">
            Master Playlist
        </NuxtLink>
        <NuxtLink to="/Admin/MasterPengumumanPage"
            class="flex w-full h-[35px] bg-gradient-to-br from-cyan-700 to-slate-900 rounded-sm items-center justify-center text-cyan-50 hover:duration-1000  hover:bg-gradient-to-br hover:to-cyan-400 hover:from-slate-500 hover:cursor-pointer mt-2"
            active-class="bg-gradient-to-br from-cyan-200 to-slate-700">
            Master List Pengumuman
        </NuxtLink>
        <NuxtLink to="/Admin/MasterKategoriPage"
            class="flex w-full h-[35px] bg-gradient-to-br from-cyan-700 to-slate-900 rounded-sm items-center justify-center text-cyan-50 hover:duration-1000  hover:bg-gradient-to-br hover:to-cyan-400 hover:from-slate-500 hover:cursor-pointer mt-2" active-class="bg-gradient-to-br from-cyan-200 to-slate-700">
            Master Kategori
        </NuxtLink>
        <!-- <NuxtLink to="/Admin/MasterUserPage"
            class="flex w-full h-[35px] bg-gradient-to-br from-cyan-700 to-slate-900 rounded-sm items-center justify-center text-cyan-50 hover:duration-1000  hover:bg-gradient-to-br hover:to-cyan-400 hover:from-slate-500 hover:cursor-pointer mt-2" active-class="bg-gradient-to-br from-cyan-200 to-slate-700">
            Master User
        </NuxtLink> -->
        <!-- LOGOUT BUTTON -->
        <div class="w-full border-b border-Primary my-2"></div>
        <div
            class="flex w-full h-[35px] bg-gradient-to-br from-red-700 to-slate-700 rounded-md items-center justify-center text-cyan-50 hover:duration-1000  hover:bg-gradient-to-br hover:to-red-400 hover:from-slate-500 hover:cursor-pointer mt-auto">
            Logout
        </div>
    </div>
</template>

<script setup>

</script>