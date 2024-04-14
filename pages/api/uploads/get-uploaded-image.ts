import { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/lib/connectToPostgres';
import { getSession } from '@/lib/sessionManager';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // const session = await getSession(req, res);
    const imageId = req.query.imageId
    console.log("IMAGE ID SERVER:: ", imageId)

    try {
        const getImageQuery = 'SELECT image_url FROM images WHERE image_id = $1';
        const values = [req.query.imageId]; // Assuming the image ID is passed as a query parameter

        const result = await query(getImageQuery, values);

        if (result.rows.length > 0) {
            res.status(200).json({
                message: 'Image fetched successfully',
                imageUrl: result.rows[0].image_url,
            })
        } else {
            res.status(404).json({ message: 'Image not found' });
        }
    } catch (err: any) {
        res.status(500).json({ message: 'Error fetching image', error: err.message })
    }
}