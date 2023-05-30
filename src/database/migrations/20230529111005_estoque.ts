import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('estoque', (table) => {
    table.increments('id').primary();
    table.integer('fornecedor_id').unsigned().references('id').inTable('fornecedor');
    table.integer('n_transacao').notNullable();
    table.string('nome', 255).notNullable();
    table.string('descricao', 255).notNullable();
    table.string('categoria').notNullable();
    table.decimal('valor').notNullable();
    table.integer('quantidade').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('estoque');
}
