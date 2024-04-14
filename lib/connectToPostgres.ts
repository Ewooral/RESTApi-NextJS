import { Client } from 'pg';

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: false,
  },
});

// Connect the client when the application starts
client.connect().then(() => console.log('Database connected successfully')).catch(console.error);

export const query = async (text: string, params: any[]) => {
  try {
    const res = await client.query(text, params);
    // console.log("DB CRED:: ", client.host, client.database)
    return res;
  } catch (err) {
    console.error('Error occurred during database operation:', err);
    throw err; // re-throw the error so it can be caught and handled by the calling function
  }
};

