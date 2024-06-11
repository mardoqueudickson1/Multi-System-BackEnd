import bcrypt from 'bcryptjs';
import db from '../../config/database';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

class TokenController {
  async store(req: Request, res: Response) {
    const { email, password, entity } = req.body;
    console.log('Logou: ', req.body);

    if (!email || !password || !entity) {
      return res.status(401).json({
        errors: ['Credenciais inválidas'],
      });
    }

    let table;

    switch (entity) {
      case 'funcionario':
        table = 'funcionario';
        break;
      case 'admin':
        table = 'admin_filho';
        break;
      default:
        return res.status(401).json({
          errors: ['Tipo de entidade inválido'],
        });
    }

    const [user] = await db(table).where('email', email);

    if (!user) {
      return res.status(401).json({
        errors: ['Credenciais inválidas'],
      });
    }

    const secret = '123455';
    const expiresIn = 3600;
    const defaultPassword = '12345';
    const senhaCorreta = await bcrypt.compare(password, user.password_hash);
    const ismatchPassword = await bcrypt.compare(defaultPassword, user.password_hash);

    if (!senhaCorreta) {
      return res.status(401).json({
        errors: ['Senha inválidas # '],
      });
    }

    const data = {
      id: user.id,
      n_funcionario: user.n_funcionario,
      email: user.email,
      sobrenome: user.sobrenome,
      role_id: user.role_id,
      departamento_id: user.departamento_id,
      nif: user.nif,
      telefone: user.telefone,
      data_de_nascimento: user.data_de_nascimento,
      data_de_contratacao: user.data_de_contratacao,
      salario: user.salario,
      educacao: user.educacao,
      bio: user.bio,
      linguas_falada: user.linguas_falada,
      ativo: user.ativo,
      endereco: user.endereco,
      entity,
    };
    if (ismatchPassword) {
      const token = jwt.sign(data, secret, { expiresIn });

      return res.json({
        redirect: true,
        token,
        user: {
          nome: user.nome,
          id: user.id,
          email: user.email,
          sobrenome: user.sobrenome,
          role_id: user.role_id,
          departamento_id: user.departamento_id,
          nif: user.nif,
          telefone: user.telefone,
          data_de_nascimento: user.data_de_nascimento,
          data_de_contratacao: user.data_de_contratacao,
          salario: user.salario,
          educacao: user.educacao,
          bio: user.bio,
          linguas_falada: user.linguas_falada,
          ativo: user.ativo,
          endereco: user.endereco,
          // entity,
        },
      });
    }

    const token = jwt.sign(data, secret, { expiresIn });

    return res.json({
      token,
      user: {
        nome: user.nome,
        id: user.id,
        email: user.email,
        sobrenome: user.sobrenome,
        role_id: user.role_id,
        departamento_id: user.departamento_id,
        nif: user.nif,
        telefone: user.telefone,
        data_de_nascimento: user.data_de_nascimento,
        data_de_contratacao: user.data_de_contratacao,
        salario: user.salario,
        educacao: user.educacao,
        bio: user.bio,
        linguas_falada: user.linguas_falada,
        ativo: user.ativo,
        endereco: user.endereco,
        // entity,
      },
    });
  }
}

export default new TokenController();
