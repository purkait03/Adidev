import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import type { Request, Response } from "express";
import { generateCode } from "../utils/codeGeneration.js";
import { Folder } from "../models/folder.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { createFolderService, getFoldersService, updateAvatarService, updateFolderService, toggleisPrivateService } from "../services/folder.service.js";

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

const getPublicFolders = asyncHandler(async (req: Request, res: Response) => {
    
    const data = await getFoldersService(req.query.page as string, false)

    return res
    .status(200)
    .json(
        new ApiResponce(
            200, 
            data ,
            "All public folders fetched")
    )
})

const getPrivateFolders = asyncHandler(async (req: Request, res: Response) => {
    const data = await getFoldersService(req.query.page as string, true)

    return res
    .status(200)
    .json(
        new ApiResponce(
            200, 
            data ,
            "All private folders fetched")
    )
})

const upadateFolder = asyncHandler(async (req: Request, res: Response) => {
    const {name, description} = req.body
    const updatedFolder = await updateFolderService(req.params.folderCode as string, {name, description})

    return res
    .status(200)
    .json(
        new ApiResponce(200, updatedFolder, "Folder updated successfully")
    )
})

const updateFolderAvatar = asyncHandler(async (req: Request, res: Response) => {
    const avatar = await updateAvatarService(req.params.folderCode as string, {avatarBuffer: req.file?.buffer})

    return res
    .status(200)
    .json(
        new ApiResponce(200, avatar, "Avatar updated successfully")
    )
})

const toggleFolderState = asyncHandler(async (req: Request, res: Response) => {
    const {isPrivate} = await toggleisPrivateService(req.params.folderCode as string)

    return res
    .status(200)
    .json(
        new ApiResponce(
            200, 
            {isPrivate}, 
            `Folder state is toggled to ${isPrivate? "public" : "private"} successfully`
        )
    )
})


export{
    createFolder,
    getPublicFolders,
    getPrivateFolders,
    upadateFolder,
    updateFolderAvatar,
    toggleFolderState
}