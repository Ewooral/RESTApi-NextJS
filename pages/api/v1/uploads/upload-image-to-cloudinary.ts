import { NextApiRequest, NextApiResponse } from 'next'
import multer from 'multer'
import cloudinary from 'cloudinary'
import { logError } from "@/lib/logger";
import { getSession, updateSession } from '@/lib/sessionManager';
import { createImageTable_POSTGRES, insertImageToTable_POSTGRES, updateUserImage_POSTGRES } from '@/repositories/users/imageRepository';

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

    try {
        await createImageTable_POSTGRES();
    } catch (e: any) {
        logError('Error creating images table: ' + e.message, session.firstname + ' ' + session.lastname);
        return res.status(500).json({ status: 'Image table creation failed' });
    }

    await new Promise<void>((resolve, reject) => {
        // upload.array('userImage', 'specify limit')
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
        console.log("IMAGE DATA:: ", cloudinaryResult)

        const imageId = await insertImageToTable_POSTGRES(cloudinaryResult.public_id, req.file.originalname, cloudinaryResult.secure_url);
        console.log("imaged Id:: ", imageId)
        // @ts-ignore
        await updateUserImage_POSTGRES(userId, imageId);

        res.status(200).json({
            message: 'Image uploaded successfully',
            imageUrl: cloudinaryResult.secure_url,
            imageId: cloudinaryResult.public_id,
        })
    } catch (err: any) {
        console.log("ERROR:: ", err);
        
        res.status(500).json({ message: 'Error uploading image', error: err.message })
    }
}
