'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.down = exports.up = void 0;
function up(knex) {
  return __awaiter(this, void 0, void 0, function* () {
    return knex.schema.createTable('foto_funcionario', (table) => {
      table.increments('id');
      table.string('originalname').notNullable();
      table.string('filename').notNullable();
      table.integer('funcinario_id').unsigned();
      table.foreign('funcinario_id').references('funcionario.id').onDelete('CASCADE').onUpdate('CASCADE');
      table.timestamps(true, true);
    });
  });
}
exports.up = up;
function down(knex) {
  return __awaiter(this, void 0, void 0, function* () {
    knex.schema.dropTable('foto_funcionario');
  });
}
exports.down = down;
