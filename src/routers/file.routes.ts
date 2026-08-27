import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createFile, getFiles } from "../controllers/file.controller.js";
import { isPrivate } from "../middlewares/isPrivate.middleware.js";


const router = Router()


router.route("/create/:folderCode").post(verifyJWT, createFile)
router.route("/get/:folderCode").post(verifyJWT, isPrivate, getFiles)

export default router