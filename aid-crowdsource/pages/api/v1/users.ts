import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';
import redisClient from '../../../lib/redis';
import hashPassword from '../../utils/helpers';
import { NextApiRequest, NextApiResponse } from 'next';

interface User {
    _id: ObjectId;
    username: string;
    email: string;
    password: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise;
    if (req.method === 'GET') {
        const { userId, username, email } = req.query;
        const redisKey = `user-${userId}` ?? `user-${username}` ?? `user-${email}`;

        try {
            let existingUser;
            existingUser = await redisClient.get(redisKey);
            if (existingUser) {
                // console.log('cache hit')
                return res.status(200).json(JSON.parse(existingUser));
            } else {
                // console.log('cache miss')
                existingUser = await client.db().collection('users').findOne<User>({
                    $or: [
                        { _id: new ObjectId(userId as string) },
                        { username: username as string },
                        { email: email as string }
                    ]
                });
                if (!existingUser) return res.status(404).json('User not found');
                const id = existingUser._id.toString()
                const user = {
                    id: id,
                    username: existingUser.username,
                    email: existingUser.email
                }
                await redisClient.set(redisKey, JSON.stringify(user));
                await redisClient.expire(redisKey, 3600);
                res.status(200).json(user);
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        } 

    } else if (req.method === 'POST') {
        const { username, email, password } = req.body as User;
        try {
            const existingUser = await client.db().collection('users').findOne<User>({
                $or: [
                    { username: username as string },
                    { email: email as string }
                ]
            });
            if (!existingUser) {
                const user = await client.db().collection('users').insertOne({
                    username,
                    email,
                    password: hashPassword(password)
                });
                res.status(201).json(`User created successfully with id: ${user.insertedId.toString()}`);
            } else {
                return res.status(400).json('User already exists');
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    } else if (req.method === 'PUT') {
        const { userId } = req.query;
        const { password } = req.body;
        try {
            const foundUser = await client.db().collection('users').findOne<User>({
                _id: new ObjectId(userId as string)
            });
            if (!foundUser) return res.status(404).json('User not found');
            await client.db().collection('users').updateOne({
                _id: new ObjectId(userId as string)
            }, {
                $set: {
                    password: hashPassword(password)
                }
            });
            res.status(200).json('User updated successfully');
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }

    } else if (req.method === 'DELETE') {
        const { userId } = req.query;
        try {
            const foundUser = await client.db().collection('users').findOne<User>({
                _id: new ObjectId(userId as string)
            });
            if (!foundUser) return res.status(404).json('User not found');
            await client.db().collection('users').deleteOne({
                _id: new ObjectId(userId as string)
            });
            res.status(200).json('User deleted successfully');
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    } else {
        res.status(405).json('Method not allowed');
    }
}

export default handler;