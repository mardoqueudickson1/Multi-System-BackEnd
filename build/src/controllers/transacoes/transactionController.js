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
exports.TransacoesController = void 0;
const database_1 = __importDefault(require("../../config/database"));
class TransacoesController {
    show(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.default.raw(`
        SELECT *, strftime('%d-%m-%Y', transacoes.updated_at) as data_formatada 
        FROM transacoes
        ORDER BY transacoes.updated_at DESC
      `);
                if (!result.rows) {
                    return res.status(404).json({ message: 'Nenhuma transação encontrada' });
                }
                const dados = result.rows.map((row) => (Object.assign(Object.assign({}, row), { data_formatada: row.data_formatada.toString() })));
                res.status(200).json(dados);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Erro do servidor' });
            }
        });
    }
    // Listagem de transações
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            try {
                const transacoes = yield (0, database_1.default)('transacoes')
                    .select('transacoes.*', database_1.default.raw("strftime('%d-%m-%Y', transacoes.updated_at) as data_formatada"))
                    .where({ id });
                if (!transacoes.length) {
                    return res.status(404).json({ message: 'Transação não encontrada' });
                }
                return res.json(transacoes);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Erro do servidor' });
            }
        });
    }
    // Criação de transações
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { descricao, valor, tipo, empresa_filha_id } = req.body;
                const [id] = yield (0, database_1.default)('transacoes')
                    .insert({
                    descricao,
                    valor,
                    tipo,
                    empresa_filha_id,
                })
                    .returning('id');
                if (tipo === 'receita') {
                    const conta = yield (0, database_1.default)('contas').where('tipo', 'ativo').first();
                    if (!conta) {
                        return res.status(404).json({ message: 'Conta ativa não encontrada' });
                    }
                    const saldoAtual = conta.saldo;
                    const novoSaldo = saldoAtual + valor;
                    yield (0, database_1.default)('contas').where('tipo', 'ativo').update({
                        saldo: novoSaldo,
                    });
                    yield (0, database_1.default)('contas_transacoes').insert({
                        id_conta: conta.id,
                        id_transacao: id.id,
                    });
                }
                else if (tipo === 'despesa') {
                    const conta = yield (0, database_1.default)('contas').where('tipo', 'passivo').first();
                    if (!conta) {
                        return res.status(404).json({ message: 'Conta passiva não encontrada' });
                    }
                    const saldoAtual = conta.saldo;
                    const novoSaldo = saldoAtual - valor;
                    yield (0, database_1.default)('contas').where('tipo', 'passivo').update({
                        saldo: novoSaldo,
                    });
                    yield (0, database_1.default)('contas_transacoes').insert({
                        id_conta: conta.id,
                        id_transacao: id.id,
                    });
                }
                return res.status(201).json('CADASTRADO com SUCESSO');
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Erro do servidor' });
            }
        });
    }
    // Apaga a transação
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            try {
                const rowsDeleted = yield (0, database_1.default)('transacoes').where({ id }).delete();
                if (rowsDeleted === 0) {
                    res.status(404).json({ message: 'Transação não encontrada' });
                    return;
                }
                res.status(204).send('APAGADO COM SUCESSO');
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Erro do servidor' });
            }
        });
    }
}
exports.TransacoesController = TransacoesController;
exports.default = new TransacoesController();
