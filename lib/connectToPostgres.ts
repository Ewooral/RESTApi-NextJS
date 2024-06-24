import { Pool } from 'pg';
import dotenv from 'dotenv';

const NODE_ENV_BS = process.env.NEXT_PUBLIC_NODE_ENV;
console.log("NODE ENV BS::: ", NODE_ENV_BS)

dotenv.config();

let poolConfig;

// Check if the application is running in a production environment
// if (process.env.NODE_ENV === 'production') {
  if (NODE_ENV_BS === 'production') {
  // Use connection string for production, e.g., AWS RDS
  poolConfig = {
    connectionString: process.env.POSTGRES_DB_STRING,
    ssl: {
      rejectUnauthorized: false,
    },
  };
} else {
  // Use environment variables for local development
  poolConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: Number(process.env.DB_PORT),
  
  };
}

const pool = new Pool(poolConfig);

// Connect the pool when the application starts
pool.connect().then(() => console.log('Database connected successfully')).catch(console.error);

export const query = async (text: string, params: any[]) => {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } catch (err) {
    console.error('Error occurred during database operation:', err);
    throw err; // re-throw the error so it can be caught and handled by the calling function
  } finally {
    // Make sure to release the client back to the pool even if there was an error
    client.release();
  }
};