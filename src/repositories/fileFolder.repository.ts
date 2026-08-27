import { FileFolder } from "../models/fileFolder.model.js"



const createFileFolderRepo = async (fileCode: string, folderCode: string) => {
    return await FileFolder.create({fileCode, folderCode})
}

const getFileFolderRepo = async (folderCode: string) => {
    return await FileFolder.find({folderCode: folderCode})
}

const getFilesOfAFolderRepo = async (folderCode: string) => {
    return await FileFolder.aggregate([
        {
            $match: { folderCode: folderCode }
        },

        {
            $lookup: {
                from: "files",
                localField: "fileCode",
                foreignField: "code",
                as: "fileDetails"
            }
        },
        {$unwind: "$fileDetails"},

        {
            $group: {
                _id: "$folderCode",
                totalFiles: {$sum: 1},
                allFiles: {$push: "$fileDetails"}
            }
        },

        {
            $project: {
                _id: 0,
                folderCode: "$_id",
                totalFiles: 1,
                allFiles: 1
            }
        }
    ])
}

export {
    createFileFolderRepo,
    getFileFolderRepo,
    getFilesOfAFolderRepo
}