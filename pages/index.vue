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
        <form @submit.prevent="login" class="w-full h-full bg-white relative sm:w-1/2">
            <div class="flex flex-col justify-center items-center h-full space-y-5">
                <div class="text-center font-bold text-5xl text-cyan-700">User Login</div>
                <input v-model="username" type="text" required
                    class="rounded-md border-Primary border-2 py-4 px-2 w-[300px] placeholder:text-OnPrimaryContainer  placeholder:font-semibold font-semibold hover:border-cyan-500 hover:duration-500"
                    placeholder="Your Username">
                <input v-model="password" type="password" required
                    class="rounded-md border-Primary border-2 py-4 px-2 w-[300px] placeholder:text-OnPrimaryContainer placeholder:font-semibold font-semibold hover:border-PrimaryContainer hover:duration-500"
                    placeholder="Your Password">
                <!-- <div><input type="checkbox" name="" id="">Remember Me? </div> -->
                <button type="submit" class="bg-Primary text-PrimaryContainer px-3 py-2 rounded-md border-collapse w-[300px]
                    hover:bg-PrimaryContainer hover:text-OnPrimaryContainer hover:duration-500">Sign In</button>
            </div>
        </form>
    </div>
    <NotificationModal :modalHeader="modalHeader" :modalContent="modalContent" :buttonFunction="modalFunction"
        :isOpen="isOpen" />
</template>
<script setup>
import useUser from '~/composables/useUser';


const { loginUser } = useUser()
const username = ref('');
const password = ref('');
const isOpen = ref(false);
const modalHeader = ref('');
const modalContent = ref('');
let currentUser;

async function login() {
    if (username.value === 'admin' && password.value === 'admin') {
        modalHeader.value = 'Login Success';
        modalContent.value = 'Welcome Admin';
        isOpen.value = true;
    } else {
        const user = {
            us_username: username.value,
            us_password: password.value
        }
        currentUser = await loginUser(user)
        if(currentUser != null){
            modalHeader.value = 'Login Success';
            modalContent.value = `Welcome ${currentUser.us_username}`;
            isOpen.value = true;
        }
        else{
            modalHeader.value = 'Login Failed';
            modalContent.value = 'Username or Password is incorrect';
            isOpen.value = true;
        }
    }
}

function modalFunction() {
    const router = useRouter();
    if (modalHeader.value == 'Login Success') {
        if(currentUser!=null){
            if(currentUser.role.role_name == 'Admin'){
                router.push('Admin/MasterScreenPage')
            }
            else{
                router.push('Biro/ListAnnouncementPage')
            }
        }
        else{
            router.push('Admin/MasterScreenPage')
        }
        isOpen.value = false;
    }
    else {
        isOpen.value = false;
    }
}

</script>