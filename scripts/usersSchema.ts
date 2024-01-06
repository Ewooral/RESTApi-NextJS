// scripts/setupDatabase.ts
import { errorType } from '@/types/users';
import { query as dbQuery } from '../lib/connectToPostgres';

const createUsersTableText = `
  CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`;

export const executeQuery = async (text: string, params: any[]) => {
    try {
      const res = await dbQuery(text, params);
      return res;
    }catch (err: any) {
      console.error('Error executing query', err);
      throw err;
    }
};