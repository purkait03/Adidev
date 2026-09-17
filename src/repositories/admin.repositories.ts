import type { adminPayload } from "../interfaces/adminPayload.interface.js";
import { Admin } from "../models/admin.model.js";

const existedUser = async (email:string) => {
    const user =await Admin.findOne({email});

    return user; 
}

const createAdmin = async(payload:adminPayload) => {
    const newUser = await Admin.create(payload);

    return newUser;
}

const saveCode = async (code: string, email: string) => {
  const user = await Admin.findOneAndUpdate(
    { email },
    { $set: { code: code} },
    { returnDocument: "after" },
  );
  return user;
};

const logintoTrue = async (email: string) => {
  const user = await Admin.findOneAndUpdate(
    { email },
    { $set: { isLoggedIn: true} },
    { returnDocument: "after" },
  );
  return user;
};

const logintoFalse = async (email: string) => {
  const user = await Admin.findOneAndUpdate(
    { email },
    { $set: { isLoggedIn: false} },
    { returnDocument: "after" },
  );
  return user;
};

const adminData = async (email:string ) => {
  const admin = await Admin.findOne({email},{_id:0,adminCode:1,fullName:1,email:1,isLoggedIn:1});

  return admin;
}

const adminRepository = {
    existedUser,
    createAdmin,
    saveCode,
    logintoTrue,
    adminData,
    logintoFalse
}

export default adminRepository;

