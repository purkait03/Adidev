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
    name: string
    description?: string
    avatarBuffer?: Buffer
    isPrivate: boolean
}