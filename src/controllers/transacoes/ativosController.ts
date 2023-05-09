/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Request, Response } from 'express';
import db from '../../config/database';

async function calcularSaldo(contas: any[]): Promise<number> {
  let saldo: number = 0;

  for (const conta of contas) {
    const transacoes = await db('transacoes')
      .join('contas_transacoes', 'transacoes.id', 'contas_transacoes.id_transacao')
      .where('contas_transacoes.id_conta', conta.id);

    for (const transacao of transacoes) {
      saldo += transacao.valor;
    }
  }

  return saldo;
}

export default {
  async ativos(_req: Request, res: Response) {
    const contasAtivos = await db('contas').where('tipo', 'ativo');
    const saldoAtivos = await calcularSaldo(contasAtivos);

    const ativo = saldoAtivos;

    return res.json({ ativo });
  },
};
