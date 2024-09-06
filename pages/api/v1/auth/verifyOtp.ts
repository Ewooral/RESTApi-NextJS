import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/connectToDatabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'POST') {
    const { email, otp } = req.body;
    console.log("body: ", req.body);

    // Validate input...

    const client = await connectToDatabase();
    const db = client.db(); // your database name

    const user = await db.collection('users').findOne({ email });
    console.log("User: ", user);
    if (!user || user.otp !== otp || Date.now() > user.otpExpire) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    await db.collection('users').updateOne({ email }, { $set: { otp: null, otpExpire: null } });

    res.status(200).json({ message: 'OTP verified successfully' });
    res.status(400).json({ message: 'Only POST requests are allowed' });
  }
};