export interface Iadmin {
    code: string
    fullName: string;
    email: string
    otp?: string
    createdAt: Date
    updatedAt: Date
}

export interface IAdminMethods {
    generateToken() : string
}