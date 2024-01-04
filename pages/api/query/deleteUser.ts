import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/connectToDatabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if(req.method === 'DELETE') {
      const { id } = req.body; 
      console.log("id: ", id);

      // Validate input...
      // 8a19d4

      const client = await connectToDatabase();
      
      // Connects to the database
      const db = client.db("manage-users"); 

      const user = await db.collection('users').findOne({ id }); // Change this line
      console.log("User Details::", user)
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      // Delete the user
      const deleteResult = await db.collection('users').deleteOne({ id }); // Change this line
      console.log("deleteResult: ", deleteResult);
      
      if (deleteResult.deletedCount === 0) {
        throw new Error('Failed to delete user');
      }

      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    // ...
  }
}