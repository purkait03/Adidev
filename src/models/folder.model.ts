import mongoose, { Schema } from "mongoose"

interface Ifolder {
    name: string;
    description?: string;
    avatar?: string;
    file: string;
    createdAt?: Date,
    updatedAt?: Date
}

const folderSchema = new Schema<Ifolder>({
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
    file: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

export const Folder = mongoose.model<Ifolder>("Folder", folderSchema)