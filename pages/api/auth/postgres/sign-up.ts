import { query } from '@/lib/connectToPostgres'; // replace with the actual path to your connectToPostgres.ts file
import { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { errorType } from '@/types/users';

interface MulterRequest extends NextApiRequest {
  file: any;
}
dotenv.config();

export default async function handler(req: MulterRequest, res: NextApiResponse) {
const { firstname, lastname, email, password } = req.body;
console.log("Data::", req.body);

// Hash the password before storing it in the database
const hashedPassword = await bcrypt.hash(password, 10);

const insertUserText = 'INSERT INTO users(firstname, lastname, email, password) VALUES($1, $2, $3, $4) RETURNING *';
const values = [firstname, lastname, email, hashedPassword];


try {
    const dbResponse = await query(insertUserText, values);
    console.log("dbResponse::", dbResponse);
    res.status(200).json(dbResponse.rows[0]);
} catch (err: any) {
  console.error(err);
  const serverError = err as errorType;
  const errorMessage = serverError.response?.data?.message || serverError.message;
  res.status(500).json({ error: errorMessage });
}
}