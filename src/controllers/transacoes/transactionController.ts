import { Request, Response } from 'express';
import db from '../../config/database';
import { Transaction } from '../../interfaces/interfaces';

export class TransacoesController {
  public async show(_req: Request, res: Response) {
    try {
      const result = await db.raw(`
        SELECT *, strftime('%d-%m-%Y', transacoes.updated_at) as data_formatada 
        FROM transacoes
        ORDER BY transacoes.updated_at DESC
      `);

      if (!result.rows) {
        return res.status(404).json({ message: 'Nenhuma transação encontrada' });
      }

      const dados = result.rows.map((row: any) => ({
        ...row,
        data_formatada: row.data_formatada.toString(),
      }));

      res.status(200).json(dados);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro do servidor' });
    }
  }

  // Listagem de transações
  async index(req: Request, res: Response) {
    const id = Number(req.params.id);

    try {
      const transacoes = await db<Transaction>('transacoes')
        .select('transacoes.*', db.raw("strftime('%d-%m-%Y', transacoes.updated_at) as data_formatada"))
        .where({ id });

      if (!transacoes.length) {
        return res.status(404).json({ message: 'Transação não encontrada' });
      }

      return res.json(transacoes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro do servidor' });
    }
  }

  // Criação de transações
  async create(req: Request, res: Response) {
    try {
      const { descricao, valor, tipo, empresa_filha_id } = req.body;

      const [id] = await db('transacoes')
        .insert({
          descricao,
          valor,
          tipo,
          empresa_filha_id,
        })
        .returning('id');

      if (tipo === 'receita') {
        const conta = await db('contas').where('tipo', 'ativo').first();
        if (!conta) {
          return res.status(404).json({ message: 'Conta ativa não encontrada' });
        }
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
        if (!conta) {
          return res.status(404).json({ message: 'Conta passiva não encontrada' });
        }
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
      console.error(error);
      res.status(500).json({ message: 'Erro do servidor' });
    }
  }

  // Apaga a transação
  public async delete(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
      const rowsDeleted = await db('transacoes').where({ id }).delete();
      if (rowsDeleted === 0) {
        res.status(404).json({ message: 'Transação não encontrada' });
        return;
      }
      res.status(204).send('APAGADO COM SUCESSO');
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro do servidor' });
    }
  }
}

export default new TransacoesController();
