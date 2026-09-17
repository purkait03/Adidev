import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";
import type { MyCustomPayload } from "../interfaces/jwtCustomPayload.interface.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import dotenv from 'dotenv'

dotenv.config()

const jwtSecret = process.env.TOKEN_SECRET
if(!jwtSecret){
    throw new ApiError(500, "TOKEN_SECRET is not defined")
}

export const verifyJWT = asyncHandler( async (req: Request, _: Response, next: NextFunction): Promise<void> => {
    try{
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")

        if(!token){
            throw new ApiError(401, "Unauthorized access")
        }
        const decodedToken = jwt.verify(token, jwtSecret) as MyCustomPayload
        const admin = await Admin.findOne({email: decodedToken.email});

        if(!admin){
            throw new ApiError(401, "invalid  Token")
        }

        req.admin = admin
        next()
        
    }catch (error){
        let err = error as Error
        throw new ApiError(401, err?.message || "Unauthorized access")
    }
})