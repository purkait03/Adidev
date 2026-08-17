import type { Ifolder } from "../interfaces/folder.interface.js";
import { Folder } from "../models/folder.model.js";


export const createFolderRepository = async (data: Ifolder) => {
    return await Folder.create(data)
}