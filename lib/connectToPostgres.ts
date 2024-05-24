import { Pool } from 'pg';

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS,
//   port: Number(process.env.DB_PORT),
//   max: 20,
//   idleTimeoutMillis: 30000,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

const pool = new Pool({
  connectionString: process.env.POSTGRES_DB_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
});

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