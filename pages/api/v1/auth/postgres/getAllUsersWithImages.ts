import { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/lib/connectToPostgres';
import { getSession } from '@/lib/sessionManager';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const getAllUsersWithImagesQuery = `
            SELECT
                users.*,
                images.image_url,
                user_statuses.type AS status
            FROM
                users
                    LEFT JOIN
                images ON users.image_id = images.id
                    LEFT JOIN
                user_statuses ON users.status_id = user_statuses.id
        `;


        const result = await query(getAllUsersWithImagesQuery, []);

        if (result.rows.length > 0) {
            res.status(200).json({
                message: 'Users fetched successfully',
                users: result.rows,
            })
        } else {
            res.status(404).json({ message: 'No users found' });
        }
    } catch (err: any) {
        res.status(500).json({ message: 'Error fetching users', error: err.message })
    }
}