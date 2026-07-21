import mongoose, {Schema} from "mongoose";
import type { Ipage } from "../interfaces/page.interface.js";


const pageSchema = new Schema<Ipage>({
    heading: {
        type: String,
        trim: true
    },
    content: {
        type: String,
        trim: true,
        required: true
    },
    pageNumber: {
        type: Number,
        required: true,
        index: true
    }
},
    {
        timestamps: true
    }
);

export const Page = mongoose.model<Ipage>("Page",pageSchema); 

