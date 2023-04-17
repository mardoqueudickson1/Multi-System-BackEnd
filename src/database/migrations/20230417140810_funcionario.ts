import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('role', (table) => {
    table.increments('id').primary();
    table.string('nome', 255).notNullable();
    table.string('descricao', 255);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('role');
}
