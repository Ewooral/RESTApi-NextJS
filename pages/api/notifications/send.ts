// pages/api/notifications/send.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/connectToDatabase';
import Notification from '@/models/Notification';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { senderId, recipientId, message } = req.body;

    await connectToDatabase();

    const notification = new Notification({ userId: recipientId, message });
    await notification.save();

    // Emit an event to the recipient
    (global as any).io.to(recipientId).emit('notification', notification);

    res.status(201).json({ message: 'Notification sent successfully', notification });
  } else {
    res.status(400).json({ message: 'Only POST requests are allowed' });
  }
}