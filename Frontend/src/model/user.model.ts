import { Indentifiable, IdType } from "../shared/shared-types";

export interface IUser extends Indentifiable {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    imageUrl: string;
    roles: string;
}

export enum Role{
    PARENT, BABYSITTER, ADMIN,
}

export class User implements IUser{
    static typeId = 'User';
    constructor(
        public _id: IdType,
        public firstName: string,
        public lastName: string,
        public username: string,
        public email: string,
        public password: string,
        public imageUrl: string,
        public roles: string
        ) {}
}