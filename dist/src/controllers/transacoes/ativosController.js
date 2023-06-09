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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../config/database"));
function calcularSaldo(contas) {
    return __awaiter(this, void 0, void 0, function* () {
        let saldo = 0;
        for (const conta of contas) {
            const transacoes = yield (0, database_1.default)('transacoes')
                .join('contas_transacoes', 'transacoes.id', 'contas_transacoes.id_transacao')
                .where('contas_transacoes.id_conta', conta.id);
            for (const transacao of transacoes) {
                saldo += transacao.valor;
            }
        }
        return saldo;
    });
}
exports.default = {
    ativos(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const contasAtivos = yield (0, database_1.default)('contas').where('tipo', 'ativo');
            const saldoAtivos = yield calcularSaldo(contasAtivos);
            const ativo = saldoAtivos;
            return res.json({ ativo });
        });
    },
};
