import { Request, Response } from 'express';
import db from '../../config/database';
import { Estoque } from 'src/interfaces/interfaces';

//Classe principal
export class EstoqueController {
  public async show(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
      const stock = await db<Estoque>('estoque')
        .select('estoque.*', 'fornecedor.nome as nome_fornecedor', 'fornecedor.telefone', 'fornecedor.endereco')
        .join('fornecedor', 'estoque.fornecedor_id', 'fornecedor.id')
        .where('estoque.id', id);
      res.json(stock);
    } catch (error) {
      res.status(500).json({ message: 'Erro do servidor' });
      console.log(error);
    }
  }

  //Mostra a estoque
  public async index(_req: Request, res: Response) {
    const result = await db.raw(`
      SELECT *, to_char(estoque.updated_at, 'DD-MM-YYYY') as data_formatada 
      FROM estoque
      ORDER BY estoque.updated_at DESC
    `);

    // Formatação de valor na moeda nacional(KZ)
    const formattedValue = new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 2,
    }).format(Number(result.valor));

    const dados = result.rows.map((row: any) => ({
      ...row,
      data_formatada: row.data_formatada.toString(),
      valor_total: row.valor * row.quantidade,
      valor_formatada: formattedValue,
    }));

    res.status(200).json(dados);
  }

  //Faz cadastro no estoque
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const aleatorio = Math.floor(Math.random() * (10 + 20) + 10);
      const aleatorio2 = Math.floor(Math.random() * (0 + 9) + 0);
      const aleatorio4 = Math.floor(Math.random() * (0 + 9) + 0);
      const pre = 'TSE';

      const data = new Date();
      const ano = data.getFullYear();
      const segundos = data.getSeconds();
      let numero = [ano, aleatorio, segundos].join('');

      if (numero.length < 10) numero = [pre, ano, aleatorio, aleatorio2, aleatorio4, segundos].join('');

      const { nome, descricao, categoria, valor, quantidade, fornecedor } = req.body;

      const [Fornecedor] = await db('fornecedor').insert(fornecedor).returning('id');

      const [id] = await db('estoque')
        .insert({
          fornecedor_id: Fornecedor.id,
          n_transacao: numero,
          nome,
          categoria,
          descricao,
          valor,
          quantidade,
        })
        .returning('id');
      const novo = await db<Estoque>('estoque').where({ id: id.id });
      res.status(201).json(novo);
    } catch (error) {
      res.status(500).json({ message: 'Erro do servidor ao criar' });
      console.log(error);
    }
  }

  //Atualiza
  public async update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);

    try {
      const rowsUpdated = await db<Estoque>('estoque').where(id).update(req.body);
      if (rowsUpdated === 0) {
        res.status(404).json({ message: 'esoque not found' });
        return;
      }
      const esoque = await db<Estoque>('estoque').where(id).first();
      res.json(esoque);
    } catch (error) {
      res.status(500).json({ message: 'Erro do servidor' });
    }
  }

  public async destroy(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
      const rowsDeleted = await db<Estoque>('estoque').where(id).delete();
      if (rowsDeleted === 0) {
        res.status(404).json({ message: 'estoque not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Erro do servidor' });
    }
  }
}

export default new EstoqueController();

//#TODO estou treabalhando no estoque
