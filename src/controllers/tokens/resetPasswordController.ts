import jwt, { Secret, TokenExpiredError } from 'jsonwebtoken';
import { Request, Response } from 'express';
import db from '../../config/database';
import { generateHash } from '../../utils/hashPassWord';
import { TokenPayload, Funcionario } from '../../interfaces/interfaces';

class PasswordResetController {
  public async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { token, password } = req.body;
      const password_hash: string = generateHash(password);
      const secretKey: Secret = process.env.TOKEN_SECRET || '';
      const decoded = jwt.verify(token, secretKey) as TokenPayload;
      const { id, email } = decoded;

      const rowsUpdated = await db<Funcionario>('funcionario').where({ id }).update({ password_hash: password_hash });
      if (rowsUpdated === 0) {
        res.status(404).json({ message: 'funcionario not found' });
        return;
      }
      res.status(200).json({
        email: email,
        message: 'Senha alterada com sucesso',
      });
    } catch (error) {
      console.log(error);
      if (error instanceof TokenExpiredError) {
        res.status(400).json({ message: 'Token expirado' });
      } else {
        res.status(400).json({ message: 'ERRO no servidor' });
      }
    }
  }
}

export default new PasswordResetController();
