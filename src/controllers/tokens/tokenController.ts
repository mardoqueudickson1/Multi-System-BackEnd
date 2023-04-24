import dotenv from 'dotenv';
dotenv.config();
// console.log(`TOKEN GERADO: ${process.env.TOKEN_SECRET}`);

import bcrypt from 'bcryptjs';
import db from '../../config/database';
import jwt from "jsonwebtoken";
import { Request, Response } from "express";



class TokenController {
  async store(req: Request, res: Response) {
    const { email, password, entity } = req.body; // Recebe os dados de email, senha e tipo de entidade a ser autenticada

    // Verifica se os dados foram passados corretamente
    if (!email || !password || !entity) {
      return res.status(401).json({
        errors: ['Credenciais inválidas']
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
          errors: ['Tipo de entidade inválido']
        });
    }

    // Faz uma consulta no banco de dados buscando um usuário com o email informado na tabela correspondente à entidade
    const [user] = await db(table).where('email', email);

    // Verifica se o usuário existe e se a senha informada está correta
    const senhaCorreta = await bcrypt.compare(password, user.password_hash);

    if (!user || !senhaCorreta) {

      return res.status(401).json({
        errors: ['Credenciais inválidas na db']
      });
    }

    // Define os dados que serão armazenados no token
    const data = {
      id: user.id,
      email: user.email,
      entity
    }
    const secret = "123455"
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
        entity
      }
    });
  }
}

export default new TokenController();
