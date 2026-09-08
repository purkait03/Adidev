import type { ClientSession } from "mongoose"
import { FilePage } from "../models/filePage.model.js"

const deleteFilePagesRepo = async (fileCode: string, session: ClientSession) => {
    return await FilePage.deleteMany({fileCode}, {session})
}

const allPagesRepo = (fileCode: string, session: ClientSession) => {
    return FilePage.find({fileCode}, {projection: {pageCode : 1}}, {session}).cursor()
}

export {
    deleteFilePagesRepo,
    allPagesRepo
}