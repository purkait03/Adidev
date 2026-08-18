import type { Ifolder, ICreateFolder } from "../interfaces/folder.interface.js";
import { Folder } from "../models/folder.model.js";


export const createFolderRepository = async (data: Ifolder) => {
    return await Folder.create(data)
}

export const findPublicFolders = async (data: any) => {
    const {skip, limit} = data
    return await Folder.find({isPrivate: false}).sort({createdAt: -1}).skip(skip).limit(limit)
}
export const findPrivateFolders = async (data: any) => {
    const {skip, limit} = data
    return await Folder.find({isPrivate: true}).sort({createdAt: -1}).skip(skip).limit(limit)
}

export const countDocumentFolderRepository = async (isPrivate: boolean) => {
    return await Folder.countDocuments({isPrivate})
}

export const upatdeFolderRepo = async (code: string, data: Omit<ICreateFolder, "isPrivate">) => {
    return await Folder.findOneAndUpdate(
        {code}, 
        {
            $set:{
                name: data.name,
                description: data.description
            }
        },
        {new: true}
    )
}

export const updateAvatarRepo = async (code: string, avatar: string) => {
    return await Folder.findOneAndUpdate(
        {code},
        {
            $set:{
                avatar
            }
        },
        {new: true}
    ).select("avatar")
}

export const findByCodeFolderRepo = async (code: string) => {
    return await Folder.findOne({code})
}