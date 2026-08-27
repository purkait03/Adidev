import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import type { Request, Response } from "express";
import { createFileService, getFilesService } from "../services/file.service.js";


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


export {
    createFile,
    getFiles
}