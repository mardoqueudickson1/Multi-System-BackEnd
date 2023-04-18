import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('contas_transacoes', (table) => {
    table.integer('id_conta').unsigned().references('id').inTable('contas').onDelete('CASCADE');
    table.integer('id_transacao').unsigned().references('id').inTable('transacoes').onDelete('CASCADE');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('contas_transacoes');
}
