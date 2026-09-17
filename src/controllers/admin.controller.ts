import adminService from "../services/admin.service.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import type { Request, Response } from "express";
import { generateuniqueCode } from "../utils/generateUniqueCode.js";
import { SendMail } from "../utils/nodeMailer.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { ApiError } from "../utils/ApiError.js";

const loginAdmin = asyncHandler(async (req: Request, res: Response) => {
    const {email} = req.body;

    adminService.validateField([email]);

    await adminService.existedUser(email);

    await adminService.alreadyLoggedIn(email);

    const code = generateuniqueCode();

    await SendMail(email,code);

    const admin = await adminService.saveCode(code,email);

    return res
    .status(200)
    .json(
        new ApiResponce(
            200,
            admin,
            "Admin logged In successfully"
        )
    )
    
})

const createAdmin = asyncHandler(async(req: Request, res: Response) => {
    const {fullName, email} = req.body;

    adminService.validateField([fullName,email]);

    await adminService.checkUSerExistence(email);

    const adminCode = await adminService.generateAdminCode();

    const admin = await adminService.createAdmin(email, fullName, adminCode);

    return res
    .status(201)
    .json(
        new ApiResponce(
            201,
            admin,
            "Admin created successfully"
        )
    )
});

const emailVerification =asyncHandler( async (req: Request, res: Response) => {
    const {code} = req.body;
    const email = req.query.email as string;

    adminService.validateField([code]);

    await adminService.checkCode(code, email);

    await adminService.checkExpiry(email);

    const token = await adminService.generateToken(email);

    await adminService.setIsloggedINTrue(email);

    const admin = await adminService.adminData(email); 
    
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("token", token, options)
    .json(
        new ApiResponce(
            200,
            admin,
            "Email verified successfully"
        )
    )
});

const logout =asyncHandler( async (req: Request, res: Response) => {
    const email = req.admin?.email

    if (!email) {
        throw new ApiError(401, "Unauthorized Request");
    }

    const admin = await adminService.setIsloggedINfalse(email);
    
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("token",options)
    .json(new ApiResponce(200,{isLoggedIn:admin?.isLoggedIn},"User Logout SuccessFully!"))
});

export {loginAdmin, createAdmin, emailVerification, logout};