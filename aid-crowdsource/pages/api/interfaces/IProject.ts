import { ObjectId } from 'mongodb';

export interface Project {
    _id: ObjectId;
    title: string;
    description: string;
    image: string;
    status: string;
    businessShortCode: string;
    createdAt: Date;
    updatedAt: Date;
}