import Tesseract from 'tesseract.js'
import fs from 'fs'
export default defineEventHandler(async (event) => {
    const worker = await Tesseract.createWorker();
    const imageBuffer = fs.readFileSync("C:/Users/ASUS/Documents/TA/TEMP/poster.jpeg");
    const { data: { text } } = await worker.recognize(imageBuffer);
    
    await worker.terminate();
    return text;
})

