import { Admin } from "../models/admin.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { verifyJWT } from "./auth.middleware.js";
import type { Request, Response, NextFunction } from "express";

export const adminCreationGuard = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const count = await Admin.countDocuments();

    if (count === 0) {
        return next();
    }

    await verifyJWT(req, res, next); 
});