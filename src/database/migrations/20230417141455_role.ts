import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('funcionario', (table) => {
    table.increments('id').primary();
    table.integer('departamento_id').unsigned().notNullable();
    table.foreign('departamento_id').references('departamento.id');
    table.integer('role_id').unsigned();
    table.foreign('role_id').references('role.id');
    table.integer('n_funcionario', 50).notNullable();
    table.string('nome', 255).notNullable();
    table.string('sobrenome', 255).notNullable();
    table.string('email', 255).notNullable().unique();
    table.string('nif', 50).notNullable().unique();
    table.string('telefone', 50).notNullable();
    table.string('password_hash').notNullable();
    table.date('data_de_nascimento');
    table.date('data_de_contratacao');
    table.integer('salario').notNullable();
    table.string('educacao', 255);
    table.string('bio');
    table.string('linguas_falada', 255);
    table.boolean('ativo').defaultTo(true);
    table.string('endereco', 255).notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('funcionario');
}
