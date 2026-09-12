import type { ClientSession } from "mongoose"
import { Page } from "../models/page.model.js"

const bulkDeletePageRepo = async (batchIds : string[], session: ClientSession) => {
    return await Page.deleteMany({code: { $in: batchIds }}, {session})
}

export {
    bulkDeletePageRepo
}