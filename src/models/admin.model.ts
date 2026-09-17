import mongoose, {Schema, Model} from "mongoose";
import type { Iadmin } from "../interfaces/admin.interface.js";
import { addTokenMethod } from "../utils/jwtTokenGeneration.js";

export const adminSchema = new Schema<Iadmin, Model<Iadmin>>({
    adminCode: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        index: true
    },
    code: {
        type: String
    },
    isLoggedIn:{
        type:Boolean
    }
},
{
    timestamps: true
})


addTokenMethod(adminSchema)


export const Admin = mongoose.model<Iadmin>("Admin", adminSchema)