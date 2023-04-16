import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'mardoqueu',
    password: 'palavra',
    database: 'potter_house_db',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: __dirname + '/db/migrations',
  },
  seeds: {
    directory: __dirname + '/db/seeds',
  },
};

export default config;
