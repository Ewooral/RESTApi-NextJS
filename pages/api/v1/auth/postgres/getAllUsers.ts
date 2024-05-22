import { query } from '@/lib/connectToPostgres'; // replace with the actual path to your connectToPostgres.ts file
import { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { errorType } from '@/types/users';
interface MulterRequest extends NextApiRequest {
  file: any;
}

export default async function handler(req: MulterRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
      try {
        const dbResponse = await query('SELECT * FROM users', []);
        // console.log("dbResponse::", dbResponse);
        res.status(200).json({ message: 'Users fetched successfully!', users: dbResponse.rows });
      } catch (err: any) {
        console.error("Error has occured: ", err);
        const serverError = err as errorType;
        const errorMessage = serverError.response?.data?.message || serverError.message || 'An error occurred while fetching users.';
        res.status(500).json({ error: errorMessage });
      }
    } else {
     }
  }