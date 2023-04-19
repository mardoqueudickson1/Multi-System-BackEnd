import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('admin_filho', (table) => {
    table.increments('id').primary();
    table.integer('empresa_filha_id').unsigned().notNullable();
    table.foreign('empresa_filha_id').references('empresa_filha.id');
    table.integer('role_id').unsigned();
    table.foreign('role_id').references('role.id');
    table.string('nome', 255).notNullable();
    table.string('sobrenome', 255).notNullable();
    table.string('email', 255).notNullable().unique();
    table.string('nif', 50).notNullable().unique();
    table.string('telefone', 50).notNullable();
    table.string('password_hash').notNullable();
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
  knex.schema.dropTable('admin_filho');
}
