"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.createTable('funcionario', (table) => {
            table.increments('id').primary();
            table.integer('departamento_id').unsigned().notNullable();
            table.foreign('departamento_id').references('departamento.id');
            table.integer('role_id').unsigned();
            table.foreign('role_id').references('role.id');
            table.integer('n_funcionario', 50).notNullable();
            table.string('nome', 255).notNullable();
            table.string('sobrenome', 255).notNullable();
            table.string('email', 255).notNullable().unique();
            table.string('nif', 50).notNullable().unique();
            table.string('telefone', 50).notNullable();
            table.string('password_hash').notNullable();
            table.date('data_de_nascimento');
            table.date('data_de_contratacao');
            table.integer('salario').notNullable();
            table.string('educacao', 255);
            table.string('bio');
            table.string('linguas_falada', 255);
            table.boolean('ativo').defaultTo(true);
            table.string('endereco', 255).notNullable();
            table.timestamps(true, true);
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable('funcionario');
    });
}
exports.down = down;
