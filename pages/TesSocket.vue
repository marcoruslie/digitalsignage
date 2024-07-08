<template>
    <div class="flex flex-col space-y-4">
        <input v-model="message" type="text">
        <div>
            <select v-model="clientId">
                <option value="">Select IP</option>
                <option v-for="client in clientList" :value="client.socket_id">{{ client.socket_ip }}</option>
            </select>
        </div>
        <div class="flex space-x-4">
            <button @click="btnMessage"
                class="bg-Primary text-OnPrimary rounded py-2 px-4 hover:bg-PrimaryContainer hover:text-OnPrimaryContainer">
                SEND MESSAGE
            </button>
            <button @click="btnGetClient"
                class="bg-Primary text-OnPrimary rounded py-2 px-4 hover:bg-PrimaryContainer hover:text-OnPrimaryContainer">
                GET CLIENT
            </button>
            <button @click="refreshConnectedClient"
                class="bg-Primary text-OnPrimary rounded py-2 px-4 hover:bg-PrimaryContainer hover:text-OnPrimaryContainer">
                REFRESH CHILD
            </button>
            <textarea v-model="resultSocket" id="" cols="30" rows="10"></textarea>
        </div>
    </div>

</template>

<script setup>
const host = 'http://localhost:3000';
const socket = io(host, {
    path: '/api/socket.io',
});
socket.on('tes', (response) => {
    console.log(response);
})
socket.on('userConnect', (response) => {
    alert(response.message + " - IP:" + response.ip + "SIZE:" + response.size)
})
socket.on('userDisconnect', (response) => {
    alert(response.message + " - IP:" + response.ip + "SIZE:" + response.size)
})
const btnGetClientData = async () => {
    socket.emit('getClientData', (response) => {
        console.log(response);
    })
}
const resultSocket = ref('')
const message = ref('')
const clientList = ref(await getCLient())
const clientId = ref('')
const btnMessage = async () => {
    console.log(await sendMessage(message.value, clientId.value))
}
const btnGetClient = async () => {
    console.log(await getCLient())
}
const sendFile = () => {
    console.log('send file')
}
</script>