import type { Request, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";
import type { MyCustomPayload } from "../interfaces/jwtCustomPayload.interface.js";


const jwtSecret = process.env.TOKEN
if(!jwtSecret){
    throw new ApiError(500, "TOKEN_SECRET is not defined")
}

export const verifyJWT = async (req: Request, _: unknown, next: NextFunction): Promise<void> => {
    try{
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")

        if(!token){
            throw new ApiError(401, "Unauthorized request")
        }
        const decodedToken = jwt.verify(token, jwtSecret) as MyCustomPayload
        const admin = await Admin.findOne({code: decodedToken.code}).select("-otp")

        if(!admin){
            throw new ApiError(401, "invalid  Token")
        }

        req.admin = admin
        next()

    }catch (error){
        let err = error as Error
        throw new ApiError(401, err?.message || "Invalid Token")
    }
}