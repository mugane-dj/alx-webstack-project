import { User } from '../../interfaces/IUser';
import { Project } from '../../interfaces/IProject';
import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';
import redisClient from '../../../lib/redis';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise;
    if (req.method === 'GET') {
        const { projectId } = req.query;
        if (projectId) {
            try {
                const existingProject = await redisClient.get(`project-${projectId}`);
                if (existingProject) {
                    console.log('Project cache hit');
                    res.status(200).json(JSON.parse(existingProject));
                } else {
                    console.log('Project cache miss');
                    const existingProject = await client.db().collection('projects').findOne<Project>({
                        _id: new ObjectId(String(projectId))
                    });
                    if (!existingProject) return res.status(404).json({ message: 'Project does not exist' });
                    const project = {
                        id: existingProject._id.toString(),
                        title: existingProject.title,
                        description: existingProject.description,
                        image: existingProject.image,
                        status: existingProject.status,
                        createdAt: existingProject.createdAt,
                        updatedAt: existingProject.updatedAt
                    }
                    await redisClient.set(`project-${projectId}`, JSON.stringify(project));
                    await redisClient.expire(`project-${projectId}`, 3600);
                    res.status(200).json(project);
                }
            } catch (error: any) {
                res.status(500).json({ message: error.message });
            }
        } else {
            try {
                const projects = await client.db().collection('projects').find<Project>({}).toArray();
                res.status(200).json(projects);         
            } catch (error: any) {
                res.status(500).json({ message: error.message });
            }
        }
            
    } else if (req.method === 'POST') {
        const { userId } = req.query;
        const { title, description, image, businessShortCode } = req.body;
        if (!userId) res.status(400).json({ message: 'Missing userId' });
        if (!title) res.status(400).json({ message: 'Missing title' });
        if (!description) res.status(400).json({ message: 'Missing description' });
        if (!image) res.status(400).json({ message: 'Missing image path' });
        if (!businessShortCode) res.status(400).json({ message: 'Missing business short code' });

        try {
            const existingUser = await client.db().collection('users').findOne<User>({
                _id: new ObjectId(String(userId))
            });
            if (existingUser) {
                const existingProject = await client.db().collection('projects').findOne<Project>({
                    $or: [
                        { title: title as string},
                        { description: description as string}
                    ]
                });
                if (!existingProject) {
                    const project = await client.db().collection('projects').insertOne({
                        title,
                        description,
                        image,
                        businessShortCode,
                        status: 'open',
                        createdAt: new Date(Date.now()),
                        updatedAt: null
                    });
                    await client.db().collection('users').updateOne({
                        _id: new ObjectId(userId as string)
                    }, {
                        $push: {
                            projects: project.insertedId
                        }
                    });
                    await redisClient.del(`user-${userId}`);
                    res.status(201).json({ message: `Project created successfully with id: ${project.insertedId.toString()}` });
                } else {
                    res.status(404).json({ message: 'Project already exists' });
                }
            } else {
                res.status(400).json({ message: 'User does not exist'})
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    } else if (req.method === 'PUT') {
        const { projectId } = req.query;
        const { status } = req.body;
        if (!projectId) res.status(400).json({ message: 'Missing projectId' });
        if (!status) res.status(400).json({ message: 'Missing status' });

        try {
            const foundProject = await client.db().collection('projects').findOne<Project>({
                _id: new ObjectId(String(projectId))
            });
            if (!foundProject) return res.status(404).json({ message: 'Project does not exist' });
            const user = await client.db().collection('users').findOne<User>({
                projects: new ObjectId(String(projectId))
            });
            await client.db().collection('projects').updateOne({
                _id: new ObjectId(projectId as string)
            }, {
                $set: {
                    status: status as string,
                    updatedAt: new Date(Date.now())
                }
            });
            await redisClient.del(`project-${projectId}`);
            if (user) {
                await redisClient.del(`user-${user._id.toString()}`);
            }
            res.status(200).json({ message: 'Project updated successfully' });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    } else if (req.method === 'DELETE') {
        const { projectId } = req.query;
        if (!projectId) res.status(400).json({ message: 'Missing projectId' });
        try { 
            await client.db().collection('projects').deleteOne({
                _id: new ObjectId(projectId as string)
            });
            await client.db().collection('users').updateOne(
                { projects: new ObjectId(projectId as string) },
                { $pull: { projects: new ObjectId(projectId as string) } }
            );
            await redisClient.del(`project-${projectId}`);
            res.status(200).json({ message: 'Project deleted successfully' });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default handler;