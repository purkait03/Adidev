import { Model } from "mongoose";

interface iCodable {
    code: string
}

export async function generateCode<T extends iCodable> (model: Model<T>): Promise<string> {
    const lastDoc = await model.findOne().sort({createdAt: -1}).select("code")

    if(!lastDoc) return "0001"

    let lastCode = Number(lastDoc.code)

    let newCode = ++lastCode

    return String(newCode).padStart(4, "0")
}