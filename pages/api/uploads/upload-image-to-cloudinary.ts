import { NextApiRequest, NextApiResponse } from 'next'
import multer from 'multer'
import cloudinary from 'cloudinary'
import {query} from '@/lib/connectToPostgres';
import {errorType} from "@/types/users";
import {logError} from "@/lib/logger";
import { getSession, updateSession } from '@/lib/sessionManager';

interface MulterRequest extends NextApiRequest {
    file: any
}

// Configure multer to store uploaded files in memory
const upload = multer({ storage: multer.memoryStorage() })

// Initialize Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const config = {
    api: {
        bodyParser: false,
    },
}

const createImageTable = async () => {
    const createTableText = `
        CREATE TABLE IF NOT EXISTS images (
                                              id SERIAL PRIMARY KEY,
                                              image_id TEXT NOT NULL,
                                              file_name TEXT NOT NULL,
                                              image_url TEXT NOT NULL,
                                              user_id UUID,
                                              FOREIGN KEY (user_id) REFERENCES Users(id)
        );
    `;

    await query('BEGIN', []);
    await query(createTableText, []);
    await query('COMMIT', []);
}

// Modify the insertImageToTable function to update the existing record if it exists
const insertImageToTable = async (imageId: string, fileName: string, imageUrl: string, userId: string | undefined) => {
    const insertOrUpdateImageQuery = `
        INSERT INTO images (image_id, file_name, image_url, user_id) 
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (user_id) 
        DO UPDATE SET image_id = $1, file_name = $2, image_url = $3;
    `;
    const values = [imageId, fileName, imageUrl, userId];
    await query(insertOrUpdateImageQuery, values);
}

export default async function handler(req: MulterRequest, res: NextApiResponse) {
    const session = await getSession(req, res);
    const userId = session.userId; // Get the user_id from the session

    try {
        await createImageTable();
    } catch (e: any) {
        const serverError = e as errorType
        logError('Error uploading image: ' + serverError,  session.firstname + ' ' + session.lastname, )
        return res.status(500).json({status: 'Image table creation failed'})
    } 

    await new Promise<void>((resolve, reject) => {
        upload.single('userImage')(req as any, res as any, async (err) => {
            if (err) {
                return reject(err)
            }
            resolve()
        })
    })

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' })
    }

    try {
        const imageData = req.file.buffer.toString('base64')

        const cloudinaryResult = await cloudinary.v2.uploader.upload(
            `data:image/jpeg;base64,${imageData}`,
            {
                folder: 'uploads',
                public_id: req.file.originalname,
            },
        )
        // Add image URL to the session
        session.imageUrl = cloudinaryResult.secure_url;
        session.imageId = cloudinaryResult.public_id;

        await updateSession(req, res, session);
        console.log('Image URL added to session', session)

        // Include the user_id when inserting the image data into the images table
        await insertImageToTable(cloudinaryResult.public_id, req.file.originalname, cloudinaryResult.secure_url, userId);

        res.status(200).json({
            message: 'Image uploaded successfully',
            imageUrl: cloudinaryResult.secure_url,
            imageId: cloudinaryResult.public_id,
        })
    } catch (err: any) {
        res.status(500).json({ message: 'Error uploading image', error: err.message })
    }
}