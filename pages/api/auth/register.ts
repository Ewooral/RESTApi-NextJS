// import { NextApiRequest, NextApiResponse } from 'next';
// import multer from 'multer';
import sharp from 'sharp';
// import { promises as fs } from 'fs';
// import path from 'path';
// import bcrypt from 'bcryptjs';
// import connectToDatabase from '@/lib/connectToDatabase';
// import User from '@/models/User';

// interface MulterRequest extends NextApiRequest {
//   file: any;
// }

// const upload = multer({ storage: multer.memoryStorage() });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler (req: MulterRequest, res: NextApiResponse){
//   await new Promise<void>((resolve, reject) => {
//     upload.single('userImage')(req as any, res as any, async (err) => {
//       if (err) {
//         return reject(err);
//       }
//       resolve();
//     });
//   });

//   if (!req.file) {
//     res.status(400).json({ message: 'No file uploaded' });
//     return;
//   }

//   try {
//     // Resize the image to 200x200 pixels
//     const resizedImageBuffer = await sharp(req.file.buffer)
//       .resize(200, 200)
//       .toBuffer();

//     // Save the resized image to the file system (for this example)
//     // In a real application, you might want to store the image in a database or upload it to a cloud storage service
//     const imageName = `${Date.now()}-${req.file.originalname}`;
//     const outputPath = path.join(process.cwd(), 'public', 'uploads', imageName);
//     await fs.writeFile(outputPath, resizedImageBuffer);

//     const formData = req.body;
//     const { firstName, lastName, email, password, secretPin, role } = formData;

//     // Validate input...

//     const client = await connectToDatabase();
//     const db = client.db("manage-users"); // your database name

//     const existingUser = await db.collection('users').findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const hashedSecretPin = await bcrypt.hash(secretPin, 10);

//     const result = await db.collection('users').insertOne({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//       secretPin: hashedSecretPin,
//       role,
//       imageName,
//     });

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err: any) {
//     res.status(500).json({ message: 'Error processing image', error: err.message });
//   }
// };


import { BlobServiceClient } from '@azure/storage-blob';
import multer from 'multer';
import type { NextApiRequest, NextApiResponse } from 'next';

interface MulterRequest extends NextApiRequest {
  file: any;
}

const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: MulterRequest, res: NextApiResponse) {
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

    // Create a BlobServiceClient object which will be used to create a container client
    const blobServiceClient = BlobServiceClient.fromConnectionString('your-azure-storage-connection-string');

    // Get a reference to a container
    const containerClient = blobServiceClient.getContainerClient('your-container-name');

    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(req.file.originalname);

    // Upload data to the blob
    const uploadBlobResponse = await blockBlobClient.upload(resizedImageBuffer, resizedImageBuffer.length);

    console.log(`Upload block blob ${req.file.originalname} successfully`, uploadBlobResponse.requestId);

    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading file' });
  }
}