import { Request, Response } from 'express';
import db from '../config/database';
import { EmpresaPai } from 'src/interfaces/interfaces';

//Classe principal
export class EmpresaController {
  public async index(_req: Request, res: Response): Promise<void> {
    try {
      const empresas = await db<EmpresaPai>('empresa');
      res.json(empresas);
    } catch (error) {
      res.status(500).json({ message: 'Erro do servidor' });
    }
  }

  //Mostra a empresa Pai
  public async show(_req: Request, res: Response): Promise<void> {
    try {
      const empresas = await db<EmpresaPai>('empresa_pai').select('*');

      res.status(201).json(empresas);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erro no servidor' });
    }
  }

  //Cria a empresa Pai
  public async create(req: Request, res: Response): Promise<void> {
    const { nome, nif, email, telefone, especialidade, endereco } = req.body;
    try {
      await db<EmpresaPai>('empresa_pai').insert({
        nome,
        email,
        nif,
        telefone,
        especialidade,
        endereco,
      });
      const novo = await db<EmpresaPai>('empresa_pai').where({ email });
      res.status(201).json(novo);
    } catch (error) {
      res.status(500).json({ message: 'Erro do servidor ao criar' });
      console.log(error);
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const { nome, email, nif, telefone, especialidade, endereco } = req.body;
    try {
      const rowsUpdated = await db<EmpresaPai>('empresas')
        .where({ id })
        .update({ nome, email, nif, telefone, especialidade, endereco });
      if (rowsUpdated === 0) {
        res.status(404).json({ message: 'Empresa not found' });
        return;
      }
      const empresa = await db<EmpresaPai>('empresas').where({ id }).first();
      res.json(empresa);
    } catch (error) {
      res.status(500).json({ message: 'Erro do servidor' });
    }
  }

  public async destroy(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
      const rowsDeleted = await db<EmpresaPai>('empresas').where({ id }).delete();
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

export default new EmpresaController();
