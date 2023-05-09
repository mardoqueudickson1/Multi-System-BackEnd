import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('foto_funcionario', (table) => {
    table.increments('id');
    table.string('originalname').notNullable();
    table.string('filename').notNullable();
    table.integer('funcinario_id').unsigned();
    table.foreign('funcinario_id').references('funcionario.id').onDelete('CASCADE').onUpdate('CASCADE');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable('foto_funcionario');
}
