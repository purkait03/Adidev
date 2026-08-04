import mongoose, {Schema} from "mongoose";
import type { IfilePage } from "../interfaces/filePage.interface.js";


const filePageSchema = new Schema<IfilePage>({
    fileCode:{
        type:String,
        required:true
    },
    pageCode:{
        type:String,
        required:true
    }
});

export const FilePage = mongoose.model<IfilePage>("FilePage",filePageSchema);