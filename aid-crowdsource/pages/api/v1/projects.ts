import { User } from '../../../src/interfaces/IUser';
import { Project, ProjectStatus } from '../../../src/interfaces/IProject';
import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';
import redisClient from '../../../lib/redis';
import { NextApiRequest, NextApiResponse } from 'next';

import { IncomingForm } from 'formidable';
import s3Upload from '../../../lib/utils/s3Upload';


const handler = async (req: NextApiRequest & { file?: Express.Multer.File }, res: NextApiResponse) => {
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
                        _id: new ObjectId(projectId as string)
                    });
                    if (!existingProject) return res.status(404).json({ message: 'Project does not exist' });
                    const project = {
                        id: existingProject._id.toString(),
                        title: existingProject.title,
                        description: existingProject.description,
                        image: existingProject.image,
                        status: existingProject.status,
                        goalAmount: existingProject.goalAmount,
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
                const existingProjects = await redisClient.get('projects');
                if (existingProjects) {
                    console.log('Projects cache hit');
                    res.status(200).json(JSON.parse(existingProjects));
                } else {
                    console.log('Projects cache miss');
                    const projects = await client.db().collection('projects').find<Project>({}).toArray();
                    redisClient.set('projects', JSON.stringify(projects));
                    redisClient.expire('projects', 3600);
                    res.status(200).json(projects);
                }
            } catch (error: any) {
                res.status(500).json({ message: error.message });
            }
        }

    } else if (req.method === 'POST') {
        const { userId } = req.query;
        if (!userId) res.status(400).json({ message: 'Missing userId' });
        const form = new IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error parsing form data' });
                return;
            }

            // Access the form data fields and files here
            const { title, description, businessShortCode, goalAmount } = fields;
            const projectTitle = Array.isArray(title) ? title[0] : title;
            const projectDescription = Array.isArray(description) ? description[0] : description;
            const projectBusinessShortCode = Array.isArray(businessShortCode) ? businessShortCode[0] : businessShortCode;
            const projectGoalAmount = Array.isArray(goalAmount) ? goalAmount[0] : goalAmount;
            const filesArray = Object.values(files);
            
            if (!projectTitle) res.status(400).json({ message: 'Missing title' });
            if (!projectDescription) res.status(400).json({ message: 'Missing description' });
            if (!projectBusinessShortCode) res.status(400).json({ message: 'Missing business short code' });
            if (!projectGoalAmount) res.status(400).json({ message: 'Missing goal amount' });
            try {
                const existingUser = await client.db().collection('users').findOne<User>({
                    _id: new ObjectId(userId as string)
                });
                if (existingUser) {
                    const existingProject = await client.db().collection('projects').findOne<Project>({
                        $or: [
                            { title: projectTitle },
                            { description: projectDescription },
                        ]
                    });
                    if (!existingProject) {
                        const image = filesArray[0];
                        if (!image) {
                            res.status(400).json({ message: 'Missing image' });
                            return;
                        }
                        const contentType: string | null = image[0].mimetype;
                        let imageLocation: string | null = null;
                        try {
                            imageLocation = await s3Upload(image[0].filepath, image[0].newFilename, contentType as string);
                        } catch (error: any) {
                            res.status(500).json({ message: 'Error uploading image' });
                            return;
                        }
                        const project = await client.db().collection('projects').insertOne({
                            title: projectTitle,
                            description: projectDescription,
                            image: imageLocation ? imageLocation : '',
                            businessShortCode: projectBusinessShortCode,
                            status: ProjectStatus.Approved,
                            goalAmount: parseInt(projectGoalAmount as string, 10),
                            createdAt: new Date(Date.now()),
                            updatedAt: null,
                            _id: new ObjectId()
                        });
                        await client.db().collection('users').updateOne({
                            _id: new ObjectId(userId as string)
                        }, {
                            $push: {
                                projects: project.insertedId
                            }
                        });
                        await redisClient.del(`user-${userId}`);
                        await redisClient.del('projects');
                        res.status(201).json({ message: `Project created successfully with id: ${project.insertedId.toString()}` });
                    } else {
                        res.status(400).json({ message: 'Project already exists' });
                    }
                } else {
                    res.status(400).json({ message: 'User does not exist' })
                }
            } catch (error: any) {
                res.status(500).json({ message: error.message });
            }
        });
    } else if (req.method === 'PUT') {
        const { projectId } = req.query;
        const { status } = req.body;
        if (!projectId) res.status(400).json({ message: 'Missing projectId' });
        if (!status) res.status(400).json({ message: 'Missing status' });

        try {
            const foundProject = await client.db().collection('projects').findOne<Project>({
                _id: new ObjectId(projectId as string)
            });
            if (!foundProject) return res.status(404).json({ message: 'Project does not exist' });
            const user = await client.db().collection('users').findOne<User>({
                projects: new ObjectId(projectId as string)
            });
            await client.db().collection('projects').updateOne({
                _id: new ObjectId(projectId as string)
            }, {
                $set: {
                    status: status as ProjectStatus,
                    updatedAt: new Date(Date.now())
                }
            });
            await redisClient.del(`project-${projectId}`);
            await redisClient.del('projects');
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
            await redisClient.del('projects');
            res.status(200).json({ message: 'Project deleted successfully' });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;