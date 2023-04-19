import { Request, Response } from 'express';
import db from '../config/database';
import { Transaction } from '../interfaces/interfaces';

export class TransacoesController {
  // Listagem de transações
  async index(request: Request, response: Response) {
    const { empresa_id } = request.query;
    // Seleciona todas as transações da empresa com o id especificado
    const transacoes = await db<Transaction>('transacoes')
      .join('empresas', 'transacoes.id_empresa_filha', '=', 'empresas.id')
      .where('transacoes.id_empresa_filha', String(empresa_id))
      .select('transacoes.*', 'empresas.nome as nome_empresa');
    // Retorna as transações encontradas em formato JSON
    return response.json(transacoes);
  }

  // Criação de transações
  async create(req: Request, res: Response) {
    try {
      const { descricao, valor, tipo, empresa_filha_id, conta_id } = req.body;

      // Verifica se a conta informada pertence à empresa filha informada
      const conta = await db('contas').where('id', conta_id).first();

      if (!conta) {
        return res.status(400).json({ message: 'Conta não encontrada para a empresa filha informada.' });
      }

      // Cadastra a transação na tabela 'transacoes'

      const [id] = await db('transacoes')
        .insert({
          descricao,
          valor,
          tipo,
          empresa_filha_id,
        })
        .returning('id');
      console.log(`AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII: ${id}`);
      console.log(id.id);
      const ID = id.id;
      await db('contas_transacoes').insert({
        id_conta: conta_id,
        id_transacao: id.id,
      });

      let novoSaldo = 0;

      // Atualiza o saldo da conta informada
      if (tipo === 'receita') {
        if (conta.tipo === 'ativo') {
          novoSaldo = conta.saldo + valor;
        } else if (conta.tipo === 'passivo') {
          if (valor > conta.saldo) {
            await db('transacoes').where({ ID }).delete();

            return res.status(400).json({ message: 'O valor é maior que o saldo atual!' });
          }
          novoSaldo = conta.saldo - valor;
        }
      } else if (tipo === 'despesa') {
        if (conta.tipo === 'ativo') {
          if (valor > conta.saldo) {
            await db('transacoes').where({ id: id.id }).delete();
            return res.status(400).json({ message: 'O valor é maior que o saldo atual!' });
          }
          novoSaldo = conta.saldo - valor;
        } else if (conta.tipo === 'passivo') {
          novoSaldo = conta.saldo + valor;
        }
      }
      const arrayLiteral = `{${novoSaldo}}`;

      await db('contas').where('id', conta_id).update({
        saldo: arrayLiteral,
      });

      return res.status(201).json('CADASTRADO com SUCESSO');
    } catch (error) {
      console.log(error);
    }
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
}

export default new TransacoesController();
