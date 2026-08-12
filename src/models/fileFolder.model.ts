import mongoose, { Schema } from "mongoose";
import type { IfileFolder } from "../interfaces/fileFolder.interface.js";


const fileFolderSchema = new Schema<IfileFolder>({
    fileCode: {
        type: String,
        required: true
    },
    folderCode: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
);

export const FileFolder = mongoose.model<IfileFolder>("FileFolder", fileFolderSchema);