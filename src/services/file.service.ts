import { ApiError } from "../utils/ApiError.js";
import type { ICreateFile } from "../interfaces/file.interface.js"
import { generateCode } from "../utils/codeGeneration.js";
import { File } from "../models/file.model.js";
import { createFileRepo, deleteFileRepo } from "../repositories/file.repository.js";
import { createFileFolderRepo, getFilesOfAFolderRepo } from "../repositories/fileFolder.repository.js";
import { Folder } from "../models/folder.model.js";
import type { Iadmin } from "../interfaces/admin.interface.js";


const createFileService = async (folderCode: string, {name, description}: ICreateFile) => {
    if(!name){
        throw new ApiError(400, "Name is required")
    }
    if(!folderCode){
        throw new ApiError(400, "Folder code is required in parameter")
    }

    const code = await generateCode(File)
    if(!code){
        throw new ApiError(500, "Code not generated")
    }

    const file = await createFileRepo({code, name, description: description || ''})

    if(!file){
        throw new ApiError(500, "Something went wrong while creating file")
    }

    const fileFolder = await createFileFolderRepo(file.code, folderCode)
    if(!fileFolder){
        await deleteFileRepo(file.code)

        throw new ApiError(500, "Something went wrong while creating fileFolder")
    }

    return {file, fileFolder}
}

const getFilesService = async (folderCode: string) => {
    const files = await getFilesOfAFolderRepo(folderCode)
    let data = files[0] ? files[0] : {totalFiles: 0, allFiles: []}
    return data 
}

export {
    createFileService,
    getFilesService
}