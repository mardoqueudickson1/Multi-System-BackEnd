import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('departamento', (table) => {
    table.increments('id').primary();
    table.integer('empresa_filha_id').unsigned().notNullable();
    table.foreign('empresa_filha_id').references('empresa_filha.id');
    table.string('nome', 255).notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('departamento');
}
