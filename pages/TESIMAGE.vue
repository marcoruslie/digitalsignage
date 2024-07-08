<template>
    <div>
        HEIGHT : {{ imgSize.height }} <br>
        WIDTH : {{ imgSize.width }}
    </div>
input: <input type="text" v-model="imageUrl" />
<button @click="onFileChange">Get Image Size</button>

input FILE: <input type="file" @change="onFileChange" />
</template>
<script setup>
const imageUrl = ref('');
const imgSize = ref({ width: 0, height: 0 });
const onFileChange = async (event) => {
    alert(event.target.files[0])
    const result = await getImageSize(event.target.files!=null?URL.createObjectURL(event.target.files[0]):imageUrl.value);
    imgSize.value = { ...result };
};
function getImageSize(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = function () {
            resolve({ width: this.width, height: this.height });
        };
        img.onerror = function () {
            reject(new Error('Failed to load image'));
        };
    });
}
</script>
