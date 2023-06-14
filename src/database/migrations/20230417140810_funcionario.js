const Knex = require('knex');

async function up(knex) {
  return knex.schema.createTable('role', (table) => {
    table.increments('id').primary();
    table.integer('empresa_filha_id').unsigned().notNullable();
    table.foreign('empresa_filha_id').references('empresa_filha.id');
    table.string('nome', 255).notNullable();
    table.string('descricao', 255);
    table.timestamps(true, true);
  });
}

async function down(knex) {
  return knex.schema.dropTable('role');
}

module.exports = {
  up,
  down,
};
