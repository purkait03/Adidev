import { adminSchema } from "../models/admin.model.js";
import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js";
import type { SignOptions } from "jsonwebtoken";
import type { Iadmin } from "../interfaces/admin.interface.js";
import type { IAdminMethods } from "../interfaces/admin.interface.js";
import {Schema, Model} from "mongoose"

export const addTokenMethod = (adminSchema: Schema<Iadmin, Model<Iadmin>, IAdminMethods>) => {
    adminSchema.methods.generateToken = function (): string {

        if (!process.env.TOKEN_SECRET || !process.env.TOKEN_EXPIRY) {
            throw new ApiError(400, "TOKEN_SECRET is not defined")
        }

        return jwt.sign(
            {
                id: this.code,
                fullName: this.fullName,
                email: this.email
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn: process.env.TOKEN_EXPIRY as NonNullable<SignOptions["expiresIn"]>
            }
        )
    }
}
