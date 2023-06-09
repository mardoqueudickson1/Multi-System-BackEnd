/* eslint-disable no-constant-condition */
import { Request, Response } from 'express';
import db from '../../config/database';

class DespachoController {
  //GERA numeros alatorio

  //CRIA A TRANSAÇÂO
  async create(req: Request, res: Response) {
    try {
      const { data_saida, responsavel_despacho, lista_produtos } = req.body;
      const { nome, telefone, email, endereco } = req.body.pessoa_receber;

      const aleatorio = Math.floor(Math.random() * (10 + 20) + 10);
      const aleatorio2 = Math.floor(Math.random() * (0 + 9) + 0);
      const aleatorio4 = Math.floor(Math.random() * (0 + 9) + 0);
      const pre = 'TSS';
      const data = new Date();
      const ano = data.getFullYear();
      const segundos = data.getSeconds();
      let numero = [ano, aleatorio, segundos].join('');
      if (numero.length < 10) numero = [pre, ano, aleatorio, aleatorio2, aleatorio4, segundos].join('');

      // Cadastra o nome da pessoa a receber primeiro
      const [pessoa_receber] = await db('pessoa_receber').insert({ nome, telefone, email, endereco }).returning('id');

      // Iniciar uma transação para garantir consistência dos dados
      const trx = await db.transaction();

      try {
        for (const produto of lista_produtos) {
          // Verificar se o produto existe no estoque
          console.log(produto);
          const { id, quantity } = produto;
          const product = await trx('estoque').where({ id: id }).first();

          if (!product) {
            await trx.rollback();
            return res.status(404).json({ message: `Produto com ID ${id} não encontrado` });
          }

          if (product.quantidade < quantity) {
            await trx.rollback();
            return res.status(400).json({ error: 'Quantidade insuficiente em estoque' });
          }

          const valor_total = product.valor * quantity;

          // Inserir a saída do produto na tabela "saidas_produtos"
          await trx('saidas_produtos').insert({
            registro_n: numero,
            pessoa_receber: pessoa_receber.id,
            quantidade: -quantity,
            data_saida: data_saida,
            responsavel_despacho: responsavel_despacho,
            valor_total: valor_total,
          });

          // Atualizar a quantidade disponível do produto no estoque
          await trx('estoque').where({ id: id }).decrement('quantidade', quantity);
        }

        // Confirmar a transação
        await trx.commit();
        return res.status(200).json({ message: 'Produtos despachados com sucesso' });
      } catch (error) {
        console.log(error);
        await trx.rollback();
        throw error;
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao registrar a saída dos produtos' });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      // Verificar se o produto existe no estoque
      const product = await db('saidas_produtos')
        .join('pessoa_receber', 'saidas_produtos.pessoa_receber', 'pessoa_receber.id')
        .select(
          'saidas_produtos.*',
          'pessoa_receber.nome as pessoa_receber',
          'pessoa_receber.telefone as pessoa_receber_telefone',
          'pessoa_receber.email as pessoa_receber_email',
          'pessoa_receber.endereco as pessoa_receber_endreco'
        )
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
        .join('pessoa_receber', 'saidas_produtos.pessoa_receber', 'pessoa_receber.id')
        .select('saidas_produtos.*', 'pessoa_receber.nome as pessoa_receber')
        .orderBy('saidas_produtos.id', 'desc');

      return res.status(200).json(products);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao buscar o histórico de saídas de produtos' });
    }
  }
}

export default new DespachoController();
