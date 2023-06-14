const Knex = require('knex');

async function up(knex) {
  return knex.schema.createTable('fornecedor', (table) => {
    table.increments('id').primary();
    table.string('nome', 255).notNullable();
    table.string('telefone', 255).notNullable();
    table.string('endereco').notNullable();
    table.timestamps(true, true);
  });
}

async function down(knex) {
  knex.schema.dropTable('fornecedor');
}

module.exports = {
  up,
  down,
};
