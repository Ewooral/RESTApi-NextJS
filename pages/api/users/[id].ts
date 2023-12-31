import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/connectToDatabase';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const { id, ...fieldsToUpdate } = req.body;
      console.log("req.body: ", id,  req.body);

      const client = await connectToDatabase();
      const db = client.db("manage-users"); 

      const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      const updateResult = await db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        { $set: fieldsToUpdate }
      );

      if (updateResult.modifiedCount === 0) {
        return res.status(500).json({ message: 'Failed to update user' });
      }

      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while updating the user' });
    }
  } else {
    res.status(400).json({ message: 'Only PUT requests are allowed' });
  }
}