import crypto from 'crypto';
import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

interface User {
    username: string;
    email: string;
    password: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise;
    if (req.method === 'GET') {
        const { userId } = req.query;
        const foundUser = await client.db().collection('users').findOne({
            _id: new ObjectId(userId as string)
        });
        if (!foundUser) return res.status(404).json('User not found');
        const user = {
            id: foundUser._id.toString(),
            username: foundUser.username,
            email: foundUser.email
        }
        res.status(200).json(user);
    } else if (req.method === 'POST') {
        const { username, email, password } = req.body as User;
        const existingUser = await client.db().collection('users').findOne({
            email: email
        })
        if (!existingUser) {
            const sha1Hash = crypto.createHash("sha1");
            sha1Hash.update(password);
            const hashedPass = sha1Hash.digest("hex");
            const user = await client.db().collection('users').insertOne({
                username,
                email,
                password: hashedPass
            });
            res.status(201).json(`User created successfully with id: ${user.insertedId.toString()}`);
        } else {
            return res.status(400).json('User already exists');
        }
    } else if (req.method === 'PUT') {
        const { userId } = req.query;
        const { newPassword } = req.body;
        const foundUser = await client.db().collection('users').findOne({
            _id: new ObjectId(userId as string)
        });
        if (!foundUser) return res.status(404).json('User not found');
        const sha1Hash = crypto.createHash("sha1");
        sha1Hash.update(newPassword);
        const hashedPass = sha1Hash.digest("hex");
        await client.db().collection('users').updateOne({
            _id: new ObjectId(userId as string)
        }, {
            $set: {
                password: hashedPass
            }
        });
        res.status(200).json('User updated successfully');
    } else if (req.method === 'DELETE') {
        const { userId } = req.query;
        const foundUser = await client.db().collection('users').findOne({
            _id: new ObjectId(userId as string)
        });
        if (!foundUser) return res.status(404).json('User not found');
        await client.db().collection('users').deleteOne({
            _id: new ObjectId(userId as string)
        });
        res.status(200).json('User deleted successfully');
    } else {
        res.status(405).json('Method not allowed');
    }
}

export default handler;