import { Post } from "../model/post.model";
import { ObjectID } from 'mongodb';

export type IdType = string;

export interface Indentifiable {
    _id?: IdType
}

export interface ResourceType<T> extends Function {
    typeId: string;
    new(...args: any[]): T;
}


