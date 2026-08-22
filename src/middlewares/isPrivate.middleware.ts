import type { Request, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";
import type { MyCustomPayload } from "../interfaces/jwtCustomPayload.interface.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { findByCodeFolderRepo } from "../repositories/folder.repository.js";


const jwtSecret = process.env.TOKEN
if (!jwtSecret) {
    throw new ApiError(500, "TOKEN_SECRET is not defined")
}

export const isPrivate = asyncHandler(async (req: Request, _: unknown, next: NextFunction): Promise<void> => {
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
            const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")

            if (!token) {
                throw new ApiError(401, "Unauthorized access")
            }
            const decodedToken = jwt.verify(token, jwtSecret) as MyCustomPayload
            const admin = await Admin.findOne({ code: decodedToken.code }).select("-otp")

            if (!admin) {
                throw new ApiError(401, "invalid  Token")
            }

            req.admin = admin
            next()
        }else{
            next()
        }



    } catch (error) {
        let err = error as Error
        throw new ApiError(401, err?.message || "Unauthorized access")
    }
})