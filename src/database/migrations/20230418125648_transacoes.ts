import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('transacoes', (table) => {
    table.increments('id').primary();
    table.string('descricao').notNullable();
    table.float('valor').notNullable();
    table.enum('tipo', ['receita', 'despesa', 'compra', 'pagamento']).notNullable();
    table.integer('empresa_filha_id').unsigned().references('empresa_filha.id');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('transacoes');
}
