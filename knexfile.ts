/* eslint-disable @typescript-eslint/no-unused-vars */
const Knex = require('knex');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const PORT_DB = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 0;

const developmentConfig = {
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

const productionConfig = {
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

const config = process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig;

module.exports = config;
