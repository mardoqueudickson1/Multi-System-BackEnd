import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcryptjs';
import db from '../../config/database';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const url = process.env.APP_URL;
const port = process.env.APP_PORT;

class TokenController {
  async store(req: Request, res: Response) {
    const { email, password, entity } = req.body; // Recebe os dados de email, senha e tipo de entidade a ser autenticada

    console.log(email, password, entity);

    // Verifica se os dados foram passados corretamente
    if (!email || !password || !entity) {
      return res.status(401).json({
        errors: ['Credenciais inválidas'],
      });
    }

    let table; // Variável para armazenar o nome da tabela da entidade a ser autenticada

    // Define o nome da tabela da entidade de acordo com o tipo passado na requisição
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

    // Faz uma consulta no banco de dados buscando um usuário com o email informado na tabela correspondente à entidade
    const [user] = await db(table)
      .join('role', 'funcionario.role_id', '=', 'role.id')
      .join('departamento', 'funcionario.departamento_id', '=', 'departamento.id')
      .leftJoin('foto_funcionario', 'funcionario.id', '=', 'foto_funcionario.funcinario_id')
      .select(
        'funcionario.*',
        'role.nome AS nome_role',
        'departamento.nome AS nome_departamento',
        'foto_funcionario.filename AS foto'
      )
      .where('email', email);
    console.log(user);

    // Verifica se o usuário existe e se a senha informada está correta
    if (!user) {
      return res.status(401).json({
        errors: ['Credenciais inválidas na db'],
      });
    }

    const senhaCorreta = await bcrypt.compare(password, user.password_hash);

    if (!senhaCorreta) {
      return res.status(401).json({
        errors: ['Credenciais inválidas na db'],
      });
    }

    // Define os dados que serão armazenados no token
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
      nomeRole: user.nome_role,
      nomeDepartamento: user.nome_departamento,
      fotoUrl: user.foto ? `${url}${port}/images/${user.foto}` : null,
      entity,
    };
    const secret = '123455';
    // Define o tempo de expiração do token (1 hora)
    const expiresIn = 3600;

    // Gera o token com os dados definidos anteriormente e a chave secreta armazenada nas variáveis de ambiente
    const token = jwt.sign(data, secret, { expiresIn });

    // Retorna o token e as informações do usuário em um objeto JSON
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
        nomeRole: user.nome_role,
        nomeDepartamento: user.nome_departamento,
        fotoUrl: user.foto ? `${url}${port}/images/${user.foto}` : null,
        entity,
      },
    });
  }
}

export default new TokenController();
