import { Request, Response } from 'express';
import db from '../../config/database';
import { Departamento } from 'src/interfaces/interfaces';

//Classe principal
export class DepartamentoController {
  public async index(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
      const departamento = await db<Departamento>('departamento').where({ id });
      res.json(departamento);
    } catch (error) {
      res.status(500).json({ message: 'Erro do servidor' });
    }
  }

  //Mostra o Departamento
  public async show(_req: Request, res: Response): Promise<void> {
    try {
      const departamentos = await db<Departamento>('departamento').select('*');

      res.status(201).json(departamentos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erro no servidor' });
    }
  }

  //Cria o departamento
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const [id] = await db<Departamento>('departamento').insert(req.body).returning('id');

      const novo = await db<Departamento>('departamento').where({ id: id.id });

      res.status(201).json(novo);
    } catch (error) {
      res.status(500).json({ message: 'Erro do servidor ao criar' });
      console.log(error);
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);

    try {
      const rowsUpdated = await db<Departamento>('departamento').where({ id }).update(req.body);
      if (rowsUpdated === 0) {
        res.status(404).json({ message: 'Empresa not found' });
        return;
      }
      const empresa = await db<Departamento>('departamento').where({ id }).first();
      res.json(empresa);
    } catch (error) {
      res.status(500).json({ message: 'Erro do servidor' });
    }
  }

  public async destroy(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
      const rowsDeleted = await db<Departamento>('departamento').where({ id }).delete();
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

export default new DepartamentoController();
