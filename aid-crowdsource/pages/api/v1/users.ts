import { ObjectId } from 'mongodb';
import { User } from '../../interfaces/IUser';
import clientPromise from '../../../lib/mongodb';
import redisClient from '../../../lib/redis';
import hashPassword from '../../utils/helpers';
import { NextApiRequest, NextApiResponse } from 'next';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise;
    if (req.method === 'GET') {
        const { userId, username, email } = req.query;
        if (!userId && !username && !email) res.status(400).json({ message: 'Missing query parameter' });

        try {
            let existingUser;
            existingUser = await redisClient.get(`user-${userId}`);
            if (existingUser) {
                console.log('User cache hit')
                return res.status(200).json(JSON.parse(existingUser));
            } else {
                console.log('User cache miss')
                existingUser = await client.db().collection('users').findOne<User>({
                    $or: [
                        { _id: new ObjectId(userId as string) },
                        { username: username as string },
                        { email: email as string }
                    ]
                });
                if (!existingUser) return res.status(404).json({ message: 'User does not exist' });
                const id = existingUser._id.toString();
                const user = {
                    id: id,
                    username: existingUser.username,
                    email: existingUser.email,
                    projects: existingUser.projects.map(project => project.toString()),
                    createdAt: existingUser.createdAt,
                    updatedAt: existingUser.updatedAt
                }
                await redisClient.set(`user-${id}`, JSON.stringify(user));
                await redisClient.expire(`user-${id}`, 3600);
                res.status(200).json(user);
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        } 

    } else if (req.method === 'POST') {
        const { username, email, password } = req.body as User;
        if (!username) res.status(400).json({ message: 'Missing username' });
        if (!email) res.status(400).json({ message: 'Missing email' });
        if (!password) res.status(400).json({ message: 'Missing password' });
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
                    password: hashPassword(password),
                    projects: [],
                    createdAt: new Date(Date.now()),
                    updatedAt: null
                });
                res.status(201).json({ message: `User created successfully with id: ${user.insertedId.toString()}` });
            } else {
                res.status(404).json({ message: 'User already exists' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    } else if (req.method === 'PUT') {
        const { userId } = req.query;
        const { password } = req.body;
        if (!userId) res.status(400).json({ message: 'Missing userId' })
        if (!password) res.status(400).json({ message: 'Missing new password' })
        try {
            const foundUser = await client.db().collection('users').findOne<User>({
                _id: new ObjectId(userId as string)
            });
            if (!foundUser) return res.status(404).json({ message: 'User does not exist' });
            await client.db().collection('users').updateOne({
                _id: new ObjectId(userId as string)
            }, {
                $set: {
                    password: hashPassword(password),
                    updatedAt: new Date(Date.now())
                }
            });
            await redisClient.del(`user-${userId}`);
            res.status(200).json({ message: 'User updated successfully' });
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }

    } else if (req.method === 'DELETE') {
        const { userId } = req.query;
        if (!userId) res.status(400).json({ message: 'Missing userId' })
        try {
            const foundUser = await client.db().collection('users').findOne<User>({
                _id: new ObjectId(userId as string)
            });
            if (!foundUser) return res.status(404).json({ message: 'User does not exist' });
            await client.db().collection('users').deleteOne({
                _id: new ObjectId(userId as string)
            });
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

export default handler;