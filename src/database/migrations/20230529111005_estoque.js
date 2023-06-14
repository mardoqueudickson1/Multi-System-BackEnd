const { Knex } = require('knex');

exports.up = async function (knex) {
  await knex.schema.createTable('estoque', function (table) {
    table.increments('id').primary();
    table.integer('fornecedor_id').unsigned().references('id').inTable('fornecedor');
    table.string('n_transacao').notNullable();
    table.string('nome', 255).notNullable();
    table.string('descricao', 255).notNullable();
    table.string('categoria').notNullable();
    table.string('marca', 255).notNullable();
    table.enum('estado', ['bom', 'normal', 'mau', 'em_uso', 'novo']).notNullable();
    table.string('cor', 255).notNullable();
    table.decimal('valor').notNullable();
    table.integer('quantidade').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable('estoque');
};
