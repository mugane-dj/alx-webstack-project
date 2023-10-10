import { NextApiRequest, NextApiResponse } from 'next';
import redisClient from '../../../lib/redis';
import clientPromise from '../../../lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let mongoStatus;

  try {
    await clientPromise;
    mongoStatus = true;
  } catch (error) {
    mongoStatus = false;
    console.error(error);
  }

  const redisStatus = (await redisClient).isReady;
  if (redisStatus && mongoStatus) {
    res.status(200).json({ message: "All Services are running" })
  } else if (redisStatus && !mongoStatus) {
    res.status(500).json({ message: "MongoDB service is down"})
  } else if (!redisStatus && mongoStatus) {
    res.status(500).json({ message: "Redis service is down"})
  }
};

export default handler;