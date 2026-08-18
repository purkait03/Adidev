import type { Request, NextFunction } from "express";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Admin } from "../models/admin.model.js";
import { ApiError } from "../utils/ApiError.js";


export const isAdmin = asyncHandler(async (req: Request, _: unknown, next: NextFunction) => {
    const email = req.admin?.email
    if(!email){
        throw new ApiError(401, "Invalid access")
    }
    const admin = await Admin.findOne({email})

    if(email !== admin?.email){
        throw new ApiError(401, "Access forbident")
    }

    next()
})