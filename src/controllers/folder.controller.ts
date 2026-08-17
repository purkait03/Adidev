import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import type { Request, Response } from "express";
import { generateCode } from "../utils/codeGeneration.js";
import { Folder } from "../models/folder.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { createFolderService } from "../services/folder.service.js";

const createFolder = asyncHandler(async (req: Request, res: Response) => {
    const {name, description, isPrivate} = req.body
    
    const folder = await createFolderService({
    name,
    description,
    avatarBuffer: req.file?.buffer,
    isPrivate
});

    return res
    .status(200)
    .json(
        new ApiResponce(200, folder, "Folder successfully created")
    )
})

const getFolders = asyncHandler(async (req: Request, res: Response) =>{
    const page = parseInt(req.query.page as string, 10) || 1
    const limit = 20
    const skip = (page - 1)*limit

    const [folders, totalFolders] = await Promise.all([
        Folder.find().sort({createdAt: -1}).skip(skip).limit(limit),
        Folder.countDocuments()
    ])


    return res
    .status(200)
    .json(
        new ApiResponce(
            200, 
            {
                page,
                limit,
                totalFolders,
                totalPages: Math.ceil(totalFolders / limit),
                folders
            } ,
            "All folders fetched")
    )
})







export{
    createFolder,
    getFolders
}