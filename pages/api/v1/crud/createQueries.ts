import { NextApiRequest, NextApiResponse } from 'next';
import { queryFunctions } from '@/repositories/users/imageRepository';
import {createUserStatusTable_POSTGRES} from '@/repositories/users/userRepository';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const queryFunction = queryFunctions.createImageTable_MONGODB


  if (!queryFunction) {
    return res.status(404).json({ error: `Query function not found` });
  }

  const queryParams = {
    imageId: 'uploads/Screenshot from 2024-04-27 14-27-21.png',
    fileName: 'Screenshot from 2024-04-27 14-27-21.png',
    imageUrl: 'https://res.cloudinary.com/dn1lqngds/image/upload/v1714228590/uploads/Screenshot%20from%202024-04-27%2014-27-21.png.png'
  }

  try {
    const result = await createUserStatusTable_POSTGRES();
    return res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
