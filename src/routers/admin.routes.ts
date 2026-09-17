import { Router } from "express";
import { createAdmin, emailVerification, loginAdmin, logout } from "../controllers/admin.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { adminCreationGuard } from "../middlewares/adminCreationGuard.middleware.js";

const router = Router();

router.route("/createAdmin").post(adminCreationGuard,createAdmin);  
router.route("/login").post(loginAdmin);
router.route("/emailVerification").post(emailVerification); 
router.route("/logout").post(verifyJWT,logout);

export default router;