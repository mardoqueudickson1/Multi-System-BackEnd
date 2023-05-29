import { Knex } from 'knex';

exports.up = function (knex: Knex) {
  return knex.schema.alterTable('saidas_produtos', function (table) {
    table.float('valor_total').notNullable();
  });
};

exports.down = function (knex: Knex) {
  return knex.schema.alterTable('saidas_produtos', function (table) {
    table.dropColumn('valor_total');
  });
};
