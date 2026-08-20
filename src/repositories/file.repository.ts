import { File } from "../models/file.model.js";
import type { Ifile } from "../interfaces/file.interface.js";


const createFileRepo = async (fileData: Ifile) => {
    return await File.create(fileData)
}

const deleteFileRepo = async (fileCode: string) => {
    return await File.deleteOne({code: fileCode})
}

export {
    createFileRepo,
    deleteFileRepo
}