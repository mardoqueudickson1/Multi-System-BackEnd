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
// async function calcularSaldo(contas: any[]): Promise<number> {
//     let saldo: number = 0;
//     for (const conta of contas) {
//       const transacoes = await db('transacoes')
//         .join('contas_transacoes', 'transacoes.id', 'contas_transacoes.id_transacao')
//         .where('contas_transacoes.id_conta', conta.id);
//       for (const transacao of transacoes) {
//         saldo += transacao.valor;
//       }
//     }
//     return saldo;
//   }
exports.default = {
    index(_req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contaAtivo = yield (0, database_1.default)('contas').where('tipo', 'ativo').first();
                const contaPassivo = yield (0, database_1.default)('contas').where('tipo', 'passivo').first();
                const ativos = (_a = contaAtivo === null || contaAtivo === void 0 ? void 0 : contaAtivo.saldo) !== null && _a !== void 0 ? _a : 0;
                const passivos = (_b = contaPassivo === null || contaPassivo === void 0 ? void 0 : contaPassivo.saldo) !== null && _b !== void 0 ? _b : 0;
                const balanco_geral = ativos - passivos;
                return res.json({ ativos, passivos, balanco_geral });
            }
            catch (error) {
                console.error('Error:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    },
};
