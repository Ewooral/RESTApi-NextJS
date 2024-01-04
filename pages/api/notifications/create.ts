import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/connectToDatabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'POST') {
    const { userId, message } = req.body;

    const client = await connectToDatabase();
    const db = client.db("manage-users");

    const notification = { userId, message, read: false, timestamp: new Date() };
    await db.collection('notifications').insertOne(notification);

    res.status(201).json({ message: 'Notification created successfully', notification });
  } else {
    res.status(400).json({ message: 'Only POST requests are allowed' });
  }
}