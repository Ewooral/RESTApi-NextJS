// knexfile.ts

import { PoolConfig } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connection: PoolConfig = {
  database: process.env.DB_NAME || 'my_db',
  user: process.env.DB_USER || 'username',
  password: process.env.DB_PASS || 'password',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
};

module.exports = {
  staging: {
    client: 'postgresql',
    connection,
    pool: {
      min: 2,
      max: 10
    },
  },
  development: {
    client: 'postgresql',
    connection,
    pool: {
      min: 2,
      max: 10
    },
    
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },
};