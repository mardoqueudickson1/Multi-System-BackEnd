const { Knex } = require('knex');

exports.up = async function (knex) {
  await knex.schema.createTable('pessoa_receber', function (table) {
    table.increments('id').primary();
    table.string('nome', 255).notNullable();
    table.string('telefone', 255).notNullable();
    table.string('endereco', 255).notNullable();
    table.string('email', 255).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable('pessoa_receber');
};
