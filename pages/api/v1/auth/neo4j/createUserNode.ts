// createUser.ts

import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import runQuery from '@/lib/connectToNeo4J';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { firstname, lastname, email, password, isStudent, title, terms } = req.body;

  // Encrypt the password with bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create a new user node in the Neo4j database
    const query = `
      CREATE (u:User {
        firstname: $firstname,
        lastname: $lastname,
        email: $email,
        password: $password,
        isStudent: $isStudent,
        title: $title,
        terms: $terms
      })
      RETURN u
    `;
    const params = {
      firstname,
      lastname,
      email,
      password: hashedPassword,
      isStudent,
      title,
      terms
    };
    const result = await runQuery(query, params);

    res.status(200).json({ message: 'User created successfully', user: result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
