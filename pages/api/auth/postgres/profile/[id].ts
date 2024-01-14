import { query } from '@/lib/connectToPostgres'; // replace with the actual path to your connectToPostgres.ts file
import { NextApiRequest, NextApiResponse } from "next";
import { errorType } from '@/types/users';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query; // assuming the id is sent in the request query

    const getUserProfileText = 'SELECT * FROM users WHERE id = $1';
    const values = [id];

    try {
      const dbResponse = await query(getUserProfileText, values);
      if (dbResponse.rowCount === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json({ user: dbResponse.rows[0] });
      }
    } catch (err: any) {
      console.error(err);
      const serverError = err as errorType;
      const errorMessage = serverError.response?.data?.message || serverError.message || 'An error occurred during fetching user profile.';
      res.status(500).json({ error: errorMessage });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' }); // if the request method is not GET
  }
}

/**
 * In this code, the handler function checks if the request method is GET. If it is, it extracts 
 * the id from the request query, sends a SELECT query to the database to fetch the user with the 
 * given id, and sends the user data in the response. If the user is not found, it sends a 404 response. 
 * If an error occurs during the operation, it sends a 500 response with the error message. If the request 
 * method is not GET, it sends a 405 response
 */