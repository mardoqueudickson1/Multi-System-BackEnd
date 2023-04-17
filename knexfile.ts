import { Knex } from 'knex';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const config: Knex.Config = {
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DD_USER,
    password: 'palavra',
    database: process.env.DB,
  },

  migrations: {
    tableName: 'knex_migrations',
    directory: path.join(__dirname, 'src', 'database', 'migrations'),
  },
  seeds: {
    directory: path.join(__dirname, 'src', 'database', 'seeds'),
  },
};

export default config;
