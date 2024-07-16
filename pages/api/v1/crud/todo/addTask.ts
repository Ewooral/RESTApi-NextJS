// pages/api/tasks/add.ts
import type { NextApiRequest, NextApiResponse } from 'next';

import { addTask_POSTGRES } from "@/repositories/users/tasksRepository"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
           console.log("Request Body::: ", req.body)
            const task = await addTask_POSTGRES(req.body);
            res.status(200).json(task);
        } catch (error) {
            console.error("Error adding task:", error);
            res.status(500).json({ message: 'Error adding task', error: (error as Error).message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}