import { File } from "../models/file.model.js";
import type { Ifile } from "../interfaces/file.interface.js";


const createFileRepo = async (fileData: Ifile) => {
    return await File.create(fileData)
}

const deleteFileRepo = async (fileCode: string) => {
    return await File.deleteOne({code: fileCode})
}

const findAndUpdateFileRepo = async (fileCode: string, data: any) => {
    return await File.findOneAndUpdate(
        {code: fileCode},
        {
            $set:{
                name: data.name,
                description: data.description ? data.description : ''
            }
        },
        {new: true}
    )
}

export {
    createFileRepo,
    deleteFileRepo,
    findAndUpdateFileRepo
}