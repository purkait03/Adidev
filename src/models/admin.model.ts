import mongoose, {Schema} from "mongoose";
import type { Iadmin } from "../interfaces/admin.interface.ts";
import jwt from "jsonwebtoken"

const adminSchema = new Schema<Iadmin>({
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


adminSchema.methods.generateToken = function (): string {

    // if(!process.env.TOKEN_SECRET){
    //     throw new ApiError(400, "TOKEN_SECRET is not defined")
    // }

    return jwt.sign(
        {
            _id: this._id,
            fullName: this.fullName,
            email: this.email
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: process.env.TOKEN_EXPIRY
        }
    )
}


export const Admin = mongoose.model<Iadmin>("Admin", adminSchema)