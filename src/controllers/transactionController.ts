import { Request, Response } from 'express';
import db from '../../knexfile';

export class TransacoesController {
  // Listagem de transações
  async index(request: Request, response: Response) {
    const { empresa_id } = request.query;
    // Seleciona todas as transações da empresa com o id especificado
    const transacoes = await db('transacoes')
      .join('empresas', 'transacoes.id_empresa_filha', '=', 'empresas.id')
      .where('transacoes.id_empresa_filha', String(empresa_id))
      .select('transacoes.*', 'empresas.nome as nome_empresa');
    // Retorna as transações encontradas em formato JSON
    return response.json(transacoes);
  }

  // Criação de transações
  async create(request: Request, response: Response) {
    const { descricao, valor, tipo, id_empresa_filha, contas } = request.body;
    // Insere a nova transação no banco de dados e retorna o ID gerado
    const transacao = await db('transacoes')
      .insert({
        descricao,
        valor,
        tipo,
        id_empresa_filha,
      })
      .returning('id');
    // Cria um array com os IDs das contas associadas à transação
    const contasTransacoes = contas.map((conta_id: number) => {
      return {
        id_conta: conta_id,
        id_transacao: transacao[0],
      };
    });
    // Insere as novas associações no banco de dados
    await db('contas_transacoes').insert(contasTransacoes);
    // Retorna a transação criada com o ID e as contas associadas
    return response.json({
      id: transacao[0],
      descricao,
      valor,
      tipo,
      id_empresa_filha,
      contas,
    });
  }

  // Atualização de transações
  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { descricao, valor, tipo, contas } = request.body;
    // Atualiza a transação com o ID especificado
    await db('transacoes').where('id', id).update({
      descricao,
      valor,
      tipo,
    });
    // Remove todas as associações da transação com as contas
    await db('contas_transacoes').where('id_transacao', id).delete();
    // Cria um array com os IDs das contas associadas à transação atualizada
    const contasTransacoes = contas.map((conta_id: number) => {
      return {
        id_conta: conta_id,
        id_transacao: Number(id),
      };
    });
    // Insere as novas associações no banco de dados
    await db('contas_transacoes').insert(contasTransacoes);
    // Retorna a transação atualizada com as contas associadas
    return response.json({
      id: Number(id),
      descricao,
      valor,
      tipo,
      contas,
    });
  }
}

export default new TransacoesController();

// #TODO   ESTOU A TRBALHAR AQUI;
