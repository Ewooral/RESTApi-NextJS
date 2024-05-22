import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/connectToDatabase';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'PUT') {
    const { id, read } = req.body;

    const client = await connectToDatabase();
    const db = client.db("manage-users");

    await db.collection('notifications').updateOne({ _id: new ObjectId(id) }, { $set: { read } });

    res.status(200).json({ message: 'Notification updated successfully' });
  } else {
    res.status(400).json({ message: 'Only PUT requests are allowed' });
  }
}