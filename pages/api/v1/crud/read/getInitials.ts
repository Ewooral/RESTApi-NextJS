import { NextApiRequest, NextApiResponse } from "next";
import { logError } from "@/lib/logger";
import { query } from "@/lib/connectToPostgres";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Adjusted query to select the user ID as well
    const queryText = 'SELECT id, firstname, lastname FROM users'; // Ensure your table has an 'id' column
    const result = await query(queryText, []);

    // Map through each user to create an object with their ID and initials
    const usersWithInitials = result.rows.map(user => ({
      id: user.id,
      // Correct the property names to match the SQL query result
      initials: `${user.firstname[0]}${user.lastname[0]}`.toUpperCase()
    }));

    return res.json({ users: usersWithInitials });
  } catch (error) {
    console.log("Errorsssss:::: ", (error as Error).message);
    
    logError(`can't get initials` + (error as Error).message);
    return res.status(500).json({ status: 'Getting initials failed miserably', error: (error as Error).message });
  }
}