import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('contas', (table) => {
    table.increments('id').primary();
    table.string('descricao').notNullable();
    table.enum('tipo', ['ativo', 'passivo']).notNullable();
    table.float('saldo')
    table.integer('empresa_filha_id').unsigned().references('empresa_filha.id');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('contas');
}
