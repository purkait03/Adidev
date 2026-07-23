import mongoose, {Schema} from "mongoose";
import type { IfileFolder } from "../interfaces/fileFolder.interface.js";


const fileFolderSchema = new Schema<IfileFolder>({
    fileId:{
        type: Schema.Types.ObjectId,
        ref:"File"
    },
    folderId:{
        type: Schema.Types.ObjectId,
        ref:"Folder"
    }
});

export const FileFolder = mongoose.model<IfileFolder>("FileFolder",fileFolderSchema);