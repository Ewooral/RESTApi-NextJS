// pages/api/getUsers.ts
import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/connectToDatabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const sort = String(req.query.sort) || 'firstName';
    const search = req.query.search || '';
    const direction = req.query.direction === 'desc' ? -1 : 1;

    const client = await connectToDatabase();
    const db = client.db("manage-users");

    const users = await db.collection('users')
        .find()
        .sort({ [sort]: direction })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray();

    const totalUsers = await db.collection('users').countDocuments();

    res.status(200).json({ users, totalPages: Math.ceil(totalUsers / limit) });
  } else {
    res.status(400).json({ message: 'Only GET requests are allowed' });
  }
}