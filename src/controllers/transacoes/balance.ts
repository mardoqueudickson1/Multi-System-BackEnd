import { Request, Response } from 'express';
import db from '../../config/database';

  
  export default {
    async index(_req: Request, res: Response) {
      const contaAtivo = await db('contas').where('tipo', 'ativo').first();
      const contaPassivo = await db('contas').where('tipo', 'passivo').first();

      const ativos = contaAtivo.saldo
      const passivos = contaPassivo.saldo

  
  
      const balanco_geral = ativos - passivos;
  
      return res.json({ ativos, passivos, balanco_geral });
    },

    
  };
