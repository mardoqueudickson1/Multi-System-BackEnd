const { Knex } = require('knex');

async function up(knex) {
  await knex.schema.createTable('empresa_filha', (table) => {
    table.increments('id').primary();
    table.string('nome', 255).notNullable();
    table.string('email', 255).notNullable().unique();
    table.string('nif', 50).notNullable().unique();
    table.integer('telefone', 50).notNullable();
    table.string('especialidade').notNullable();
    table.string('endereco', 255).notNullable();
    table.timestamps(true, true);
  });
}

async function down(knex) {
  await knex.schema.dropTable('empresa_filha');
}

module.exports = {
  up,
  down,
};
