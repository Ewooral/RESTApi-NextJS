import { query as dbQuery } from '../lib/connectToPostgres';
import db from '../lib/connectToPostgresWithKnex';


const createUsersTableText = `
  CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`;

const createProfilesTableText = `
  CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    image VARCHAR(255)
  )
`;

export const executeQuery = async (text: string, params: any[]) => {
  try {
    const tableNameMatch = text.match(/CREATE TABLE IF NOT EXISTS (\w+)/);
    const tableName = tableNameMatch ? tableNameMatch[1] : '';

    const exists = await db.schema.hasTable(tableName);
    if (exists) {
      console.log(`Table '${tableName}' already exists. No action was performed.`);
    } else {
      const res = await dbQuery(text, params);
      console.log(`Table '${tableName}' created successfully.`);
      return res;
    }
  } catch (err: any) {
    // console.error('Error executing query', err);
    if (err.code === 'ECONNREFUSED') {
      console.error('Connection to the database was refused. Please check your database connection settings.');
    }
    throw err;
  }
};

executeQuery(createUsersTableText, []);
executeQuery(createProfilesTableText, []);