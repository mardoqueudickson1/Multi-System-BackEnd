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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = __importDefault(require("../../config/database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class TokenController {
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, entity } = req.body;
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
            const [user] = yield (0, database_1.default)(table).where('email', email);
            if (!user) {
                return res.status(401).json({
                    errors: ['Credenciais inválidas'],
                });
            }
            const secret = '123455';
            // #TODO TIRAR ISSO
            const expiresIn = 3600;
            const defaultPassword = '12345';
            const senhaCorreta = yield bcryptjs_1.default.compare(password, user.password_hash);
            const ismatchPassword = yield bcryptjs_1.default.compare(defaultPassword, user.password_hash);
            if (!senhaCorreta) {
                return res.status(401).json({
                    errors: ['Senha inválidas '],
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
                const token = jsonwebtoken_1.default.sign(data, secret, { expiresIn });
                // Retorna o token e as informações do usuário em um objeto JSON
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
                        entity,
                    },
                });
            }
            // Gera o token com os dados definidos anteriormente e a chave secreta armazenada nas variáveis de ambiente
            const token = jsonwebtoken_1.default.sign(data, secret, { expiresIn });
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
                    entity,
                },
            });
        });
    }
}
exports.default = new TokenController();
