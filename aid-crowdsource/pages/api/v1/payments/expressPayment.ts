import { ObjectId } from 'mongodb';
import redisClient from '../../../../lib/redis';
import clientPromise from '../../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from "next";
import { Project } from '../../../../src/interfaces/IProject';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { Body } = req.body;
        const projectId = req.query.projectId as string;
        const { stkCallback } = Body;
        const { ResultCode, ResultDesc } = stkCallback;
        if (ResultCode === 0) {
            console.log(ResultDesc);
            const { CallbackMetadata } = stkCallback;
            const { Item } = CallbackMetadata;
            const paymentObj = Item.reduce((obj: any, item: any) => {
                obj[item.Name] = item.Value;
                return obj;
            }, {});
            const { Amount, MpesaReceiptNumber, TransactionDate, PhoneNumber } = paymentObj;
            const TransactionDateString = TransactionDate.toString();
            const formattedTransactionDate = `${TransactionDateString.slice(0, 4)}-${TransactionDateString.slice(4, 6)}-${TransactionDateString.slice(6, 8)}T${TransactionDateString.slice(8, 10)}:${TransactionDateString.slice(10, 12)}:${TransactionDateString.slice(12, 14)}`;
            const paymentDate = new Date(formattedTransactionDate);
            const client = await clientPromise;
            const project = await client.db().collection('projects').findOne<Project>({
                _id: new ObjectId(projectId)
            });
            if (!project) {
                console.log('Project not found');
                return;
            } else {
                const paymentRecord = {
                    mpesaReceiptNumber: MpesaReceiptNumber,
                    amount: Amount,
                    phoneNumber: PhoneNumber,
                    transactionDate: paymentDate
                }
                const updatedProject = await client.db().collection('projects').updateOne({
                    _id: new ObjectId(projectId)
                }, {
                    $push: {
                        paymentRecords: paymentRecord
                    },
                    $inc: {
                        amountRaised: Amount
                    },
                    $set: {
                        updatedAt: new Date(Date.now())
                    }
                });
                await redisClient.del(`project-${projectId}`);
                await redisClient.del('projects');
                console.log(updatedProject);
            }
        } else {
            console.log(ResultDesc);
            return;
        }
        res.status(200).json({ message: 'success' });
    } else {
        res.status(400).json({ message: 'Invalid request method' });
    }
};

export default handler;