import {v2 as cloudinary, type UploadApiResponse, type UploadApiErrorResponse} from "cloudinary"


if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  throw new Error("Cloudinary environment variables are missing");
}

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (fileBuffer: Buffer): Promise<UploadApiResponse> => {
    return new Promise((resolve, rejects)=> {
        const uploadStream = cloudinary.uploader.upload_stream(
            {resource_type: "auto"},
            (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                if(error) return rejects(new Error(`Cloudinary buffer upload failed: ${error.message}`))
                if(!result) return rejects(new Error('Cloudinary buffer upload failed: Empty result response'))
                
                resolve(result)
            }
        )
        uploadStream.end(fileBuffer)
    })
}

export {uploadOnCloudinary}