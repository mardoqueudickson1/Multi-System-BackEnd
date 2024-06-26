const { Knex } = require('knex');

exports.up = function (knex) {
  return knex.schema.createTable('compras', function (table) {
    table.increments('id').primary();
    table.integer('fornecedor_id').unsigned().references('id').inTable('fornecedor');
    table.string('nome_produto');
    table.date('data_compra').notNullable();
    table.decimal('valor_total').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('compras');
};
