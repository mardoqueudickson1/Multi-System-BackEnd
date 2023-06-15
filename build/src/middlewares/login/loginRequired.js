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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../../config/database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { authorization } = req.headers;
        // Verifica se o header de autorização foi enviado
        if (!authorization) {
            return res.status(401).json({
                errors: ['Login required'],
            });
        }
        // Separa o token do header de autorização
        const [, token] = authorization.split(' ');
        try {
            // Verifica se o token é válido
            const secretKey = process.env.TOKEN_SECRET || '';
            const decoded = jsonwebtoken_1.default.verify(token, secretKey);
            const { id, email } = decoded;
            // Busca o usuário no banco de dados
            const user = yield (0, database_1.default)('funcionario').where({ id: id, email: email }).first();
            // const userAdmin = await db('admin_filho').where({ id: id, email: email  }).first();
            if (!user) {
                return res.status(401).json({
                    errors: ['Usuário inválido'],
                });
            }
            next();
        }
        catch (e) {
            return res.status(401).json({
                errors: ['Token expirado ou inválido'],
            });
        }
    });
}
exports.default = authMiddleware;
