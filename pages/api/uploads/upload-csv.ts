import connectToDatabase from '@/lib/connectToDatabase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = req.body;

    // Connect to your database
    const client = await connectToDatabase();
    const db = client.db("manage-users");

    // Save data in the database
    // This depends on your database and ORM
    // For example, with MongoDB, you might do something like:
    await db.collection('lists-of-universities').insertOne(data);

    res.status(200).json({ message: 'Data uploaded successfully' });
  } else {
    res.status(400).json({ message: 'Only POST requests are allowed' });
  }
}

