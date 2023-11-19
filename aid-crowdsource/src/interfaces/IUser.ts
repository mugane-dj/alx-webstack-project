import { ObjectId } from 'mongodb';

export interface User {
    _id: ObjectId;
    username: string;
    email: string;
    projects: ObjectId[];
    password: string;
    is_active: boolean;
    is_staff: boolean;
    is_admin: boolean;
    last_login: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserFrontend {
    id: string;
    username: string;
    email: string;
    projects: ObjectId[];
    password: string;
    is_active: boolean;
    is_staff: boolean;
    is_admin: boolean;
    last_login: Date;
    createdAt: Date;
    updatedAt: Date;
}