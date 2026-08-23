import { FileFolder } from "../models/fileFolder.model.js"



const createFileFolderRepo = async (fileCode: string, folderCode: string) => {
    return await FileFolder.create({fileCode, folderCode})
}

const getFileFolderRepo = async (folderCode: string) => {
    return await FileFolder.find({folderCode: folderCode})
}

export {
    createFileFolderRepo,
    getFileFolderRepo
}