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
    goalAmount: number;
    businessShortCode: string;
    createdAt: Date;
    updatedAt: Date;
}



export type AllProjects = ProjectFrontend[]
export interface ProjectFrontend {
    map(arg0: (project: any, i: any) => import("react").JSX.Element): import("react").ReactNode;
    id: string;
    title: string;
    description: string;
    image: string;
    status: ProjectStatus;
    goalAmount: number;
    businessShortCode: string;
    createdAt: Date;
    updatedAt: Date;
}