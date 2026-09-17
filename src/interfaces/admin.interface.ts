export interface Iadmin {
    adminCode: string
    fullName: string
    email: string
    code: string,
    isLoggedIn?: boolean,
    createdAt: Date
    updatedAt: Date
    generateToken() : string
}