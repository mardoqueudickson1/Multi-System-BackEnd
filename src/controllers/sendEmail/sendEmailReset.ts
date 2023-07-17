import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';

class EmailController {
  public async Teste(_req: Request, res: Response) {
    res.status(200).json('TESTOUUUUUUUUUUUUUUUU');
  }

  public async sendEmail(req: Request, res: Response) {
    const { to } = req.body;

    try {
      const token = uuidv4();
      // Configurar o serviço de e-mail
      const transporter = nodemailer.createTransport({
        host: 'smtp.outlook.com',
        port: 587,
        secure: false,
        auth: {
          user: 'mardoqueudickson@outlook.com',
          pass: 'Livingstony1234%',
        },
      });

      const resetSenhaLink = `http://seuapp.com/alterar-senha?token=${token}`;

      // Definir a duração de validade do token (1 hora neste exemplo)
      const expirationTime = new Date();
      expirationTime.setHours(expirationTime.getHours() + 1);

      // Mensagem de e-mail
      const emailMessage = `
            <p>Olá!</p>
            <p>Clique no link a seguir para alterar o seu a sua senha:</p>
            <a href="${resetSenhaLink}">${resetSenhaLink}</a>
            <p>Este link é válido até ${expirationTime.toLocaleString()}.</p>
            `;

      // Opções do e-mail
      const mailOptions = {
        from: 'mardoqueudickson@outlook.com',
        to,
        subject: 'Alteração de E-mail',
        html: emailMessage,
      };

      // Enviar o e-mail
      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: 'E-mail enviado com sucesso.' });
    } catch (error) {
      console.error('Erro ao enviar o e-mail:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao enviar o e-mail.' });
    }
  }
}

export default new EmailController();
