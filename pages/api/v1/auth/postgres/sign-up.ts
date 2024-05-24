import { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import { createUser_POSTGRES, createUser_NEO4J, createStatuses_POSTGRES } from '@/repositories/users/userRepository';


dotenv.config();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { firstname, lastname, email, password, isStudent, title, terms } = req.body;
  console.log("req.body:", req.body)

  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const params = {
      firstname,
      lastname,
      email,
      password: hashedPassword,
      isStudent,
      title,
      terms
    }
    // create user_statuses table if not exists
    await createStatuses_POSTGRES();
    // Create the user
    const user = await createUser_POSTGRES(firstname, lastname, email, hashedPassword, isStudent, title, terms);
    res.status(200).json({ message: 'Registration successful!', user });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

