import type { Iadmin } from "../interfaces/admin.interface.ts";
import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            admin?: Iadmin
        }
    }
}

export {}