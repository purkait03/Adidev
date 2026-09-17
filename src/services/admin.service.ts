import type { Iadmin } from "../interfaces/admin.interface.js";
import { Admin } from "../models/admin.model.js";
import adminRepository from "../repositories/admin.repositories.js";
import { ApiError } from "../utils/ApiError.js";
import { generateCode } from "../utils/codeGeneration.js";

const validateField = (fileds:string[]) => {
    const validate = fileds.every(field => typeof field === "string" && field.trim() !== "")

    if(!validate) throw new ApiError(400,"All required fields must be provided!");
}

const existedUser = async (email:string) => {
    const user =await adminRepository.existedUser(email);
    
    if(!user) throw new ApiError(404,"User not found!");
}

const checkUSerExistence = async (email:string) => {
    const user =await adminRepository.existedUser(email);
    
    if(user) throw new ApiError(409,"User with this email already exists!")
}

const createAdmin = async (email:string, fullName:string, adminCode:string) =>{
    const adminPayload = {
        email,
        fullName,
        adminCode
    }

    const user =await adminRepository.createAdmin(adminPayload);

    if(!user) throw new ApiError(500,"Error while creating admin");

    return user;
}

const alreadyLoggedIn = async (email:string) => {
    const user = await adminRepository.existedUser(email);

    const login = user?.isLoggedIn === true;

    if(login) throw new ApiError(409,"Admin Already Logged In");
}

const saveCode = async (code:string, email:string) => {
    const user = await adminRepository.saveCode(code, email);

    if(!user) throw new ApiError(404,"User not found!");

    return user;
}

const checkCode = async (code:string, email:string) => {
    const user = await adminRepository.existedUser(email);

    if(user?.code !== code) throw new ApiError(400,"Invalid Code");
}

const checkExpiry = async (email: string) => {
    const user = await adminRepository.existedUser(email);

    if (!user) throw new ApiError(404, "User not found!");

    const lastUpdateTime = new Date(user.updatedAt).getTime();
    const currentTime = Date.now();

    if (currentTime - lastUpdateTime > 300000) {
        throw new ApiError(409, "Time Expired!");
    }
};

const setIsloggedINTrue = async (email:string) => {
    const user = await adminRepository.logintoTrue( email);

    if(!user) throw new ApiError(404,"User not found!");

    return user;
}

const setIsloggedINfalse = async (email:string) => {
    const user = await adminRepository.logintoFalse( email);

    if(!user) throw new ApiError(404,"User not found!");

    return user;
}

const generateToken = async (email:string) =>{
  const user = await adminRepository.existedUser(email);

  const token = user?.generateToken();

  return token;
}

const adminData = async (email:string)=> {
    const admin = await adminRepository.adminData(email);

    return admin;
}

const generateAdminCode = async () => {
  const code = await generateCode<Iadmin>(Admin);

  return code;
}

const adminService = {
    validateField,
    existedUser,
    createAdmin,
    checkUSerExistence,
    saveCode,
    alreadyLoggedIn,
    checkCode,
    checkExpiry,
    setIsloggedINTrue,
    generateToken,
    adminData,
    setIsloggedINfalse,
    generateAdminCode
}

export default adminService;