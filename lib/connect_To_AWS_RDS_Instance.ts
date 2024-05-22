import { Pool } from 'pg';

const pool = new Pool({
  user: 'ewooral',
  host: 'ec2-13-60-65-102.eu-north-1.compute.amazonaws.com',
  database: 'generaldb',
  password: 'OWusu123',
  port: 5432,
  // max: 20,
  // idleTimeoutMillis: 30000,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
});

// Connect the pool when the application starts
pool.connect().then(() => console.log('Database connected successfully')).catch(console.error);

export const query_AWS_RDS = async (text: string, params: any[]) => {
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