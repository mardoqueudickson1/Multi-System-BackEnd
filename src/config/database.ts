import knex from 'knex';
import knexfile from '../../knexfile';

const db = knex(knexfile);

export default db;
