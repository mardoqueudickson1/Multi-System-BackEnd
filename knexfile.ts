import { Knex } from 'knex';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './db.sqlite',
  },

  // client: 'postgresql',
  // connection: process.env.DATABASE_URL,

  migrations: {
    tableName: 'knex_migrations',
    directory: path.join(__dirname, 'src', 'database', 'migrations'),
  },
  seeds: {
    directory: path.join(__dirname, 'src', 'database', 'seeds'),
  },
};

export default config;
