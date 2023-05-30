import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../../config/database';

class DespachoController {
  //GERA numeros alatorio
  gerarLetrasMaiusculas(): string {
    const uuid = uuidv4();
    const letrasMaiusculas = uuid
      .replace(/[^A-Z]/g, '')
      .toUpperCase()
      .slice(0, 10);
    return letrasMaiusculas;
  }

  //CRIA A TRANSAÇÂO
  async create(req: Request, res: Response) {
    try {
      const { produto_id, quantidade, data_saida, responsavel_despacho, pessoa_receber } = req.body;

      //Cadastra o nome da pessoa a receber primeiro
      const [pessoa_receber_id] = await db('pessoa_receber').insert(pessoa_receber).returning('id');

      // Verificar se o produto existe no estoque
      const product = await db('estoque').where({ id: produto_id }).first();
      if (product === 0) {
        res.status(404).json({ message: 'Produto não encontrado' });
        return;
      }

      // Gere o número de transação aleatório
      const n_aleatorio = this.gerarLetrasMaiusculas();

      if (product.quantidade < quantidade) {
        return res.status(400).json({ error: 'Quantidade insuficiente em estoque' });
      }
      const valor_total = product.valor * product.quantidade;
      console.log(valor_total);

      // Iniciar uma transação para garantir consistência dos dados
      const trx = await db.transaction();

      try {
        const [saida] = await trx('saidas_produtos')
          .insert({
            estoque_id: produto_id,
            registro_n: n_aleatorio,
            pessoa_receber_id: pessoa_receber_id,
            quantidade: -quantidade,
            data_saida: data_saida,
            responsavel_despacho: responsavel_despacho,
            pessoa_receber: pessoa_receber,
            valor_total: valor_total,
          })
          .returning('*');

        // Atualizar a quantidade disponível do produto no estoque
        await trx('estoque').where({ id: produto_id }).decrement('quantidade', quantidade);

        // Confirmar a transação
        await trx.commit();
        return res.status(200).json({ saida });
      } catch (error) {
        console.log(error);
        await trx.rollback();
        throw error;
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao registrar a saída do produto' });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      // Verificar se o produto existe no estoque
      const product = await db('saidas_produtos')
        .join('estoque', 'saidas_produtos.estoque_id', 'estoque.id')
        .select('saidas_produtos.*', 'estoque.nome AS nome_estoque')
        .where('saidas_produtos.id', id)
        .first();

      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      return res.status(200).json(product);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao buscar o histórico de saídas do produto' });
    }
  }

  async getAll(_req: Request, res: Response) {
    try {
      const products = await db('saidas_produtos')
        .join('estoque', 'saidas_produtos.estoque_id', 'estoque.id')
        .select('saidas_produtos.*', 'estoque.nome AS nome_estoque')
        .orderBy('saidas_produtos.id', 'desc');

      return res.status(200).json(products);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao buscar o histórico de saídas de produtos' });
    }
  }
}

export default new DespachoController();
