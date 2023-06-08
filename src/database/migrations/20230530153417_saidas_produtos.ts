import { Knex } from 'knex';

exports.up = function (knex: Knex) {
  return knex.schema.createTable('saidas_produtos', function (table) {
    table.increments('id').primary();
    table.integer('pessoa_receber').unsigned().references('id').inTable('pessoa_receber');
    table.string('registro_n').notNullable();
    table.integer('quantidade').notNullable();
    table.float('valor_total').notNullable();
    table.jsonb('lista_produtos').notNullable().defaultTo('[]');
    table.date('data_saida').notNullable();
    table.string('responsavel_despacho').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex: Knex) {
  return knex.schema.dropTable('saidas_produtos');
};
