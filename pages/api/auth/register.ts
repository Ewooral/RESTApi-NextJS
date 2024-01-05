import { NextApiRequest, NextApiResponse } from "next";
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
} from "@azure/storage-blob";
import multer from "multer";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import sharp from "sharp";
import connectToDatabase from "@/lib/connectToDatabase";
dotenv.config();

interface MulterRequest extends NextApiRequest {
  file: any;
}

const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: MulterRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await registerUser(req, res);
  } else if (req.method === "GET") {
    await generateSasUrl(req, res);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

async function registerUser(req: MulterRequest, res: NextApiResponse) {
  await new Promise<void>((resolve, reject) => {
    upload.single("userImage")(req as any, res as any, async (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });

  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }

  try {
    // Resize the image to 200x200 pixels
    const resizedImageBuffer = await sharp(req.file.buffer)
      .resize(200, 200)
      .toBuffer();

    // Create a BlobServiceClient object which will be used to create a container client
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.AZURE_STORAGE_CONNECTION_STRING!
    );

    // Get a reference to a container
    const containerClient = blobServiceClient.getContainerClient(
      process.env.AZURE_STORAGE_CONTAINER_NAME!
    );
    
    console.log("blobServiceClient::", blobServiceClient)
    console.log("containerClient::", containerClient);
    console.log("containerClient.exists()::", containerClient.exists());


    // Create the container if it does not exist
    if (!containerClient.exists()) {
      console.log("container does not exist");
      await containerClient.create();
      console.log("container created");
    }

    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(
      req.file.originalname
    );

    // Upload data to the blob
    const uploadBlobResponse = await blockBlobClient.upload(
      resizedImageBuffer,
      resizedImageBuffer.length
    );

    console.log(
      `Upload block blob ${req.file.originalname} successfully`,
      uploadBlobResponse.requestId
    );

    // save user input data coming from the frontend into formData variable and destrusture it
    const formData = req.body;
    const { firstName, lastName, email, password, secretPin, role } = formData;

    // connect to the database and create a new database called manage-users if it doesn't exist yet and store it in a variable called client
    const client = await connectToDatabase();
    const db = client.db("manage-users"); // your database name

    // check if the user already exists in the database
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash the password and secretPin
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedSecretPin = await bcrypt.hash(secretPin, 10);

    // insert the user into the database
    const result = await db.collection("users").insertOne({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      secretPin: hashedSecretPin,
      role,
      // imageName: req.file.originalname,
      imageName: blockBlobClient.url,
    });

    console.log("what happens when user info is saved::", result);

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading file" });
  }
}


// 
async function generateSasUrl(req: NextApiRequest, res: NextApiResponse) {
  const blobName = req.query.blobName;
  console.log("blobName::", blobName);

  if (!blobName) {
    return res
      .status(400)
      .json({ message: "Missing blobName query parameter" });
  }

  const sharedKeyCredential = new StorageSharedKeyCredential(
    process.env.AZURE_STORAGE_ACCOUNT_NAME!,
    process.env.AZURE_STORAGE_ACCOUNT_KEY!
  );

  const blobSAS = generateBlobSASQueryParameters(
    {
      containerName: process.env.AZURE_STORAGE_CONTAINER_NAME!,
      blobName: blobName as string,
      permissions: BlobSASPermissions.parse("r"), // "r" for read
      startsOn: new Date(),
      expiresOn: new Date(new Date().valueOf() + 86400), // 1 day later
    },
    sharedKeyCredential
  ).toString();

  const sasUrl = `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${process.env.AZURE_STORAGE_CONTAINER_NAME}/${blobName}?${blobSAS}`;

  res.json({ sasUrl });
}
