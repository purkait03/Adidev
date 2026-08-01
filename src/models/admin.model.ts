import mongoose, {Schema, Model} from "mongoose";
import type { Iadmin, IAdminMethods } from "../interfaces/admin.interface.js";
import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js";
import type { SignOptions } from "jsonwebtoken";
import { addTokenMethod } from "../utils/jwtTokenGeneration.js";

export const adminSchema = new Schema<Iadmin, Model<Iadmin>, IAdminMethods>({
    fullName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        index: true
    },
    otp: {
        type: String
    }
},
{
    timestamps: true
})


addTokenMethod(adminSchema)


export const Admin = mongoose.model<Iadmin>("Admin", adminSchema)