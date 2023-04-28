import { Request, Response } from 'express';
import db from '../../config/database';
import { Contas } from 'src/interfaces/interfaces';

//Classe principal
export class ContasController {
  public async index(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
      const contas = await db<Contas>('contas').where(id);
      res.json(contas);
    } catch (error) {
      res.status(500).json({ message: 'Erro do servidor' });
    }
  }

  //Mostra o contas
  public async show(_req: Request, res: Response): Promise<void> {
    try {
      const contas = await db<Contas>('contas').select('*');

      res.status(201).json(contas);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erro no servidor' });
    }
  }

  //Cria o contas
  public async create(req: Request, res: Response): Promise<void> {
    const { id } = req.body;
    try {
      await db<Contas>('contas').insert(req.body);
      const novo = await db<Contas>('contas').where(id);
      res.status(201).json(novo);
    } catch (error) {
      res.status(500).json({ message: 'Erro do servidor ao criar' });
      console.log(error);
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
      const rowsDeleted = await db('contas').where({ id }).delete();
      if (rowsDeleted === 0) {
        res.status(404).json({ message: 'Empresa not found' });
        return;
      }
      res.status(204).send("APAGADO COM SUCESSO");
    } catch (error) {
      res.status(500).json({ message: 'Erro do servidor' });
    }
  }
}

export default new ContasController();
