import fetch from 'node-fetch';
import { ObjectId } from 'mongodb';
import  auth from '../../../../pages/utils/mpesaAuth';
import timeStamp from '../../../utils/timeStamp';
import { Project } from '../../../interfaces/IProject';
import clientPromise from '../../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { projectId } = req.query;
        const { phoneNumber, amount } = req.body;
        if (!projectId) res.status(400).json({ message: 'Missing projectId '});
        if (!phoneNumber) res.status(400).json({ message: 'Missing phone number'});
        if (!amount) res.status(400).json({ message: 'Missing amount'});
        try {
            let authToken;
            try {
                authToken = await auth();
            } catch (error: any) {
                res.status(400).json({ message: error.message });
            }
            const client = await clientPromise;
            const project = await client.db().collection('projects').findOne<Project>({
                _id: new ObjectId(String(projectId))
            });
            if (!project) {
                res.status(404).json({ message: 'Project not found' });
            } else {
                const businessShortCode = project.businessShortCode;
                const passkey = process.env.PASS_KEY;
                const timestamp = timeStamp();
                const password = Buffer.from(`${businessShortCode}${passkey}${timestamp}`).toString('base64');
                const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    
                const requestBody = {
                    BusinessShortCode: businessShortCode,
                    Password: password,
                    Timestamp: timestamp,
                    TransactionType: "CustomerPayBillOnline",
                    Amount: amount,
                    PartyA: phoneNumber,
                    PartyB: businessShortCode,
                    PhoneNumber: phoneNumber,
                    CallBackURL: "https://medusa.requestcatcher.com/expess-payment",
                    AccountReference: "0112356789",
                    TransactionDesc: "Pay bill"
                }
    
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });
                if (response.status === 200) {
                    const data = await response.json();
                    res.status(200).json(data);
                } else if (response.status === 400) {
                    res.status(400).json({ message: response.statusText });
                } else {
                    res.status(404).json({ message: 'Payment service unavailable' });
                }
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    } else {
        res.status(405).json({ message: 'Method not allowed'})
    }
};

export default handler;