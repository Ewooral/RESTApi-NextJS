// pages/api/send-sms.ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import cors from 'cors'; // Import the cors middleware

// Initialize the cors middleware
const corsMiddleware = cors({
  origin: '*', // Set this to your specific origin or domains
  methods: ['POST'], // Specify the allowed HTTP methods
});

// Apply the cors middleware to the route handler
const handlerWithCors = (req: NextApiRequest, res: NextApiResponse) => {
  return corsMiddleware(req, res, async () => {
    if (req.method === 'POST') {
      const { to, content } = req.body;

      try {
        const jasminApiUrl = 'http://127.0.0.1:1401/send'; // Update with your Jasmin API URL
        // const username = 'foo';
        // const password = 'bar';

        const queryParams = new URLSearchParams({
          // username,
          // password,
          to: to,
          content: content,
        });

        const response = await axios.post(`${jasminApiUrl}?${queryParams}`);

        // Assuming Jasmin returns a success response
        res.status(200).json({ success: true, message: 'SMS sent successfully', response: response });
      } catch (error: any) {
        console.error('Error sending SMS:', error.message);
        res.status(500).json({ success: false, error: 'Failed to send SMS' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  });
};

export default handlerWithCors;
