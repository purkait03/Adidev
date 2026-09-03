import type { ICreateFolder, Ifolder } from "../interfaces/folder.interface.js"
import { ApiError } from "../utils/ApiError.js"
import { generateCode } from "../utils/codeGeneration.js"
import { Folder } from "../models/folder.model.js"
import { uploadOnCloudinary } from "../utils/Cloudinary.js"
import { 
    countDocumentFolderRepository, 
    createFolderRepository, 
    findByCodeFolderRepo, 
    findPrivateFolders, 
    findPublicFolders, 
    upatdeFolderRepo, 
    updateAvatarRepo
} from "../repositories/folder.repository.js"

const createFolderService = async (data: ICreateFolder) => {
    const {
        name,
        description,
        avatarBuffer,
        isPrivate
    } = data

    if(!name || isPrivate === undefined){
        throw new ApiError(400, "Name or State of the folder is required")
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

const getFoldersService = async (pageAsString: string, isPrivate: boolean) => {
    const page = parseInt(pageAsString, 10) || 1
    const limit = 20
    const skip = (page - 1) * limit

    const [folders, totalFolders] = await Promise.all([
        isPrivate ? findPrivateFolders({skip, limit}) : findPublicFolders({skip, limit}),
        countDocumentFolderRepository(isPrivate)
    ])

    return {
                page,
                limit,
                totalFolders,
                totalPages: Math.ceil(totalFolders / limit),
                folders
            }
}

const updateFolderService = async (code: string, data: Omit<ICreateFolder, "isPrivate">) => {
    const {name, description} = data

    if(!name){
        throw new ApiError(401, "Name is required")
    }
    if(!code){
        throw new ApiError(401, "Folder code is required")
    }

    const updatedFolder = await upatdeFolderRepo(code, {name, description})
    if(!updatedFolder){
        throw new ApiError(500, "Somthing went wrong while updating folder")
    }

    return updatedFolder
}

const updateAvatarService = async (code: string, data: Pick<ICreateFolder, "avatarBuffer">) => {
    const {avatarBuffer} = data
    if(!avatarBuffer){
        throw new ApiError(401, "Avatar is required")
    }
    if(!code){
        throw new ApiError(401, "Folder code is required")
    }

    let avatarURL = ''
    const avatar = await uploadOnCloudinary(avatarBuffer)
    avatarURL = avatar?.url || ''

    const updatedAvatar = await updateAvatarRepo(code, avatarURL)
    if(!updatedAvatar){
        throw new ApiError(500, "Somthing went wrong while updating folder avatar")
    }

    return updatedAvatar
}

const toggleisPrivateService = async (code: string) => {
    if(!code){
        throw new ApiError(401, "Folder code is required")
    }
    const folder = await findByCodeFolderRepo(code)
    if(!folder){
        throw new ApiError(404, "Folder not found")
    }
    folder.isPrivate = !folder?.isPrivate
    const updatedFolder = await folder.save()

    if(!updatedFolder){
        throw new ApiError(502, "Something went wrong while updating folder state")
    }

    return {isPrivate: updatedFolder.isPrivate}
}



export{
    createFolderService,
    getFoldersService,
    updateFolderService,
    updateAvatarService,
    toggleisPrivateService
}