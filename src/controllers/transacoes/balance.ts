import { Request, Response } from 'express';
import db from '../../config/database';

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

export default {
  async index(_req: Request, res: Response) {
    try {
      const contaAtivo = await db('contas').where('tipo', 'ativo').first();
      const contaPassivo = await db('contas').where('tipo', 'passivo').first();

      const ativos = contaAtivo?.saldo ?? 0;
      const passivos = contaPassivo?.saldo ?? 0;

      const balanco_geral = ativos - passivos;

      return res.json({ ativos, passivos, balanco_geral });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};
