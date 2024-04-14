import { query } from '@/lib/connectToPostgres'; // replace with the actual path to your connectToPostgres.ts file
import { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { errorType } from '@/types/users';

dotenv.config();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
const { firstname, lastname, email, password, isStudent, title, terms } = req.body;
console.log("Data::", req.body);

// Hash the password before storing it in the database
const hashedPassword = await bcrypt.hash(password, 10);

const createTableText = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS users(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  firstname VARCHAR(100),
  lastname VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(100),
  isStudent BOOLEAN,
  title VARCHAR(10),
  terms BOOLEAN
)
`;


const insertUserText = 'INSERT INTO users(firstname, lastname, email, password, isStudent, title, terms) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
const values = [firstname, lastname, email, hashedPassword, isStudent, title, terms];



try {
  await query(createTableText, []); // Create the table if it doesn't exist
  const dbResponse = await query(insertUserText, values);

  res.status(200).json({ message: 'Registration successful!', user: dbResponse.rows[0] });
} catch (err: any) {
  console.error(err);
  const serverError = err as errorType;
  const errorMessage = serverError.response?.data?.message || serverError.message || 'An error occurred during registration.';
  res.status(500).json({ error: errorMessage });
}
}