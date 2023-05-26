import { Request, Response } from 'express';
import db from '../../config/database';

//Classe principal
export class TodalProdutoEstoqueController {
  sumProductValues = async (_req: Request, res: Response): Promise<void> => {
    try {
      const result = await db('estoque').count('* as total').first();

      const totalQuantity = result || 0; // Quantidade total retornado pela consulta

      res.status(200).json(totalQuantity);
    } catch (error) {
      console.error('Erro ao somar os valores dos produtos:', error);
      res.status(500).json({ error: 'Erro ao somar os valores dos produtos' });
    }
  };
}

export default new TodalProdutoEstoqueController();

//#TODO estou treabalhando no estoque
