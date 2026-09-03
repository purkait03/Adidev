export interface Ifile {
    code: string;
    name: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date
}

export interface ICreateFile {
    name: string
    description?: string | undefined
}