import mongoose, {Schema} from "mongoose";
import type { IfileFolder } from "../interfaces/fileFolder.interface.js";


const fileFolderSchema = new Schema<IfileFolder>({
    fileId:{
        type:String,
        required:true
    },
    folderId:{
        type:String,
        required:true
    }
});

export const FileFolder = mongoose.model<IfileFolder>("FileFolder",fileFolderSchema);