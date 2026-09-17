import { ApiError } from "../utils/ApiError.js";
import type { ICreateFile } from "../interfaces/file.interface.js"
import { generateCode } from "../utils/codeGeneration.js";
import { File } from "../models/file.model.js";
import { createFileRepo, deleteFileRepo, findAndUpdateFileRepo } from "../repositories/file.repository.js";
import { createFileFolderRepo, getFilesOfAFolderRepo, deleteFileFolderRepo } from "../repositories/fileFolder.repository.js";
import { Folder } from "../models/folder.model.js";
import type { Iadmin } from "../interfaces/admin.interface.js";
import { deleteFilePagesRepo } from "../repositories/filePage.repository.js";


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

const updateFileService = async (fileCode: string, data:any) => {

    if(!fileCode){
        throw new ApiError(400, "File code is required in parameter")
    }

    if(!data.name){
        throw new ApiError(400, "Name is required")
    }
    const file = await findAndUpdateFileRepo(fileCode, data)

    if(!file){
        throw new ApiError(404, "Something went wrong while updating file")
    }

    return file
}

const moveFileService = async (fileCode: string, folderCode: string) => {

    if(!fileCode && !folderCode){
        throw new ApiError(400, "File code and Folder code is required as query")
    }

    const newMovedFileFolder = await createFileFolderRepo(fileCode, folderCode)

    if(!newMovedFileFolder){
        throw new ApiError(404, "Something went wrong while moving file")
    }

    const deletedFileFolder = await deleteFileFolderRepo(fileCode)
    if(!deletedFileFolder){
        throw new ApiError(404, "Something went wrong while moving file")
    }
    return newMovedFileFolder
}

const deleteFileService = async (fileCode: string) => {
    const [fileFolder, filepage, file] = await Promise.all([
        deleteFileFolderRepo(fileCode),
        deleteFilePagesRepo(fileCode),
        deleteFileRepo(fileCode)
    ])

}

export {
    createFileService,
    getFilesService,
    updateFileService,
    moveFileService
}