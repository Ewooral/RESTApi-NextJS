// import { NextApiRequest, NextApiResponse } from 'next'
// import multer from 'multer'
// import cloudinary from 'cloudinary'
// import {query} from '@/lib/connectToPostgres';
// import {errorType} from "@/types/users";
// import {logUserActions, logError} from "@/lib/logger";
// import { getSession } from '@/lib/sessionManager';
//
// interface MulterRequest extends NextApiRequest {
//     file: any
// }
//
// // Configure multer to store uploaded files in memory
// const upload = multer({ storage: multer.memoryStorage() })
//
// // Initialize Cloudinary
// cloudinary.v2.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// })
//
// export const config = {
//     api: {
//         bodyParser: false,
//     },
// }
//
//
//
// export default async function handler(req: MulterRequest, res: NextApiResponse) {
//     // Get the session
//     const session = await getSession(req, res);
//     // Access the user's information
//     // @ts-ignore
//
//
//     const createTableText = `
//         CREATE TABLE IF NOT EXISTS images (
//                                               id SERIAL PRIMARY KEY,
//                                               image_id TEXT NOT NULL,
//                                               file_name TEXT NOT NULL,
//                                               image_url TEXT NOT NULL
//         );
//
//     `;
// const inserterText = `
//     INSERT INTO images (image_id, file_name, image_url) VALUES ($1, $2, $3);
// `;
// const values = ['image_id', 'file_name', 'image_url'];
//
// try{
//     await query('BEGIN', []);
//     await query(createTableText, []);
//   await query('COMMIT', []);
//   res.status(500).json({status: 'Image table created successfully'})
// }
// catch (e: any) {
//     const serverError = e as errorType
//     logError('Error uploading image: ' + serverError,  session.firstname + ' ' + session.lastname, )
//
// }
//
//
//
//     await new Promise<void>((resolve, reject) => {
//         upload.single('userImage')(req as any, res as any, async (err) => {
//             if (err) {
//                 return reject(err)
//             }
//             resolve()
//         })
//     })
//
//     if (!req.file) {
//         res.status(400).json({ message: 'No file uploaded' })
//         return
//     }
//
//     try {
//         // Convert the image data to Base64
//         const imageData = req.file.buffer.toString('base64')
//
//         // Upload the image to Cloudinary
//         const cloudinaryResult = await cloudinary.v2.uploader.upload(
//             `data:image/jpeg;base64,${imageData}`,
//             {
//                 folder: 'uploads', // Optional folder in Cloudinary
//                 public_id: req.file.originalname, // Use the original filename as public_id
//             },
//         )
//
//         // Store image ID and file name in ElephantDB
//
//         try {
//             const insertImage = 'INSERT INTO images (image_id, file_name, image_url) VALUES ($1, $2, $3)';
//             const values = [cloudinaryResult.public_id, req.file.originalname, cloudinaryResult.secure_url];
//             await query(insertImage, values);
//         }
//         catch(err){
//             console.log(err)
//         }
//
//         res.status(200).json({
//             message: 'Image uploaded successfully',
//             imageUrl: cloudinaryResult.secure_url,
//             imageId: cloudinaryResult.public_id,
//         })
//     } catch (err: any) {
//         res.status(500).json({ message: 'Error uploading image', error: err.message })
//     }
// }


import { NextApiRequest, NextApiResponse } from 'next'
import multer from 'multer'
import cloudinary from 'cloudinary'
import {query} from '@/lib/connectToPostgres';
import {errorType} from "@/types/users";
import {logError} from "@/lib/logger";
import { getSession } from '@/lib/sessionManager';

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
            image_url TEXT NOT NULL
        );
    `;

    await query('BEGIN', []);
    await query(createTableText, []);
    await query('COMMIT', []);
}

const insertImageToTable = async (imageId: string, fileName: string, imageUrl: string) => {
    const insertImageQuery = 'INSERT INTO images (image_id, file_name, image_url) VALUES ($1, $2, $3)';
    const values = [imageId, fileName, imageUrl];
    await query(insertImageQuery, values);
}

export default async function handler(req: MulterRequest, res: NextApiResponse) {
    const session = await getSession(req, res);

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

        await insertImageToTable(cloudinaryResult.public_id, req.file.originalname, cloudinaryResult.secure_url);

        res.status(200).json({
            message: 'Image uploaded successfully',
            imageUrl: cloudinaryResult.secure_url,
            imageId: cloudinaryResult.public_id,
        })
    } catch (err: any) {
        res.status(500).json({ message: 'Error uploading image', error: err.message })
    }
}