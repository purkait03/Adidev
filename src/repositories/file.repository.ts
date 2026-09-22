import { File } from "../models/file.model.js";
import type { Ifile } from "../interfaces/file.interface.js";
import type { ClientSession } from "mongoose";


const createFileRepo = async (fileData: Ifile, session: ClientSession) => {
    const [file] = await File.create([fileData], {session})
    return file
}

const deleteFileRepo = async (fileCode: string, session?: ClientSession) => {
    return await File.deleteOne({code: fileCode}, session ? {session} : {})
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

const deleteBulkFileRepo = async (batchIds: string[], session: ClientSession) => {
    return await File.deleteMany({code: {$in: batchIds}}, {session})
}

export {
    createFileRepo,
    deleteFileRepo,
    findAndUpdateFileRepo,
    deleteBulkFileRepo
}