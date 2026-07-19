import mongoose, { Schema } from "mongoose";
import type { Ifile } from "../interfaces/file.interface.ts";

// interface Ifile {
//     name: string;
//     description?: string;
//     createdAt: Date;
//     updatedAt: Date
// }

const fileSchema = new Schema<Ifile>({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },

    description: {
        type: String,
        trim: true
    }
},

    {
        timestamps: true
    }
)

const File = mongoose.model<Ifile>("File", fileSchema)