<template>
  <div class="p-4 h-screen flex flex-col space-y-2">
    <!-- Input Section -->
    <div class="flex items-center space-x-2">
      <input
        type="text"
        class="border-gray-400 border rounded p-2"
        placeholder="URL FILE"
        @change="onUrlChange"
      />
      <input
        type="file"
        @change="onFileChange"
        class="border-gray-400 border rounded p-2"
      />
    </div>

    <div class="flex flex-grow">
      <div
        ref="canvasDivRef"
        class="w-[50%] h-full flex flex-col items-center overflow-auto"
      >
        <canvas ref="leftCanvasRef" class="border border-black rounded"></canvas>
      </div>
      <div class="w-[50%] h-full flex flex-col items-center overflow-auto">
        <canvas ref="rightCanvasRef" class="border border-black rounded"></canvas>
      </div>
    </div>
    
    <button @click="copySelectedText">Copy Selected Text</button>
    <button @click="pasteTextToLeftCanvas">Paste to Left Canvas</button>
  </div>
</template>
<script setup>
import { ref, nextTick } from 'vue';
import Tesseract from 'tesseract.js';

const leftCanvasRef = ref(null);
const rightCanvasRef = ref(null);
const canvasDivRef = ref(null);
let fabricCanvasLeft = null;
let fabricCanvasRight = null;
let imageScale = { x: 1, y: 1 }; // To store the scaling ratio
let copiedObjects = []; // Array to store selected objects for copying

// Handle file change
const onFileChange = async (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const imageUrl = event.target.result;
      await nextTick();
      await setupFabricCanvas(imageUrl);
      processOCR(imageUrl);
    };
    reader.readAsDataURL(file);
  }
};

// Setup Fabric.js canvases
const setupFabricCanvas = async (imageUrl) => {
  const { fabric } = await import('fabric');

  const containerWidth = canvasDivRef.value.clientWidth;
  const containerHeight = canvasDivRef.value.clientHeight;

  // Set up the left canvas (editable)
  fabricCanvasLeft = new fabric.Canvas(leftCanvasRef.value,
    { selection: true } // Enable multi-selection
  );
  fabricCanvasLeft.setWidth(containerWidth);
  fabricCanvasLeft.setHeight(containerHeight);

  // Set up the right canvas (preview with OCR result)
  fabricCanvasRight = new fabric.Canvas(rightCanvasRef.value, {
    selection: true, // Enable multi-selection
  });
  fabricCanvasRight.setWidth(containerWidth);
  fabricCanvasRight.setHeight(containerHeight);

  // Load the image into both canvases
  fabric.Image.fromURL(imageUrl, (img) => {
    const imgAspectRatio = img.width / img.height;
    const canvasAspectRatio = containerWidth / containerHeight;

    if (imgAspectRatio > canvasAspectRatio) {
      img.scaleToWidth(containerWidth);
      imageScale.x = containerWidth / img.width;
      imageScale.y = containerWidth / img.width; // Keep aspect ratio
    } else {
      img.scaleToHeight(containerHeight);
      imageScale.x = containerHeight / img.height;
      imageScale.y = containerHeight / img.height; // Keep aspect ratio
    }

  });
};

// Process OCR
const processOCR = async (src) => {
  const img = new Image();
  img.src = src;

  img.onload = async () => {
    const result = await Tesseract.recognize(img, 'eng', {
      logger: (m) => console.log(m),
    });

    const { words } = result.data;

    // Add the OCR result to the right canvas (with selectable text)
    words.forEach((word) => {
      const { bbox, text } = word;
      const left = bbox.x0 * imageScale.x;
      const top = bbox.y0 * imageScale.y;
      const width = (bbox.x1 - bbox.x0) * imageScale.x;
      const height = (bbox.y1 - bbox.y0) * imageScale.y;

      // Draw the text
      const textElement = new fabric.Text(text, {
        left: left,
        top: top,
        borderColor: 'black',
        cornerColor: 'black',
        fontSize: word.font_size - 6,
        fill: 'black',
        selectable: true,
        lockMovementX: true,
        lockMovementY: true,
        evented: false,
        controlable: false,
        backgroundColor: 'white',
      });
      fabricCanvasRight.add(textElement);
    });

    fabricCanvasRight.renderAll();  // Ensure the canvas renders after adding objects
  };
};

// Copy selected text from the right canvas
const copySelectedText = () => {
  copiedObjects = fabricCanvasRight.getActiveObjects();
};

// Paste copied text to the left canvas and change it to single text box
const pasteTextToLeftCanvas = () => {
    if (copiedObjects.length === 0) return;

    // Calculate the combined position and text
    let combinedText = '';
    let minLeft = Infinity;
    let minTop = Infinity;
    let leftBefore = 0;
    let topBefore = 0;
    copiedObjects.forEach((obj) => {
      const bbox = obj.getBoundingRect(); // Get bounding box of each text object
      console.log(bbox)
      minLeft = Math.min(minLeft, bbox.left);
      minTop = Math.min(minTop, bbox.top);

// index.vue?t=1725618140569:149 {left: -97.81641468682503, top: 5.109953203743685, width: 6.77001953125, height: 15.689999999999998}
// index.vue?t=1725618140569:149 {left: -86.74466042716581, top: 2.5872750179985635, width: 37.83544921875, height: 15.689999999999998}
// index.vue?t=1725618140569:149 {left: -49.885529157667364, top: 3.1478701703863683, width: 45.77001953125, height: 15.689999999999998}
// index.vue?t=1725618140569:149 {left: -1.5341972642188466, top: 4.969804415646734, width: 11.8291015625, height: 15.689999999999998}
// index.vue?t=1725618140569:149 {left: 11.219342452603826, top: 2.5872750179985635, width: 42.869140625, height: 15.689999999999998}
// index.vue?t=1725618140569:149 {left: 56.767698584113305, top: 2.867572594192466, width: 38.29248046875, height: 15.689999999999998}
// index.vue?t=1725618140569:149 {left: 95.58891288696907, top: 3.1478701703863683, width: 14, height: 15.689999999999998}
// index.vue?t=1725618140569:149 {left: -86.88480921526276, top: 16.321856251499867, width: 19.3251953125, height: 17.949999999999996}
// index.vue?t=1725618140569:149 {left: -67.82457403407726, top: 18.14379049676026, width: 58.7587890625, height: 17.949999999999996}
      if(topBefore == 0 && leftBefore == 0){
        combinedText += obj.text;
      }
      else if(difference(minLeft,bbox.left) < 12){
        combinedText += '\n' + obj.text;
      }
      else{
        combinedText += ' ' + obj.text;
      }
      leftBefore = bbox.left;
      topBefore = bbox.top;
      
      
    });
    console.log(combinedText)
    // Create a new Textbox with the combined text
    const combinedTextBox = new fabric.Textbox(combinedText, {
      left: 0,
      top: 0,
      fontSize: 12,
      fill: 'black',
      selectable: true, // Allow the combined text to be selected
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      width: fabricCanvasLeft.width-40, // Adjust width based on canvas size
    });

    // Add the new Textbox to the left canvas
    fabricCanvasLeft.add(combinedTextBox);
    fabricCanvasLeft.renderAll();
};
const difference = (a, b) => {
  if(a>b){
    return a-b;
  }
  else{
    return b-a;
  }
}
</script>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.canvas-container {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 20px 0;
}

.canvas-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.canvas-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.canvas {
  border: 1px solid black;
  width: 100%;
  height: 400px;
}
</style>