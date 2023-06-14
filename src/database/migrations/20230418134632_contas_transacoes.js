const Knex = require('knex');

async function up(knex) {
  return knex.schema.createTable('contas_transacoes', (table) => {
    table.integer('id_conta').unsigned().references('id').inTable('contas').onDelete('CASCADE');
    table.integer('id_transacao').unsigned().references('id').inTable('transacoes').onDelete('CASCADE');
    table.timestamps(true, true);
  });
}

async function down(knex) {
  return knex.schema.dropTable('contas_transacoes');
}

module.exports = {
  up,
  down,
};
