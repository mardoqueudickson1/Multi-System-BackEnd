import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('empresa_filha', (table) => {
    table.increments('id').primary();
    table.integer('empresa_pai_id').unsigned().notNullable();
    table.foreign('empresa_pai_id').references('empresa_pai.id');
    table.string('nome', 255).notNullable();
    table.string('email', 255).notNullable().unique();
    table.string('nif', 50).notNullable().unique();
    table.integer('telefone', 50).notNullable();
    table.string('especialidade').notNullable();
    table.string('endereco', 255).notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('empresa_filha');
}
