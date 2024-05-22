import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/connectToDatabase';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if(req.method === 'POST') {
      const { email, password } = req.body;

      // Validate input...

      const client = await connectToDatabase();
      
      //connects to the database
      const db = client.db("manage-users"); 

      const user = await db.collection('users').findOne({ email });
      console.log("Reset User Details::", user)
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("hashedPassword: ", hashedPassword);
      

      // Update the user's password
      const updateResult = await db.collection('users').updateOne({ email }, { $set: { password: hashedPassword } });
      console.log("updateResult: ", updateResult);
      
      if (updateResult.modifiedCount === 0) {
        throw new Error('Failed to update password');
      }

      // Invalidate the cookie
      res.setHeader('Set-Cookie', `auth=; Max-Age=0; Path=/; HttpOnly`);

      res.status(200).json({ message: 'Password updated successfully' });
      console.log("User::", user)
    } else {
      res.status(400).json({ message: 'Only POST requests are allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while resetting the password' });
  }
};