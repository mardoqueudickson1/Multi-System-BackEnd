import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('admin_pai', (table) => {
    table.increments('id').primary();
    table.integer('empresa_pai_id').unsigned().notNullable();
    table.foreign('empresa_pai_id').references('empresa_pai.id');
    table.string('nome', 255).notNullable();
    table.string('sobrenome', 255).notNullable();
    table.string('email', 255).notNullable().unique();
    table.string('nif', 50).notNullable().unique();
    table.integer('telefone', 50).notNullable();
    table.string('função', 50).notNullable();
    table.integer('password').notNullable();
    table.date('data_de_nascimento').notNullable();
    table.date('data_de_contratacao');
    table.string('educacao', 255);
    table.string('bio');
    table.string('linguas_falada', 255);
    table.boolean('ativo').defaultTo(true);
    table.string('endereco', 255).notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable('admin_pai');
}
