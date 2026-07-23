import mongoose, {Schema} from "mongoose";
import type { IfilePage } from "../interfaces/filePage.interface.js";


const filePageSchema = new Schema<IfilePage>({
    fileId:{
        type: Schema.Types.ObjectId,
        ref:"File"
    },
    pageId:{
        type: Schema.Types.ObjectId,
        ref:"Page"
    }
});

export const FilePage = mongoose.model<IfilePage>("FilePage",filePageSchema);