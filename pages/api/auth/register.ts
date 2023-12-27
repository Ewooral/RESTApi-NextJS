import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs'
import connectToDatabase from '@/lib/connectToDatabase';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

interface MulterRequest extends NextApiRequest {
  file: any;
}

/**
 *  'uploads/' is the directory where the uploaded files will be stored. 
 *   You can change this to fit your needs.

 */

// Create the uploads directory if it doesn't exist
const uploadDir = 'public/uploads/';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})

const upload = multer({ storage: storage }); 

/**
 * 
 */
export const config = {
  api: {
    bodyParser: false,
  },
};


export default async function handler(req: MulterRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    upload.single('userImage')(req as any, res as any, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const formData = req.body;
      const { firstName, lastName, email, password, secretPin, role } = formData;
      const userImage = req.file;

      // Validate input...

      const client = await connectToDatabase();
      const db = client.db("manage-users"); // your database name

      const existingUser = await db.collection('users').findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const hashedSecretPin = await bcrypt.hash(secretPin, 10);

      // Get the URL of the uploaded image
      const protocol = req.headers['x-forwarded-proto'] || 'http';
      const host = req.headers.host;
      // const imageUrl = `${protocol}://${host}/${userImage.path}`;
      const imageUrl = `${userImage.path}`;
      const imageName = path.basename(imageUrl)


      const result = await db.collection('users').insertOne({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        secretPin: hashedSecretPin,
        role,
        imageName,
      });

      res.status(201).json({ message: 'User registered successfully' });
    });
  } else {
    res.status(400).json({ message: 'Only POST requests are allowed' });
  }
};