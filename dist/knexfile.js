'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const path_1 = __importDefault(require('path'));
const dotenv_1 = __importDefault(require('dotenv'));
dotenv_1.default.config();
const config = {
  // client: 'postgresql',
  // connection: {
  //   host: process.env.DATABASE_HOST,
  //   user: process.env.DATABASE_USERNAME,
  //   password: process.env.DATABASE_PASSWORD,
  //   database: process.env.DATABASE,
  // },
  client: 'sqlite3',
  connection: {
    filename: './db.sqlite',
  },
  useNullAsDefault: true,
  migrations: {
    tableName: 'knex_migrations',
    directory: path_1.default.join(__dirname, 'src', 'database', 'migrations'),
  },
  seeds: {
    directory: path_1.default.join(__dirname, 'src', 'database', 'seeds'),
  },
};
exports.default = config;
