import mongoose, { Schema } from "mongoose"
import type { Ifolder } from "../interfaces/folder.interface.ts"

// interface Ifolder {
//     name: string;
//     description?: string;
//     avatar?: string;
//     file: string;
//     createdAt?: Date,
//     updatedAt?: Date
// }

const folderSchema = new Schema<Ifolder>({
    code: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },

    description: {
        type: String,
        trim: true
    },
    avatar: {
        type: String,
    },

    isPrivate: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true
    }
)

export const Folder = mongoose.model<Ifolder>("Folder", folderSchema)