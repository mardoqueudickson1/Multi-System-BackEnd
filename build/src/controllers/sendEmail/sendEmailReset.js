"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const nodemailer_1 = __importDefault(require("nodemailer"));
class EmailController {
    Teste(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).json('TESTOUUUUUUUUUUUUUUUU');
        });
    }
    sendEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { to } = req.body;
            try {
                const token = (0, uuid_1.v4)();
                // Configurar o serviço de e-mail
                const transporter = nodemailer_1.default.createTransport({
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
                yield transporter.sendMail(mailOptions);
                res.status(200).json({ message: 'E-mail enviado com sucesso.' });
            }
            catch (error) {
                console.error('Erro ao enviar o e-mail:', error);
                res.status(500).json({ error: 'Ocorreu um erro ao enviar o e-mail.' });
            }
        });
    }
}
exports.default = new EmailController();
