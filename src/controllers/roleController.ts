import { Request, Response } from 'express';
import db from '../config/database';
import { Role } from 'src/interfaces/interfaces';

//Classe principal
export class RoleController {
  public async index(_req: Request, res: Response): Promise<void> {
    try {
      const empresa = await db<Role>('empresa');
      res.json(empresa);
    } catch (error) {
      res.status(500).json({ message: 'Erro do servidor' });
    }
  }

  //Mostra a empresa filha
  public async show(_req: Request, res: Response): Promise<void> {
    try {
      const empresas = await db<Role>('funcionario').select('*');

      res.status(201).json(empresas);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erro no servidor' });
    }
  }

  //Cria a empresa filha
  public async create(req: Request, res: Response): Promise<void> {
    const { id } = req.body;
    try {
      await db<Role>('funcionario').insert(req.body);
      const novo = await db<Role>('funcionario').where({ id });
      res.status(201).json(novo);
    } catch (error) {
      res.status(500).json({ message: 'Erro do servidor ao criar' });
      console.log(error);
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);

    try {
      const rowsUpdated = await db<Role>('funcionario').where(id).update(req.body);
      if (rowsUpdated === 0) {
        res.status(404).json({ message: 'Empresa not found' });
        return;
      }
      const empresa = await db<Role>('funcionario').where(id).first();
      res.json(empresa);
    } catch (error) {
      res.status(500).json({ message: 'Erro do servidor' });
    }
  }

  public async destroy(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
      const rowsDeleted = await db<Role>('funcionario').where(id).delete();
      if (rowsDeleted === 0) {
        res.status(404).json({ message: 'Empresa not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Erro do servidor' });
    }
  }
}

export default new RoleController();
