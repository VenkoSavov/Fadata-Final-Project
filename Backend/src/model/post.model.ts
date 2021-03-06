import { Indentifiable, IdType } from '../model/shared-types';
import { User } from './user.model';
export interface IPost extends Indentifiable {
    author: string;
    text: string;
    authorId: IdType;
    date: string;
    timeFrom: string;
    timeTo: string;
    kidsNames: string[];
    kidsAge: string[];
    isAccepted: boolean;
    acceptedBy: User;
    imageUrl?: string;
}

export class Post implements IPost {
    static typeId = 'Post';
    constructor(
        public _id: IdType,
        public author: string,
        public text: string,
        public authorId: IdType,
        public date: string,
        public timeFrom: string,
        public timeTo: string,
        public kidsNames: string[],
        public kidsAge: string[] = [],
        public isAccepted: boolean,
        public acceptedBy: User,
        public imageUrl?: string
        ) {}
} 

    // public fName: string,
    // public lName: string,
    // public date: string,
    // public timeFrom: number,
    // public timeTo: number,
    // public kidName: string,
    // public kidAge: number,
    // public imageUrl: string