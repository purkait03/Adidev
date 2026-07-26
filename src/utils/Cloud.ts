import { R2 } from 'node-cloudflare-r2';

const r2 = new R2({
    accountId: process.env.R2_ACCOUNT_ID!,
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
});

const bucket = r2.bucket('<BUCKET_NAME>');

const uploadOnCloud = async (localfilepath:string,file:string)=>{
    try {
        const bucketExists = await bucket.exists();
        if (!bucketExists) return;
    
        const upload = await bucket.uploadFile(localfilepath, file);
    
        return upload;
    } catch (error) {
        console.log("Error:",error);
        return null;
    }
}

export {uploadOnCloud}

