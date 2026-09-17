import { FilePage } from "../models/filePage.model.js"

const deleteFilePagesRepo = async (fileCode: string) => {
    return await FilePage.deleteMany({fileCode})
}

export {
    deleteFilePagesRepo
}