// Import necessary modules
import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/connectToPostgres";
import { createImageTable_POSTGRES } from "@/repositories/users/imageRepository";

// Define the API endpoint handler function

// Define the API endpoint handler function
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  
    // Extract user ID from query parameters
    const userId = req.query.userId as string;
  
    try {
      // Define SQL query to fetch user's image URL based on their ID
      await createImageTable_POSTGRES()
      const getUserImageUrlQuery = `
        SELECT images.image_url 
        FROM users 
        INNER JOIN images ON users.image_id = images.id 
        WHERE users.id = $1
      `;
  
      // Execute the SQL query
      const result = await query(getUserImageUrlQuery, [userId]);
  
      // Check if the query returned any rows
      if (result.rows.length === 0) {
        return res.status(201).json({ message: "You have not uploaded a profile picture yet, don't forget to do so later on.", isSuccess: false});
      }
  
      // Extract user image URL from the query result
      const userImageUrl = result.rows[0].image_url;
  
      // Return the user image URL in the API response
      return res.status(200).json({ imageUrl: userImageUrl });
    } catch (error) {
      // Handle error
    }
  }