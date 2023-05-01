import { Request, Response } from 'express';
import db from '../../config/database';
import { Transaction } from '../../interfaces/interfaces';
// import { parseISO } from 'date-fns';


export class TransacoesController {
  public async show(_req: Request, res: Response) {
    const dados = await db.raw(`
      SELECT *, strftime('%d-%m-%Y', updated_at) as data_formatada 
      FROM transacoes
    `)

    // adiciona uma coluna "data_formatada" com a data formatada
    const dadosFormatados = dados.map((dado: { data_formatada: { toString: () => any; }; }) => ({
      ...dado,
      data_formatada: dado.data_formatada.toString() // converte a data para string
    }))

    res.status(201).json(dadosFormatados)
  }


  // Listagem de transações
  async index(request: Request, response: Response) {
    const { empresa_id } = request.query;

    const transacoes = await db<Transaction>('transacoes')
      .join('empresas', 'transacoes.id_empresa_filha', '=', 'empresas.id')
      .where('transacoes.id_empresa_filha', String(empresa_id))
      .select(
        'transacoes.*',
        'empresas.nome as nome_empresa',
        db.raw("DATE_FORMAT(transacoes.updated_at, '%d-%m-%Y') as data_formatada")
      );

    return response.json(transacoes);
  }


  // Criação de transações
  async create(req: Request, res: Response) {
    try {
      const { descricao, valor, tipo, empresa_filha_id } = req.body;
      console.log(valor)

      // Verifica se a conta informada pertence à empresa filha informada
      

      // if (!conta) {
      //   return res.status(400).json({ message: 'Conta não encontrada para a empresa filha informada.' });
      // }

      // Cadastra a transação na tabela 'transacoes'

      const [id] = await db('transacoes')
        .insert({
          descricao,
          valor,
          tipo,
          empresa_filha_id,
        })
        .returning('id');

      

      // Atualiza o saldo da conta informada #TODO tenho de trabalhar aqui mais tarde
      
      if (tipo === 'receita') {
        const conta = await db('contas').where('tipo', 'ativo').first();
        const saldoAtual = conta.saldo;
        const novoSaldo = saldoAtual + valor;
        await db('contas').where('tipo', 'ativo').update({
          saldo: novoSaldo,
        });
        await db('contas_transacoes').insert({
          id_conta: conta.id,
          id_transacao: id.id,
        });
      } else if (tipo === 'despesa') {
        const conta = await db('contas').where('tipo', 'passivo').first();
        const saldoAtual = conta.saldo;
        const novoSaldo = saldoAtual - valor;
        await db('contas').where('tipo', 'passivo').update({
          saldo: novoSaldo,
        });
        await db('contas_transacoes').insert({
          id_conta: conta.id,
          id_transacao: id.id,
        });
      }
      
      
      



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

  //Apaga a trasação
  public async delete(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
      const rowsDeleted = await db('transacoes').where({ id }).delete();
      if (rowsDeleted === 0) {
        res.status(404).json({ message: 'Transação not found' });
        return;
      }
      res.status(204).send("APAGADO COM SUCESSO");
    } catch (error) {
      res.status(500).json({ message: 'Erro do servidor' });
    }
  }
}

export default new TransacoesController();
