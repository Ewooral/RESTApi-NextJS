// pages/api/deleteUsers.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/lib/connectToPostgres'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const idsToDelete = req.body.ids;
    console.log("idsToDelete: ", idsToDelete);

    try {
      // Delete users from the database
      for (const id of idsToDelete) {
        await query('DELETE FROM users WHERE id = $1', [id]);
      }

      res.status(200).json({ message: 'Users deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting users', error });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}