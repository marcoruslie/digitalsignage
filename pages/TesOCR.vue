<template>
    <div class="overflow-hidden">
        <input type="text" v-model="imageUrl" class="border-gray-400 border-2 rounded" placeholder="URL FILE"
            @focusout="onFileChange" />
        <input type="file" @change="onFileChange">
        <div>
            <p v-for="word in selectedWords" :key="word.text">{{ word.text }}</p>
        </div>
        <div v-if="loading" class="w-full h-1 bg-black text-center">
            {{ loadingProgress }}%
            <div class="h-full bg-green-600" :style="{ width: loadingProgress + '%' }">
            </div>
        </div>
        <img :src="imageUrl" alt="image" @load="onImageLoad" class="w-[50vw] h-[90vh] absolute overflow-hidden" />
        <div class="relative w-[50vw] h-[90vh] overflow-hidden bg-transparent" v-if="isImageLoaded" ref="containerRef">
            <div v-for="(word, index) in detectedWords" :key="index"
                class="absolute text-sm text-center bg-transparent"
                :style="{ left: word.bbox.left + '%', top: word.bbox.top + '%', width: word.bbox.width + '%', height: word.bbox.height + '%', backgroundColor: word.selected ? 'blue' : 'gray' ,fontSize: word.fontSize<=15?'15px':word.fontSize+'px'}">
                {{ word.text + ' ' + word.line}}
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import Tesseract from 'tesseract.js';
const containerRef = ref(null);
const imageUrl = ref('');
const isImageLoaded = ref(false);
const selectedWords = ref([]);
let detectedWords = [];
const loading = ref(false);
const loadingProgress = ref(0);

const onFileChange = (event) => {
    if (event.target.files == null) {
        performOCR();
    }
    else {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            imageUrl.value = e.target.result;
            performOCR();
        };
        reader.readAsDataURL(file);
    }
};

const onImageLoad = () => {
    isImageLoaded.value = true;
};

const performOCR = async () => {
    loading.value = true;
    const { data: { words } } = await Tesseract.recognize(
        imageUrl.value,
        'eng',
        {
            logger: m => {
                console.log(m)
                updateProgress(m.progress)
            }, preserve_interword_spaces: 1
        }
    );
    const imgSize = await getImageSize(imageUrl.value)
    const containerWidth = containerRef.value.offsetWidth;
    const containerHeight = containerRef.value.offsetHeight;
    const widthRatio = containerWidth / imgSize.width;
    const heightRatio = containerHeight / imgSize.height;
    detectedWords = words.map(word => ({
        text: word.text,
        bbox: {
            left: (word.bbox.x0 * widthRatio)/containerWidth * 100,
            top: (word.bbox.y0 * heightRatio)/containerHeight * 100,
            width: ((word.bbox.x1 - word.bbox.x0) * widthRatio)/containerWidth * 100,
            height: ((word.bbox.y1 - word.bbox.y0) * heightRatio)/containerHeight * 100+0.5 
        },
        fontSize:  Math.min(((word.bbox.x1 - word.bbox.x0) * widthRatio), ((word.bbox.y1 - word.bbox.y0) * heightRatio)),
        selected: false
    }));

    loading.value = false;
};

const updateProgress = (progress) => {
    loadingProgress.value = progress * 100;
    if (progress === 1) {
        onImageLoad();
    }
};
function getImageSize(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url
        img.onload = function () {
            resolve({ width: this.width, height: this.height });
        };
        img.onerror = function () {
            reject(new Error('Failed to load image'));
        };
    });
}
</script>

<style scoped>
/* Add any additional styling here */
</style>