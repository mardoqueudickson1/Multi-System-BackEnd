import { Knex } from 'knex';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const config: Knex.Config = {
  client: 'postgresql',
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
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

//postgres://pottertestepg_user:xzKdyIkXYvdiJPfmVyLMLU2k5MB4UCEU@dpg-chjmagbhp8u4bdps2r5g-a/pottertestepg
