import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

import db from '../../config/database';
import { generateHash } from '../../utils/hashPassWord';
import { Funcionario } from 'src/interfaces/interfaces';

const url = process.env.APP_URL;
const port = process.env.APP_PORT;

//Classe principal
export class FuncionarioController {
  public async show(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
      const empresa = await db<Funcionario>('funcionario')
        .join('role', 'funcionario.role_id', '=', 'role.id')
        .join('departamento', 'funcionario.departamento_id', '=', 'departamento.id')
        .select('funcionario.*', 'role.nome AS nome_role', 'departamento.nome AS nome_departamento')
        .where('funcionario.id', '=', id)
        .first();
      res.json(empresa);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erro do servidor' });
    }
  }

  //Mostra todos funcionarios
  public async index(_req: Request, res: Response): Promise<void> {
    try {
      const funcionario = await db<Funcionario>('funcionario')
        .join('role', 'funcionario.role_id', '=', 'role.id')
        .join('departamento', 'funcionario.departamento_id', '=', 'departamento.id')
        .leftJoin('foto_funcionario', 'funcionario.id', '=', 'foto_funcionario.funcinario_id')
        .select(
          'funcionario.*',
          'role.nome AS nome_role',
          'departamento.nome AS nome_departamento',
          'foto_funcionario.filename AS foto'
        )
        .orderBy('funcionario.id', 'desc');

      const funcionariosComImagem = funcionario.map((f) => {
        return {
          ...f,
          fotoUrl: f.foto ? `${url}${port}/images/${f.foto}` : null,
        };
      });
      res.json(funcionariosComImagem);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erro do servidor' });
    }
  }

  //Cria a funcionário
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const password = 'palavra';
      const senha: string = generateHash(password);
      //Gera número aleatório para cada funcionário com prefixo do ano atual
      const aleatorio = Math.floor(Math.random() * (10 + 20) + 10);
      const aleatorio2 = Math.floor(Math.random() * (0 + 9) + 0);

      const data = new Date();
      const ano = data.getFullYear();
      const segundos = data.getSeconds();
      let numero = [ano, aleatorio, segundos].join('');

      if (numero.length < 8) numero = [ano, aleatorio, aleatorio2, segundos].join('');

      //Pega dados no corpo do campo
      const novoFuncionario = req.body;
      novoFuncionario['n_funcionario'] = numero;
      novoFuncionario['password_hash'] = senha;

      const [id] = await db<Funcionario>('funcionario').insert(novoFuncionario).returning('id');

      const novo = await db<Funcionario>('funcionario').where({ id: id.id });
      res.status(201).json(novo);
    } catch (error) {
      res.status(500).json({ message: 'Erro do servidor ao criar' });
      console.log(error);
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);

    try {
      const rowsUpdated = await db<Funcionario>('funcionario').where({ id }).update(req.body);
      if (rowsUpdated === 0) {
        res.status(404).json({ message: 'funcionario NOT found' });
        return;
      }
      const empresa = await db<Funcionario>('funcionario').where({ id }).first();
      res.json(empresa);
    } catch (error) {
      res.status(500).json({ message: 'Erro do servidor' });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
      const rowsDeleted = await db<Funcionario>('funcionario').where({ id }).delete();
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

export default new FuncionarioController();
