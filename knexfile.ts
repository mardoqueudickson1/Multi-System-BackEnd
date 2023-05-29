import { Knex } from 'knex';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const PORT_DB: number = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 0;

const developmentConfig: Knex.Config = {
  client: 'postgresql',
  connection: {
    host: 'localhost',
    port: PORT_DB,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },

  migrations: {
    tableName: 'knex_migrations',
    directory: path.join(__dirname, 'src', 'database', 'migrations'),
  },
  seeds: {
    directory: path.join(__dirname, 'src', 'database', 'seeds'),
  },
};

const productionConfig: Knex.Config = {
  client: 'postgresql',
  connection: process.env.DATABASE_URL,

  migrations: {
    tableName: 'knex_migrations',
    directory: path.join(__dirname, 'src', 'database', 'migrations'),
  },
  seeds: {
    directory: path.join(__dirname, 'src', 'database', 'seeds'),
  },
};

const config: Knex.Config = process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig;

export default config;
