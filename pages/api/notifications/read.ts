import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/connectToDatabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    const { userId } = req.query;

    const client = await connectToDatabase();
    const db = client.db("manage-users");

    const notifications = await db.collection('notifications').find({ userId }).toArray();

    res.status(200).json(notifications);
  } else {
    res.status(400).json({ message: 'Only GET requests are allowed' });
  }
}