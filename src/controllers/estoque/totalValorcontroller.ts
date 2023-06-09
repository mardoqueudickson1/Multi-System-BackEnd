/* eslint-disable prettier/prettier */
import { Request, Response } from 'express';
import db from '../../config/database';

//Classe principal
export class TodalProdutoEstoqueController {
  sumProductTotalValue = async (_req: Request, res: Response): Promise<void> => {
    try {
      const result = await db('estoque').sum('valor as total').first();
      const totalValue = result || 0;

      if (totalValue) {
        // Formatação do valor como dinheiro, com vírgulas e pontos
        const formattedValue = new Intl.NumberFormat('pt-AO', {
          style: 'currency',
          currency: 'AOA',
          minimumFractionDigits: 2,
        })
          .format(Number(totalValue.total))
          .replace(/\s/g, '')
          .replace(/(?<=\d)(?=(\d{3})+(?!\d))/g, '.')
          .replace(/,/g, ',');

        res.status(200).json({ valor: formattedValue });
      } else {
        res.status(200).json({ valor: totalValue });
      }
    } catch (error) {
      console.error('Erro ao somar os valores dos produtos:', error);
      res.status(500).json({ error: 'Erro ao somar os valores dos produtos' });
    }
  };
}

export default new TodalProdutoEstoqueController();
