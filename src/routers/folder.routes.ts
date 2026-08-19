import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import {
    createFolder,
    getPrivateFolders,
    getPublicFolders,
    upadateFolder,
    updateFolderAvatar,
    toggleFolderState
} from "../controllers/folder.controller.js";



const router = Router()

// Public routes
router.route("/public").get(getPublicFolders)

// Private routes
router.route("/create").post(verifyJWT, isAdmin, createFolder)
router.route("/private").get(verifyJWT, getPrivateFolders)
router.route("/update/:code").patch(verifyJWT, upadateFolder)
router.route("/update/avatar/:code").patch(verifyJWT, updateFolderAvatar)
router.route("/toggle/:code").patch(verifyJWT, toggleFolderState)

export default router