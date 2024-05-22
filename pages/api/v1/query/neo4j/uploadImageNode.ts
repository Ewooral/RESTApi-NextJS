import { NextApiRequest, NextApiResponse } from 'next'
import multer from 'multer'
import cloudinary from 'cloudinary'
import { getSession } from '@/lib/sessionManager';

import { updateUserImage_MONGODB, insertImageToTable_MONGODB, createImageTable_MONGODB } from '@/repositories/users/imageRepository';


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

export default async function handler(req: MulterRequest, res: NextApiResponse) {
    const session = await getSession(req, res);
    const userId = session.userId;

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

        // Create image table in MongoDB
        await createImageTable_MONGODB();

        // Insert image to MongoDB
        const imageId = await insertImageToTable_MONGODB(cloudinaryResult.public_id, req.file.originalname, cloudinaryResult.secure_url);
        // await createAndIsertImageToGraph(imageId, req.file.originalname, cloudinaryResult.secure_url);

        // Update user's image_id in Neo4j
        await updateUserImage_MONGODB(userId as string, imageId.toString());

        res.status(200).json({
            message: 'Image uploaded successfully',
            imageUrl: cloudinaryResult.secure_url,
            imageId: cloudinaryResult.public_id,
        })
    } catch (err: any) {
        res.status(500).json({ message: 'Error uploading image', error: err.message })
    }
}

