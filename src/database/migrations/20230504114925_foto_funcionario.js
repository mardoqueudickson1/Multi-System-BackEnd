const Knex = require('knex');

async function up(knex) {
  return knex.schema.createTable('foto_funcionario', (table) => {
    table.increments('id');
    table.string('originalname').notNullable();
    table.string('filename').notNullable();
    table.integer('funcinario_id').unsigned();
    table.foreign('funcinario_id').references('funcionario.id').onDelete('CASCADE').onUpdate('CASCADE');
    table.timestamps(true, true);
  });
}

async function down(knex) {
  knex.schema.dropTable('foto_funcionario');
}

module.exports = {
  up,
  down,
};
