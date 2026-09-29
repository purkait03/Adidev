import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createFile, getFiles, updateFile, moveFile, deleteFile } from "../controllers/file.controller.js";
import { isPrivate } from "../middlewares/isPrivate.middleware.js";


const router = Router()


router.route("/create/:folderCode").post(verifyJWT, createFile)
router.route("/get/:folderCode").get(isPrivate, getFiles)
router.route("/update/:fileCode").post(verifyJWT, updateFile)
router.route("/update/:fileCode").post(verifyJWT, updateFile)
router.route("/move").get(verifyJWT, moveFile)  // Needs query parameters, fileCode and folderCode
router.route("/delete/:fileCode").delete(verifyJWT, deleteFile)

export default router