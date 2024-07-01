import { NextApiRequest, NextApiResponse } from 'next';
import { deleteUser_POSTGRES } from '@/repositories/users/userRepository';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email } = req.body;
  console.log("email::", email);
  

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Delete the user from the database
    const deletionResult = await deleteUser_POSTGRES(email);

    // Check if the user was successfully deleted
    if (deletionResult) {
      return res.status(200).json({ message: 'User successfully deleted' });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}