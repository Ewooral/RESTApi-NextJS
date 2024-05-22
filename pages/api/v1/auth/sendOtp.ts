import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import connectToDatabase from '@/lib/connectToDatabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    // Validate input...

    const client = await connectToDatabase();
    const db = client.db(); // your database name

    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // generate a 6 digit number
    const otpExpire = Date.now() + 300000; // OTP expires after 5 minutes

    await db.collection('users').updateOne({ email }, { $set: { otp, otpExpire } });

    // Send OTP via email
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'OTP for password reset',
      html: `
        <h1 style="color: #444;">Password Reset</h1>
        <p>Hello ${process.env.EMAIL_USERNAME?.split('@')[0]}, </p>
        <p>you requested a password reset. Please use the OTP below to proceed with resetting your password:</p>
        <h2 style="color: #f00;">${otp}</h2>
        <p>If you did not request a password reset, please ignore this email or contact support if you have any questions.</p>
        <p>Thanks,</p>
        <p>Your Team</p>
      `,
    };
    transporter.sendMail(mailOptions, (error: any, info: { response: string; }) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(200).json({ message: 'OTP sent successfully' });
  } else {
    res.status(400).json({ message: 'Only POST requests are allowed' });
  }
};