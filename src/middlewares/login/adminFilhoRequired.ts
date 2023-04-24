import jwt, { JwtPayload, Secret }  from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import db from '../../config/database'
import dotenv from 'dotenv';

dotenv.config();



interface CustomRequest extends Request {
    userId?: number;
    userEmail: string
  }

  interface TokenPayload extends JwtPayload {
    id: number;
    email: string;
  }

export default async function authMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  // Verifica se o header de autorização foi enviado
  if (!authorization) {
    return res.status(401).json({
      errors: ['Login required']
    });
  }

  // Separa o token do header de autorização
  const [, token] = authorization.split(' ');

  try {
    // Verifica se o token é válido
    const secretKey: Secret = process.env.TOKEN_SECRET || '';
    const decoded = jwt.verify(token, secretKey) as TokenPayload;
    const { id, email } = decoded;

    // Busca o usuário no banco de dados
    const user = await db('admin_filho').where({ id, email }).first();

    if (!user) {
      return res.status(401).json({
        errors: ['Usuário inválido']
      });
    }

    // Define o ID e o email do usuário na requisição
    req.userId = id;
    req.userEmail = email;

    next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido']
    });
  }
}

