// pages/api/v1/auth/postgres/updateUser.ts
import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/connectToPostgres";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const {   firstname, middlename, lastname, email,  username, title, id} = req.body;

    try {
        // Update the user in the database
        await query(
            "UPDATE users SET firstname = $1,  middlename = $2, lastname = $3, email = $4 , title=$5 WHERE id = $6",
            [ firstname, middlename, lastname, email, username, title ]
        );

        return res.json({ message: "User updated successfully" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}