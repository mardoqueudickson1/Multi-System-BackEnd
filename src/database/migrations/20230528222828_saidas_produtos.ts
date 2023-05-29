import { Knex } from 'knex';

exports.up = function (knex: Knex) {
  return knex.schema.createTable('saidas_produtos', function (table) {
    table.increments('id').primary();
    table.integer('produto_id').unsigned().references('id').inTable('estoque');
    table.integer('quantidade').notNullable();
    table.float('valor_total').notNullable();
    table.date('data_saida').notNullable();
    table.string('responsavel_despacho').notNullable();
    table.string('pessoa_receber').notNullable();

    table.timestamps(true, true);
  });
};

exports.down = function (knex: Knex) {
  return knex.schema.dropTable('saidas_produtos');
};
