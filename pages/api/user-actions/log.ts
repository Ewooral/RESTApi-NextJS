import { NextApiRequest, NextApiResponse } from "next";
import { query } from '@/lib/connectToPostgres'; // replace with the actual path to your connectToPostgres.ts file
import logUserActions from "@/lib/logger";


// Continue with your database operations...

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { level, message, user } = req.body;
    const action = message.action
    const details = message.details
    console.log("REQUEST:: ", req.body)

    const createTableText = `
        CREATE TABLE IF NOT EXISTS user_actions (     
                                                    id SERIAL PRIMARY KEY, 
                                                    level VARCHAR(255),
                                                    action VARCHAR(255),
                                                    "user" VARCHAR(255),
                                                    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                                                    details TEXT
)
                                                
    `;

    const insertActionText = 'INSERT INTO user_actions(level, action, "user", details) VALUES($1, $2, $3, $4) RETURNING *';
    const values = [level, action, user, details];

    try {
        await query('BEGIN', []);
        await query(createTableText, []); // Create the table if it doesn't exist
        // Add a delay to give the database time to create the table
        await new Promise(resolve => setTimeout(resolve, 1000));
        const dbResponse = await query(insertActionText, values);
        await query('COMMIT', []);

        // Log the action with the specified level and user
        logUserActions.log(level, action, { user });

        res.status(200).json({ status: 'Logged successfully', action: dbResponse.rows[0] });
    } catch (err: any) {
        await query('ROLLBACK', []);
        console.error('Error logging user action:', err);
        res.status(500).json({ status: 'Error logging user action' });
    }
}