import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/connectToDatabase';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'DELETE') {
    const { id } = req.body;

    const client = await connectToDatabase();
    const db = client.db("manage-users");

    await db.collection('notifications').deleteOne({ _id: new ObjectId(id) });

    res.status(200).json({ message: 'Notification deleted successfully' });
  } else {
    res.status(400).json({ message: 'Only DELETE requests are allowed' });
  }
}