import { Request, Response } from 'express';
import db from '../../config/database';

//Classe principal
export class PessoaReceberController {
  //Mostra a empresa filha
  public async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const empresas = await db('pessoa_receber').select('*');

      res.status(201).json(empresas);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erro do servidor ao pesquisar' });
    }
  }

  //   //Role
  //   public async create(req: Request, res: Response): Promise<void> {
  //     try {
  //       const [id] = await db<Role>('role').insert(req.body).returning('id');
  //       const novo = await db<Role>('role').where({ id: id.id });
  //       res.status(201).json(novo);
  //     } catch (error) {
  //       res.status(500).json({ message: 'Erro do servidor ao criar' });
  //       console.log(error);
  //     }
  //   }

  //   //Atualiza
  //   public async update(req: Request, res: Response): Promise<void> {
  //     const id = Number(req.params.id);

  //     try {
  //       const rowsUpdated = await db<Role>('role').where(id).update(req.body);
  //       if (rowsUpdated === 0) {
  //         res.status(404).json({ message: 'Empresa not found' });
  //         return;
  //       }
  //       const empresa = await db<Role>('role').where(id).first();
  //       res.json(empresa);
  //     } catch (error) {
  //       res.status(500).json({ message: 'Erro do servidor' });
  //     }
  //   }

  //   public async destroy(req: Request, res: Response): Promise<void> {
  //     const id = Number(req.params.id);
  //     try {
  //       const rowsDeleted = await db<Role>('role').where(id).delete();
  //       if (rowsDeleted === 0) {
  //         res.status(404).json({ message: 'Empresa not found' });
  //         return;
  //       }
  //       res.status(204).send();
  //     } catch (error) {
  //       res.status(500).json({ message: 'Erro do servidor' });
  //     }
  //   }
}

export default new PessoaReceberController();
