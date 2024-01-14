import { query } from '@/lib/connectToPostgres'; // replace with the actual path to your connectToPostgres.ts file
import { NextApiRequest, NextApiResponse } from "next";
import { errorType } from '@/types/users';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { id } = req.query; // assuming the id is sent in the request body
    console.log("id::", id)

    const deleteUserText = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const values = [id];

    try {
      const dbResponse = await query(deleteUserText, values);
      if (dbResponse.rowCount === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json({ message: 'User deleted successfully', user: dbResponse.rows[0] });
      }
    } catch (err: any) {
      console.error(err);
      const serverError = err as errorType;
      const errorMessage = serverError.response?.data?.message || serverError.message || 'An error occurred during deletion.';
      res.status(500).json({ error: errorMessage });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' }); // if the request method is not DELETE
  }
}