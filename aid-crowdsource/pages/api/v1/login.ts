import { User } from '../../interfaces/IUser';
import clientPromise from '../../../lib/mongodb';
import redisClient from '../../../lib/redis';
import hashPassword from '../../../lib/utils/hashPass';
import { NextApiRequest, NextApiResponse } from 'next';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise;
    if (req.method === 'POST') {
        const { username, email, password } = req.body as User;
        if (!username && !email) res.status(400).json({ message: 'Missing username or email' });
        if (!password) res.status(400).json({ message: 'Missing password' });

        try {
            const existingUser = await client.db().collection('users').findOne<User>({
                $or: [
                    { username: username as string },
                    { email: email as string }
                ]
            });
            if (!existingUser) {
                res.status(404).json({ message: 'User does not exist' });
            } else {
                const isMatch = await hashPassword.compare(password, existingUser.password);
                if (!isMatch) {
                    res.status(401).json({ message: 'Invalid credentials' });
                } else {
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
                    res.status(200).json({ message: `Login successful for userId: ${user.id}` });
                }
            }
            
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};

export default handler;