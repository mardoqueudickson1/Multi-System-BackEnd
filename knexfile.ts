import { Knex } from 'knex';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const config: Knex.Config = {
  client: process.env.NODE_ENV === 'production' ? 'postgresql' : 'sqlite3',
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    filename: process.env.NODE_ENV === 'production' ? undefined : './db.sqlite',
  },
  useNullAsDefault: true,
  migrations: {
    tableName: 'knex_migrations',
    directory: path.join(__dirname, 'src', 'database', 'migrations'),
  },
  seeds: {
    directory: path.join(__dirname, 'src', 'database', 'seeds'),
  },
};

export default config;
