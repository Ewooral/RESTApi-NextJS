import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { logError } from '@/lib/logger';
import { getSession } from '@/lib/sessionManager';
import { createImageTable_POSTGRES, insertImageToTable_POSTGRES, updateUserImage_POSTGRES } from '@/repositories/users/imageRepository';

interface MulterRequest extends NextApiRequest {
  files: any[];
}

type Data = {
    message?: string;
    imageUrls?: string[];
    imageIds?: string[];
    };

// Configure multer to store uploaded files in memory
const upload = multer({ storage: multer.memoryStorage() });

// Initialize Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

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
    upload.array('userImages', 10)(req as any, res as any, async (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }

  try {
    const imageIds = [];
    const imageUrls = [];

    for (const file of req.files) {
      const imageData = file.buffer.toString('base64');
      const cloudinaryResult = await cloudinary.v2.uploader.upload(`data:image/jpeg;base64,${imageData}`, {
        folder: 'uploads',
        public_id: file.originalname,
      });
      imageIds.push(await insertImageToTable_POSTGRES(cloudinaryResult.public_id, file.originalname, cloudinaryResult.secure_url));
      imageUrls.push(cloudinaryResult.secure_url);
    }

    await updateUserImage_POSTGRES(userId as string, imageIds[0]);

    res.status(200).json({
        message: 'Images uploaded successfully',
        imageUrls,
        imageIds,
    });
  } catch (err: any) {
    res.status(500).json({ message: 'Error uploading images', error: err.message });
  }
}
