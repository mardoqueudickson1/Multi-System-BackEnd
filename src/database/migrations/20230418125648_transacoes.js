const Knex = require('knex');

async function up(knex) {
  return knex.schema.createTable('transacoes', (table) => {
    table.increments('id').primary();
    table.integer('empresa_filha_id').unsigned().notNullable();
    table.foreign('empresa_filha_id').references('empresa_filha.id');
    table.string('descricao').notNullable();
    table.float('valor').notNullable();
    table.enum('tipo', ['receita', 'despesa', 'compra', 'pagamento']).notNullable();
    table.timestamps(true, true);
  });
}

async function down(knex) {
  return knex.schema.dropTable('transacoes');
}

module.exports = {
  up,
  down,
};
