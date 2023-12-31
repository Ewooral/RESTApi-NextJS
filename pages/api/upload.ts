// pages/api/upload.js
import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

interface MulterRequest extends NextApiRequest {
    file: any;
  }
  
// Configure multer to store uploaded files in memory
const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler (req: MulterRequest, res: NextApiResponse){
    await new Promise<void>((resolve, reject) => {
      upload.single('userImage')(req as any, res as any, async (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
  }

  try {
    // Resize the image to 200x200 pixels
    const resizedImageBuffer = await sharp(req.file.buffer)
      .resize(200, 200)
      .toBuffer();

    // Save the resized image to the file system (for this example)
    // In a real application, you might want to store the image in a database or upload it to a cloud storage service
    const outputPath = path.join(process.cwd(), 'public', 'uploads', req.file.originalname);
    await fs.writeFile(outputPath, resizedImageBuffer);

    res.status(200).json({ message: 'Image uploaded and resized successfully' });
  } catch (err: any) {
    res.status(500).json({ message: 'Error processing image', error: err.message });
  }
};