import { Request, Response } from 'express';
import db from '../../config/database';
import { EmpresaFilha } from 'src/interfaces/interfaces';

//Classe principal
export class EmpresaFilhaController {
  public async index(_req: Request, res: Response): Promise<void> {
    try {
      const empresa = await db<EmpresaFilha>('empresa');
      res.json(empresa);
    } catch (error) {
      res.status(500).json({ message: 'Erro do servidor' });
    }
  }

  //Mostra a empresa filha
  public async show(_req: Request, res: Response): Promise<void> {
    try {
      const empresas = await db<EmpresaFilha>('empresa_filha').select('*');

      res.status(201).json(empresas);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erro no servidor' });
    }
  }

  //Cria a empresa filha
  public async create(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    try {
      await db<EmpresaFilha>('empresa_filha').insert(req.body);
      const novo = await db<EmpresaFilha>('empresa_filha').where({ email });
      res.status(201).json(novo);
    } catch (error) {
      res.status(500).json({ message: 'Erro do servidor ao criar' });
      console.log(error);
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);

    try {
      const rowsUpdated = await db<EmpresaFilha>('empresa_filha').where({ id }).update(req.body);
      if (rowsUpdated === 0) {
        res.status(404).json({ message: 'Empresa not found' });
        return;
      }
      const empresa = await db<EmpresaFilha>('empresa_filha').where({ id }).first();
      res.json(empresa);
    } catch (error) {
      res.status(500).json({ message: 'Erro do servidor' });
    }
  }

  public async destroy(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
      const rowsDeleted = await db<EmpresaFilha>('empresa_filha').where({ id }).delete();
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

export default new EmpresaFilhaController();
