import { Knex } from 'knex';
import path from 'path';

const config: Knex.Config = {
  client: 'postgresql',
  connection: {
    host: 'localhost',
    user: 'mardoqueu',
    password: 'palavra',
    database: 'knexdb',
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
