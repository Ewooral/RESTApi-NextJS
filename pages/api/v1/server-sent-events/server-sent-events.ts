// // pages/api/users-sse.js

// import { NextApiRequest, NextApiResponse } from 'next';

// const users = new Set<string>(); // Track logged-in users

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     // Set headers for SSE
//     res.setHeader('Content-Type', 'text/event-stream');
//     res.setHeader('Cache-Control', 'no-cache');
//     res.setHeader('Connection', 'keep-alive');

//     // Send SSE messages to connected clients
//     const sendEvent = (event: string, data: any) => {
//       res.write(`event: ${event}\n`);
//       res.write(`data: ${JSON.stringify(data)}\n\n`);
//     };

//     // Send initial list of logged-in users
//     sendEvent('users', Array.from(users));

//     // Listen for user login/logout events
//     // For demonstration purposes, simulate user login/logout events every 5 seconds
//     const intervalId = setInterval(() => {
//       users.add(`User${Math.floor(Math.random() * 100)}`); // Simulate user login
//       sendEvent('users', Array.from(users));
//       setTimeout(() => {
//         const randomUser = Array.from(users)[Math.floor(Math.random() * users.size)];
//         users.delete(randomUser); // Simulate user logout
//         sendEvent('users', Array.from(users));
//       }, 5000);
//     }, 10000); // Simulate every 10 seconds

//     // Handle client disconnect
//     req.on('close', () => {
//       clearInterval(intervalId); // Stop sending events when the client disconnects
//       res.end();
//     });
//   } else {
//     res.status(405).end(); // Method Not Allowed
//   }
// }


// pages/api/users-sse.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@/lib/sessionManager'; // Import getSession function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Send SSE messages to connected clients
    const sendEvent = (event: string, data: any) => {
      res.write(`event: ${event}\n`);
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    // Retrieve session data
    const session = await getSession(req, res);

    // Send initial list of logged-in users
    sendEvent('users', [session.email]); // Assuming the email is unique for each user

    // Handle client disconnect
    req.on('close', () => {
      res.end();
    });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
