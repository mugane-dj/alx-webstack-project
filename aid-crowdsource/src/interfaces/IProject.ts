import { ObjectId } from 'mongodb';

type PaymentRecord = {
    mpesaReceiptNumber: string;
    amount: number;
    phoneNumber: string;
    transactionDate: Date;
}

export enum ProjectStatus {
    PendingApproval = 'pending-approval',
    Approved = 'approved',
    Rejected = 'rejected',
    Completed = 'completed'
}


export type AllUsersProjects = Project[]
export interface Project {
    _id: ObjectId;
    title: string;
    description: string;
    image: string;
    status: ProjectStatus;
    goalAmount: number;
    amountRaised: number;
    paymentRecords: PaymentRecord[];
    businessShortCode: string;
    createdAt: Date;
    updatedAt: Date;
}





export type AllProjects = ProjectFrontend[]

export interface ProjectFrontend {
    [x: string]: any;
    id: string;
    title: string;
    description: string;
    image: string;
    status: ProjectStatus;
    goalAmount: number;
    amountRaised: number;
    paymentRecords: PaymentRecord[];
    businessShortCode: string;
    createdAt: Date;
    updatedAt: Date;
}