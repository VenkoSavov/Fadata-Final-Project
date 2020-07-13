import { Indentifiable, IdType } from '../shared/shared-types';
import { User } from './user.model';
export interface IPost extends Indentifiable {
    author: string;
    text: string;
    authorId: IdType;
    timeFrom: string;
    timeTo: string;
    kidsNames: string[];
    kidsAge: string[];
    date: string;
    isAccepted: boolean;
    acceptedBy: User | undefined;
    location: string;
    imageUrl?: string;
}

export class Post implements IPost {
    static typeId = 'Post';
    constructor(
        public _id: IdType,
        public author: string,
        public text: string,
        public authorId: IdType,
        public timeFrom: string,
        public timeTo: string,
        public kidsNames: string[],
        public kidsAge: string[] = [],
        public date: string,
        public isAccepted: boolean,
        public acceptedBy: User | undefined,
        public location: string,
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