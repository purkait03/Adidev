import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import type { Request, Response } from "express";
import { createFileService, getFilesService, updateFileService, moveFileService } from "../services/file.service.js";


const createFile = asyncHandler( async (req: Request, res: Response) => {
    const {name, description} = req.body
    const folderCode = req.params?.folderCode as string
    const {file, fileFolder} = await createFileService(folderCode, {name, description})

    return res
    .status(200)
    .json(
        new ApiResponce(
            200,
            {file, fileFolder},
            "File created successfully"
        )
    )
})

const getFiles = asyncHandler( async (req: Request, res: Response) => {
    const files = await getFilesService(req.params.folderCode as string)

    return res
    .status(200)
    .json(
        new ApiResponce(
            200,
            files,
            "All files fetched successfully"
        )
    )
})

const updateFile = asyncHandler( async ( req: Request, res: Response) => {
    const file = await updateFileService(req.params.fileCode as string, req.body)

    return res
    .status(200)
    .json(
        new ApiResponce(
            200,
            file,
            "File updated successfully"
        )
    )
})

const moveFile = asyncHandler( async ( req: Request, res: Response) => {
    const newFileFolder = await moveFileService(req.query.fileCode as string, req.query.folderCode as string)

    return res
    .status(200)
    .json(
        new ApiResponce(
            200,
            newFileFolder,
            "The file has moved successfully"
        )
    )
})

const deleteFile = asyncHandler( async (req: Request, res: Response) => {
    
})

export {
    createFile,
    getFiles,
    updateFile,
    moveFile
}