// /api/get-user.ts

import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/connectToDatabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { email } = req.query;

    const client = await connectToDatabase();
    const db = client.db("manage-users");

    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } else {
    res.status(400).json({ message: 'Only GET requests are allowed' });
  }
};