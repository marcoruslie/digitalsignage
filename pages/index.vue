<template>
    <div class="flex h-[100vh]">
        <div class="w-1/2 h-full bg-PrimaryContainer"></div>
        <div class="w-1/2 h-full bg-Primary"></div>
    </div>
    <div class="absolute m-auto top-0 bottom-0 right-0 left-0 w-[60vw] h-[80vh] flex rounded-3xl overflow-hidden
    shadow-2xl">
        <div class="w-1/2 h-full bg-Primary hidden sm:block">
            <div class="flex flex-col justify-center items-center w-[100%] h-[100%] space-y-10">
                <img src="/LogoISTTS.png" class="w-[200px] h-[200px]" alt="">
                <div class="text-center font-bold text-3xl text-white mb-16">ISTTS Digital Signage</div>
            </div>
        </div>
        <div class="w-full h-full bg-white relative sm:w-1/2">
            <div class="flex flex-col justify-center items-center h-full">
                <div class="text-center font-bold text-5xl text-cyan-700 mb-16">User Login</div>
                <input v-model="username" type="text" class="rounded-md border-cyan-100 border-2 py-4 px-2 w-[300px] placeholder:text-OnPrimaryContainer  placeholder:font-semibold font-semibold my-2 hover:border-cyan-500 hover:duration-500" placeholder="Your Username">
                <input v-model="password" type="password" class="rounded-md border-cyan-100 border-2 py-4 px-2 w-[300px] placeholder:text-OnPrimaryContainer placeholder:font-semibold font-semibold mt-2 hover:border-cyan-500 hover:duration-500" placeholder="Your Password">
                <!-- <div><input type="checkbox" name="" id="">Remember Me? </div> -->
                <button @click="login" class="bg-cyan-100 px-3 py-1 rounded-md border-collapse border-cyan-700 border-2 w-[300px]
                    hover:bg-cyan-300 hover:duration-500">Sign In</button>
            </div>
        </div>

    </div>
</template>
<script setup>
const username = ref('');
const password = ref('');
console.log(process.env.WS_TOKEN)
function login() {
    const router = useRouter();
    if(username.value==='admin' && password.value==='admin') {
        router.push('Admin/MasterScreenPage')
    } else {
        router.push('Biro/AnnouncementPage')
    }
}

</script>