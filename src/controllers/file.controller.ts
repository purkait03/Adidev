import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import type { Request, Response } from "express";
import { createFileService } from "../services/file.service.js";


const createFile = asyncHandler( async (req: Request, res: Response) => {
    const {name, description} = req.body
    const folderCode = req.params?.code as string
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




export {
    createFile
}