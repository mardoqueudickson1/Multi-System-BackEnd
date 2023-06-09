import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('pessoa_receber', (table) => {
    table.increments('id').primary();
    table.string('nome', 255).notNullable();
    table.string('telefone', 255).notNullable();
    table.string('endereco', 255).notNullable();
    table.string('email', 255).notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('pessoa_receber');
}
