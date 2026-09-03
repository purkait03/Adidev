import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { findByCodeFolderRepo } from "../repositories/folder.repository.js";
import { verifyJWT } from "./auth.middleware.js";




export const isPrivate = asyncHandler(async (req: Request, _: Response, next: NextFunction): Promise<void> => {
    try {
        const folderCode = req.params.code as string
        if (!folderCode) {
            throw new ApiError(400, "Parameter is missing")
        }

        const folder = await findByCodeFolderRepo(folderCode)
        if (!folder) {
            throw new ApiError(404, "Folder not found")
        }

        if (folder.isPrivate) {
            await verifyJWT(req, _, next)
        }else{
            next()
        }



    } catch (error) {
        let err = error as Error
        throw new ApiError(401, err?.message || "Unauthorized access")
    }
})