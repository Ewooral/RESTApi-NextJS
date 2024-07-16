// Import the function from your repository
import { createTaskStatuses_POSTGRES, createTasks_POSTGRES } from '@/repositories/users/tasksRepository';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            await createTaskStatuses_POSTGRES();
            await createTasks_POSTGRES();
            res.status(200).json({ message: 'Tasks and Task statuses tables created successfully' });
        } catch (error) {
            console.error('Error creating tasks:', error);
            res.status(500).json({ message: 'Error creating tasks ', error: (error as Error).message });
        }
    } else {
        // Handle any requests that aren't POST
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

