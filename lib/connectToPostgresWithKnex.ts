// db.ts
import knex from "knex";
import dotenv from "dotenv";
import { PoolConfig } from 'pg';
dotenv.config();

const db = knex({
  client: "pg",
  connection: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
  },
});

export async function testConnection() {
  try {
    await db.raw('select 1+1 as result');
    console.log('Database connection successful');
  } catch (error) {
    console.error('Failed to connect to the database', error);
  }
}

testConnection();

export default db;