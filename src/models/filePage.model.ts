import mongoose, {Schema} from "mongoose";
import type { IfilePage } from "../interfaces/filePage.interface.js";


const filePageSchema = new Schema<IfilePage>({
    fileId:{
        type:String,
        required:true
    },
    pageId:{
        type:String,
        required:true
    }
});

export const FilePage = mongoose.model<IfilePage>("FilePage",filePageSchema);