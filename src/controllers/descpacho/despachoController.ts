import { Request, Response } from 'express';
import db from '../../config/database';

class DespachoController {
  async create(req: Request, res: Response) {
    try {
      const { id, quantidade, data_saida, responsavel_despacho, pessoa_receber, destino } = req.body;

      // Verificar se o produto existe no estoque
      const [product] = await db('estoque').where('estoque.id', id);
      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      if (product.quantidade < quantidade) {
        return res.status(400).json({ error: 'Quantidade insuficiente em estoque' });
      }

      // Iniciar uma transação para garantir consistência dos dados
      const trx = await db.transaction();

      try {
        await trx('saidas_produtos').insert({
          id: id,
          quantidade: -quantidade, // Quantidade negativa para representar a saída
          data_saida: data_saida,
          responsavel_despacho: responsavel_despacho,
          pessoa_receber: pessoa_receber,
          destino: destino,
        });

        // Atualizar a quantidade disponível do produto no estoque
        await trx('products').where({ id }).decrement('quantidade', quantidade);

        // Confirmar a transação
        await trx.commit();
      } catch (error) {
        // Desfazer a transação em caso de erro
        await trx.rollback();
        throw error;
      }

      return res.status(200).json({ message: 'Saída de produto registrada com sucesso' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao registrar a saída do produto' });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      // Verificar se o produto existe no estoque
      const product = await db('saidas_produtos').where({ id }).first();
      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      // Buscar as entradas no estoque relacionadas ao produto
      const stockEntries = await db('saidas_produtos').where('id', id);

      return res.status(200).json(stockEntries);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao buscar o histórico de saídas do produto' });
    }
  }
}

export default new DespachoController();
