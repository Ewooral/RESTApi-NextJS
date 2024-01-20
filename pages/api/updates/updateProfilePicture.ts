import {NextApiRequest, NextApiResponse} from 'next';
import {
    BlobServiceClient,
    StorageSharedKeyCredential,
  } from "@azure/storage-blob";
import {query} from '@/lib/connectToPostgres';
import multer from 'multer';
import sharp from 'sharp';


interface MulterRequest extends NextApiRequest {
  file: any;
}

const upload = multer({storage: multer.memoryStorage()});
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: MulterRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    await updateProfilePicture(req, res);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

async function updateProfilePicture(req: MulterRequest, res: NextApiResponse) {
  await new Promise<void>((resolve, reject) => {
    upload.single('userImage')(req as any, res as any, async (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });

  if (!req.file) {
    res.status(400).json({message: 'No file uploaded'});
    return;
  }

  try {
    // Resize the image to 200x200 pixels
    const resizedImageBuffer = await sharp(req.file.buffer)
        .resize(200, 200)
        .toBuffer();

    // Upload the image to Azure Blob Storage
    const blobServiceClient = new BlobServiceClient(
        `https://${process.env.AZURE_STORAGE_ACCOUNT ?? ''}.blob.core.windows.net`,
        new StorageSharedKeyCredential(
            process.env.AZURE_STORAGE_ACCOUNT ?? '',
            process.env.AZURE_STORAGE_ACCESS_KEY ?? ''
        )
    );
    const containerClient = blobServiceClient.getContainerClient('images');
    const blobName = `${req.body.email}.jpg`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(resizedImageBuffer, resizedImageBuffer.length);

    // Update the user's profile picture URL in the database
    const text = `UPDATE users SET profile_picture_url = $1 WHERE email = $2`;
    const values = [
      `https://${process.env.AZURE_STORAGE_ACCOUNT}.blob.core.windows.net/images/${blobName}`,
      req.body.email,
    ];
    await query(text, values);

    res.status(200).json({
      message: 'Profile picture updated successfully',
      profilePictureUrl: `https://${process.env.AZURE_STORAGE_ACCOUNT}.blob.core.windows.net/images/${blobName}`,
    });
  } catch (error) {
    res.status(500).json({error: 'Database error'});
  }
}