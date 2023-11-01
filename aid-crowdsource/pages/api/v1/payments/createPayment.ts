import fetch from 'node-fetch';
import { ObjectId } from 'mongodb';
import  auth from '../../../../lib/utils/mpesaAuth';
import timeStamp from '../../../../lib/utils/timeStamp';
import { Project } from '../../../../src/interfaces/IProject';
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

            const client = await clientPromise;
            const project = await client.db().collection('projects').findOne<Project>({
                _id: new ObjectId(projectId as string)
            });
            if (!project) {
                res.status(404).json({ message: 'Project not found' });
            } else {
                if (project.status === 'completed') {
                    res.status(400).json({ message: 'Project was completed and cannot accept more payments' })
                } else if (project.status === 'rejected') {
                    res.status(400).json({ message: 'Project was rejected and cannot accept any payments' })
                } else if (project.status === 'pending-approval') {
                    res.status(400).json({ message: 'Project is pending approval and cannot accept any payments' })
                } else {
                    let authToken;
                    try {
                        authToken = await auth();
                    } catch (error: any) {
                        res.status(400).json({ message: error.message });
                    }
                    const businessShortCode = project.businessShortCode;
                    const passkey = process.env.PASS_KEY;
                    const timestamp = timeStamp();
                    const password = Buffer.from(`${businessShortCode}${passkey}${timestamp}`).toString('base64');
                    const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
                    const callBackURL = `${process.env.CALLBACK_URL}api/v1/payments/expressPayment?projectId=${projectId}`;
                    console.log(callBackURL);

                    const requestBody = {
                        BusinessShortCode: businessShortCode,
                        Password: password,
                        Timestamp: timestamp,
                        TransactionType: "CustomerPayBillOnline",
                        Amount: amount,
                        PartyA: phoneNumber,
                        PartyB: businessShortCode,
                        PhoneNumber: phoneNumber,
                        CallBackURL: callBackURL,
                        AccountReference: "AidCrowdLTD",
                        TransactionDesc: "Aid payment"
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
                        res.status(response.status).json({ message: response.statusText });
                    }
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