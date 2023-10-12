import { ObjectId } from 'mongodb';

export enum ProjectStatus {
    PendingApproval = 'pending-approval',
    Approved = 'approved',
    Rejected = 'rejected',
    Completed = 'completed'
}

export interface Project {
    _id: ObjectId;
    title: string;
    description: string;
    image: string;
    status: ProjectStatus;
    businessShortCode: string;
    createdAt: Date;
    updatedAt: Date;
}