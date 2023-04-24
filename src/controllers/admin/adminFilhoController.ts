import { Request, Response } from 'express';
import { generateHash } from '../../utils/hashPassWord';
import db from '../../config/database';
import { AdminFilho } from 'src/interfaces/interfaces';

//Classe principal
export class AdminFilhoController {
  // public async index(req: Request, res: Response): Promise<void> {
  //   const id = Number(req.params.id);
  //   try {
  //     const empresa = await db<AdminFilho>('funcionario').where({ id });
  //     res.json(empresa);
  //   } catch (error) {
  //     res.status(500).json({ message: 'Erro do servidor' });
  //   }
  // }

  //Mostra a empresa filha
  public async show(_req: Request, res: Response): Promise<void> {
    try {
      const admins = await db<AdminFilho>('admin_filho').select('*');

      res.status(201).json(admins);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erro no servidor' });
    }
  }

  //Cria a admin da empresa filha
  public async create(req: Request, res: Response): Promise<void> {
    const {
      empresa_filha_id,
      role_id,
      nome,
      sobrenome,
      email,
      nif,
      telefone,
      password_hash,
      data_de_nascimento,
      data_de_contratacao,
      educacao,
      bio,
      linguas_falada,
      endereco,
    } = req.body;

    const senha: string = generateHash(password_hash);
    console.log('AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII');
    console.log(senha);

    try {
      const [id] =  await db<AdminFilho>('admin_filho').insert({
        empresa_filha_id,
        role_id,
        nome,
        sobrenome,
        email,
        nif,
        telefone,
        password_hash: senha,
        data_de_nascimento,
        data_de_contratacao,
        educacao,
        bio,
        linguas_falada,
        endereco,
      }).returning('id');
      
      const novo = await db('admin_filho').where({ id: id.id });
      res.status(201).json(novo);
    } catch (error) {
      res.status(500).json({ message: 'Erro do servidor ao criar' });
      console.log(error);
    }
  }



  // public async update(req: Request, res: Response): Promise<void> {
  //   const id = Number(req.params.id);

  //   try {
  //     const rowsUpdated = await db<AdminFilho>('adminFilho').where({ id }).update(req.body);
  //     if (rowsUpdated === 0) {
  //       res.status(404).json({ message: 'Empresa not found' });
  //       return;
  //     }
  //     const empresa = await db<AdminFilho>('adminFilho').where({ id }).first();
  //     res.json(empresa);
  //   } catch (error) {
  //     res.status(500).json({ message: 'Erro do servidor' });
  //   }
  // }

  // public async destroy(req: Request, res: Response): Promise<void> {
  //   const id = Number(req.params.id);
  //   try {
  //     const rowsDeleted = await db<AdminFilho>('adminFilho').where({ id }).delete();
  //     if (rowsDeleted === 0) {
  //       res.status(404).json({ message: 'Empresa not found' });
  //       return;
  //     }
  //     res.status(204).send();
  //   } catch (error) {
  //     res.status(500).json({ message: 'Erro do servidor' });
  //   }
  // }
}

export default new AdminFilhoController();
