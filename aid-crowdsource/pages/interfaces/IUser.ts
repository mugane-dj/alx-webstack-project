import { ObjectId } from 'mongodb';

export interface User {
    _id: ObjectId;
    username: string;
    email: string;
    projects: ObjectId[];
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
