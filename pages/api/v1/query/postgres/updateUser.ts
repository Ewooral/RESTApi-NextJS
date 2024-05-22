import { NextApiRequest, NextApiResponse } from "next";
import { query } from '@/lib/connectToPostgres'; // Replace with the actual path to your connectToPostgres.ts file

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { email, firstname, lastname, initials } = req.body;
    console.log("REQ BODY::", req.body)

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const fields = {firstname, lastname, initials };
    const updates = [];
    const values = [];
    const updatedFields = [];

    let i = 1;
    let field: keyof typeof fields;
    for (field in fields) {
      if (fields[field] !== undefined) {
        updates.push(`${field} = $${i}`);
        values.push(fields[field]);
        updatedFields.push(field);
        i++;
      }
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'At least one field to update is required' });
    }

    values.push(email);
    const text = `UPDATE users SET ${updates.join(', ')} WHERE email = $${i} RETURNING id`;

    try {
      const result = await query(text, values);
      const id = result.rows[0].id;
      const shortId = id.substring(0, 3) + '...';

     
      res.status(200).json({
        message: 'Profile updated successfully',
        id: shortId,
        updatedFields,
      });
    } catch (error) {
      res.status(500).json({ error: 'Database error' });
    }
  } else { 
    res.status(405).json({ error: 'Method not allowed' });
  }
}



