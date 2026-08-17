import type { ICreateFolder } from "../interfaces/folder.interface.js"
import { ApiError } from "../utils/ApiError.js"
import { generateCode } from "../utils/codeGeneration.js"
import { Folder } from "../models/folder.model.js"
import { uploadOnCloudinary } from "../utils/Cloudinary.js"
import { createFolderRepository } from "../repositories/folder.repository.js"

export const createFolderService = async (data: ICreateFolder) => {
    const {
        name,
        description,
        avatarBuffer,
        isPrivate
    } = data

    if(!name || isPrivate === undefined){
        throw new ApiError(401, "Name or State of the folder is required")
    }

    const code = await generateCode(Folder)
    if(!code){
        throw new ApiError(500, "Code not generated")
    }

    let avatarURL: string = ''
    if(avatarBuffer){
        const avatar = await uploadOnCloudinary(avatarBuffer)
        avatarURL = avatar?.url || ''
    }

    const folder = await createFolderRepository({
        code,
        name,
        description: description || "",
        avatar: avatarURL,
        isPrivate
    })

    if(!folder){
        throw new ApiError (500, "Something went wrong while creating folder")
    }

    return folder
}