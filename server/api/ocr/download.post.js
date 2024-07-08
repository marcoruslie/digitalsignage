import fs from 'fs'
import path from 'path'
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    try{

        let fileUrl = `https://drive.google.com/uc?id=${body.url}&export=download`;
        if(body.url.includes('http')){
            fileUrl = body.url
        }
        const response = await fetch(fileUrl);
        const contentType = response.headers.get('content-type');
        const extension = contentType ? contentType.split('/')[1] : '';
        
        const fileName = `${path.basename(body.url).replace(/\?.+/, '')}.${extension}`;
        
        const currentDir = process.cwd();
        const directory = path.join(currentDir, 'resources', body.type, body.typeId);
        // Create the directory if it doesn't exist
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }
        // Save the image to the specified directory
        const filePath = path.join(directory, fileName);
        
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        fs.writeFileSync(filePath, buffer);
        return {
            statusCode: 200,
            body: {
                message: 'File downloaded successfully',
                filePath: filePath,
            },
        };
    }catch(error){
        return {
            statusCode: 500,
            body: {
              message: "Failed to download file",
              error: error.message,
            },
          };
    }
});
