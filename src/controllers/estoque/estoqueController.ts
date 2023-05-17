import { Request, Response } from 'express';
import db from '../../config/database';
import { Role } from 'src/interfaces/interfaces';

//Classe principal
export class EstoqueController {
  public async index(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
      const departamento = await db<Role>('role').where({ id });
      res.json(departamento);
    } catch (error) {
      res.status(500).json({ message: 'Erro do servidor' });
      console.log(error);
    }
  }

  //Mostra a esoque filha
  public async show(_req: Request, res: Response): Promise<void> {
    try {
      const esoque = await db<Role>('role').select('*');

      res.status(201).json(esoque);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erro do servidor ao pesquisar' });
    }
  }

  //Role
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const [id] = await db<Role>('role').insert(req.body).returning('id');
      const novo = await db<Role>('role').where({ id: id.id });
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
      const rowsUpdated = await db<Role>('role').where(id).update(req.body);
      if (rowsUpdated === 0) {
        res.status(404).json({ message: 'esoque not found' });
        return;
      }
      const esoque = await db<Role>('role').where(id).first();
      res.json(esoque);
    } catch (error) {
      res.status(500).json({ message: 'Erro do servidor' });
    }
  }

  public async destroy(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
      const rowsDeleted = await db<Role>('role').where(id).delete();
      if (rowsDeleted === 0) {
        res.status(404).json({ message: 'esoque not found' });
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
