export interface Ifolder {
    code: string;
    name: string;
    description?: string;
    avatar?: string;
    isPrivate: boolean
    createdAt?: Date,
    updatedAt?: Date
}

export interface ICreateFolder {
    name: string | undefined
    description?: string | undefined
    avatarBuffer?: Buffer | undefined
    isPrivate: boolean | undefined
}