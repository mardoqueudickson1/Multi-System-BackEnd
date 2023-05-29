import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('fornecedor', (table) => {
    table.increments('id').primary();
    table.string('nome', 255).notNullable();
    table.string('telefone', 255).notNullable();
    table.string('endereco').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('fornecedor');
}
