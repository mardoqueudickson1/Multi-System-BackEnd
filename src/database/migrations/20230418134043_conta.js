const Knex = require('knex');

async function up(knex) {
  return knex.schema.createTable('contas', (table) => {
    table.increments('id').primary();
    table.string('descricao').notNullable();
    table.enum('tipo', ['ativo', 'passivo']).notNullable();
    table.float('saldo');
    table.integer('empresa_filha_id').unsigned().references('empresa_filha.id');
    table.timestamps(true, true);
  });
}

async function down(knex) {
  return knex.schema.dropTable('contas');
}

module.exports = {
  up,
  down,
};
