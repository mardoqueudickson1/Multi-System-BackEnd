import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('estoque', (table) => {
    table.increments('id').primary();
    table.integer('fornecedor_id').unsigned().references('id').inTable('fornecedor');
    table.string('n_transacao').notNullable();
    table.string('nome', 255).notNullable();
    table.string('descricao', 255).notNullable();
    table.string('categoria').notNullable();
    table.string('marca', 255).notNullable();
    table.enum('estado', ['bom', 'normal', 'mau', 'em_uso', 'novo']).notNullable();
    table.string('cor', 255).notNullable();
    table.decimal('valor').notNullable();
    table.integer('quantidade').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('estoque');
}
//A
