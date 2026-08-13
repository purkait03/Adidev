import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import type { Request, Response } from "express";
import { generateCode } from "../utils/codeGeneration.js";
import { Folder } from "../models/folder.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponce } from "../utils/ApiResponce.js";

const createFolder = asyncHandler(async (req: Request, res: Response) => {
    const {name, description} = req.body
    if(!name){
        throw new ApiError(401, "Name of the folder is required")
    }

    const code = await generateCode(Folder)
    if(!code){
        throw new ApiError(500, "Code not generated")
    }

    let avatarURL: string = ''
    if(req.file?.buffer){
        const avatar = await uploadOnCloudinary(req.file?.buffer)
        avatarURL = avatar?.url || ''
    }

    const folder = await Folder.create({
        code,
        name,
        description: description || '',
        avatar: avatarURL
    })

    if(!folder){
        throw new ApiError(500, "Something went wrong while creating folder")
    }

    return res
    .status(200)
    .json(
        new ApiResponce(200, folder, "Folder successfully created")
    )
})

const getFolders = asyncHandler(async (req: Request, res: Response) =>{
    
})







export{
    createFolder
}