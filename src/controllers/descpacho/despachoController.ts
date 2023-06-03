/* eslint-disable no-constant-condition */
import { Request, Response } from 'express';
import db from '../../config/database';

class DespachoController {
  //GERA numeros alatorio

  //CRIA A TRANSAÇÂO
  async create(req: Request, res: Response) {
    try {
      const { produto_id, quantidade, data_saida, responsavel_despacho, pessoa_receber, lista_produtos } = req.body;

      const aleatorio = Math.floor(Math.random() * (10 + 20) + 10);
      const aleatorio2 = Math.floor(Math.random() * (0 + 9) + 0);
      const aleatorio4 = Math.floor(Math.random() * (0 + 9) + 0);
      const pre = 'TSS';

      const data = new Date();
      const ano = data.getFullYear();
      const segundos = data.getSeconds();
      let numero = [ano, aleatorio, segundos].join('');

      if (numero.length < 10) numero = [pre, ano, aleatorio, aleatorio2, aleatorio4, segundos].join('');

      //Cadastra o nome da pessoa a receber primeiro
      const [id] = await db('pessoa_receber').insert(pessoa_receber).returning('id');

      // Verificar se o produto existe no estoque
      const product = await db('estoque').where({ id: produto_id }).first();
      if (product === 0) {
        res.status(404).json({ message: 'Produto não encontrado' });
        return;
      }

      // Adicione o número de transação aos dados da transação.
      if (product.quantidade < quantidade) {
        return res.status(400).json({ error: 'Quantidade insuficiente em estoque' });
      }
      const valor_total = product.valor * quantidade;

      // Iniciar uma transação para garantir consistência dos dados
      const trx = await db.transaction();

      try {
        const [saida] = await trx('saidas_produtos')
          .insert({
            estoque_id: produto_id,
            lista_produtos: lista_produtos,
            registro_n: numero,
            pessoa_receber: id.id,
            quantidade: -quantidade,
            data_saida: data_saida,
            responsavel_despacho: responsavel_despacho,
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
        .join('pessoa_receber', 'saidas_produtos.pessoa_receber', 'pessoa_receber.id')
        .select('saidas_produtos.*', 'estoque.nome AS nome_estoque', 'pessoa_receber.nome as pessoa_receber')
        .orderBy('saidas_produtos.id', 'desc');

      return res.status(200).json(products);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao buscar o histórico de saídas de produtos' });
    }
  }
}

export default new DespachoController();
