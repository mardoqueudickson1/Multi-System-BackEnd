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
const knex_1 = __importDefault(require("knex"));
const database_1 = __importDefault(require("../../config/database"));
// import { parseISO } from 'date-fns';
class TransacoesController {
    show(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.raw(`
      SELECT *, to_char(transacoes.updated_at, 'DD-MM-YYYY') as data_formatada 
      FROM transacoes
      ORDER BY transacoes.updated_at DESC
    `);
            const dados = result.rows.map((row) => (Object.assign(Object.assign({}, row), { data_formatada: row.data_formatada.toString() })));
            res.status(201).json(dados);
        });
    }
    // Listagem de transações
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const transacoes = yield (0, database_1.default)('transacoes')
                .select('transacoes.*', (0, knex_1.default)("to_char(transacoes.updated_at, 'DD-MM-YYYY') as data_formatada"))
                .where({ id });
            return res.json(transacoes);
        });
    }
    // Criação de transações
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { descricao, valor, tipo, empresa_filha_id } = req.body;
                console.log(valor);
                // Verifica se a conta informada pertence à empresa filha informada
                // if (!conta) {
                //   return res.status(400).json({ message: 'Conta não encontrada para a empresa filha informada.' });
                // }
                // Cadastra a transação na tabela 'transacoes'
                const [id] = yield (0, database_1.default)('transacoes')
                    .insert({
                    descricao,
                    valor,
                    tipo,
                    empresa_filha_id,
                })
                    .returning('id');
                // Atualiza o saldo da conta informada #TODO tenho de trabalhar aqui mais tarde
                if (tipo === 'receita') {
                    const conta = yield (0, database_1.default)('contas').where('tipo', 'ativo').first();
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
                console.log(error);
            }
        });
    }
    // // Atualização de transações
    // async update(request: Request, response: Response) {
    //   const { id } = request.params;
    //   const { descricao, valor, tipo, contas } = request.body;
    //   // Atualiza a transação com o ID especificado
    //   await db('transacoes').where('id', id).update({
    //     descricao,
    //     valor,
    //     tipo,
    //   });
    //   // Remove todas as associações da transação com as contas
    //   await db('contas_transacoes').where('id_transacao', id).delete();
    //   // Cria um array com os IDs das contas associadas à transação atualizada
    //   const contasTransacoes = contas.map((conta_id: number) => {
    //     return {
    //       id_conta: conta_id,
    //       id_transacao: Number(id),
    //     };
    //   });
    //   // Insere as novas associações no banco de dados
    //   await db('contas_transacoes').insert(contasTransacoes);
    //   // Retorna a transação atualizada com as contas associadas
    //   return response.json({
    //     id: Number(id),
    //     descricao,
    //     valor,
    //     tipo,
    //     contas,
    //   });
    // }
    //Apaga a trasação
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            try {
                const rowsDeleted = yield (0, database_1.default)('transacoes').where({ id }).delete();
                if (rowsDeleted === 0) {
                    res.status(404).json({ message: 'Transação not found' });
                    return;
                }
                res.status(204).send('APAGADO COM SUCESSO');
            }
            catch (error) {
                res.status(500).json({ message: 'Erro do servidor' });
            }
        });
    }
}
exports.TransacoesController = TransacoesController;
exports.default = new TransacoesController();
