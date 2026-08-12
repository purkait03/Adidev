import type { JwtPayload } from "jsonwebtoken";

export interface MyCustomPayload extends JwtPayload{
    code: string
    fullName: string
    email: string
}