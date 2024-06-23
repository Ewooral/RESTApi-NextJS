import { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/lib/connectToPostgres';
import { getSession } from '@/lib/sessionManager';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const email = req.query.email
    console.log("Email:: ", email)
    const session = await getSession(req, res);
    try {
        // Query to get the image_id using the email
        const imageIDQuery = 'SELECT image_id FROM users WHERE email = $1';
        const imageIDResult = await query(imageIDQuery, [email]);

        if (imageIDResult.rows.length > 0) {
            const imageID = imageIDResult.rows[0].image_id;
            console.log("IMAGE ID:: ", imageID);
            

            // Query to get the image_url using the image_id
            const getImageQuery = 'SELECT image_url FROM images WHERE id = $1';
            const result = await query(getImageQuery, [imageID]);
            console.log("RESULT:: ", result.rows[0].image_url);

            // update the user's image_url and image_id in users session
            session.imageUrl = result.rows[0].image_url;
            session.imageId = imageID;

            // save session
            await session.save();

            // log session
            console.log("Session:: ", session)
            

            if (result.rows.length > 0) {
                res.status(200).json({
                    message: 'Image fetched successfully',
                    imageUrl: result.rows[0].image_url,
                    imageId: imageID
                })
            } else {
                res.status(404).json({ message: 'Image not found' });
            }
        } else {
            res.status(404).json({ message: 'Email not associated with any image' });
        }
    } catch (err: any) {
        res.status(500).json({ message: 'Error fetching image', error: err.message })
    }
}