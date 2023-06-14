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
exports.FuncionarioController = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database_1 = __importDefault(require("../../config/database"));
const hashPassWord_1 = require("../../utils/hashPassWord");
const url = process.env.APP_URL;
const port = process.env.APP_PORT;
//Classe principal
class FuncionarioController {
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            try {
                const empresa = yield (0, database_1.default)('funcionario')
                    .join('role', 'funcionario.role_id', '=', 'role.id')
                    .join('departamento', 'funcionario.departamento_id', '=', 'departamento.id')
                    .select('funcionario.*', 'role.nome AS nome_role', 'departamento.nome AS nome_departamento')
                    .where('funcionario.id', '=', id)
                    .first();
                res.json(empresa);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: 'Erro do servidor' });
            }
        });
    }
    //Mostra todos funcionarios
    index(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const funcionario = yield (0, database_1.default)('funcionario')
                    .join('role', 'funcionario.role_id', '=', 'role.id')
                    .join('departamento', 'funcionario.departamento_id', '=', 'departamento.id')
                    .leftJoin('foto_funcionario', 'funcionario.id', '=', 'foto_funcionario.funcinario_id')
                    .select('funcionario.*', 'role.nome AS nome_role', 'departamento.nome AS nome_departamento', 'foto_funcionario.filename AS foto')
                    .orderBy('funcionario.id', 'desc');
                const funcionariosComImagem = funcionario.map((f) => {
                    return Object.assign(Object.assign({}, f), { fotoUrl: f.foto ? `${url}${port}/images/${f.foto}` : null });
                });
                res.json(funcionariosComImagem);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: 'Erro do servidor' });
            }
        });
    }
    //Cria a funcionário
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const password = '12345';
                const senha = (0, hashPassWord_1.generateHash)(password);
                //Gera número aleatório para cada funcionário com prefixo do ano atual
                const aleatorio = Math.floor(Math.random() * (10 + 20) + 10);
                const aleatorio2 = Math.floor(Math.random() * (0 + 9) + 0);
                const data = new Date();
                const ano = data.getFullYear();
                const segundos = data.getSeconds();
                let numero = [ano, aleatorio, segundos].join('');
                if (numero.length < 8)
                    numero = [ano, aleatorio, aleatorio2, segundos].join('');
                //Pega dados no corpo do campo
                const novoFuncionario = req.body;
                novoFuncionario['n_funcionario'] = numero;
                novoFuncionario['password_hash'] = senha;
                const [id] = yield (0, database_1.default)('funcionario').insert(novoFuncionario).returning('id');
                const novo = yield (0, database_1.default)('funcionario').where({ id: id.id });
                res.status(201).json(novo);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro do servidor ao criar' });
                console.log(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            try {
                const rowsUpdated = yield (0, database_1.default)('funcionario').where({ id }).update(req.body);
                if (rowsUpdated === 0) {
                    res.status(404).json({ message: 'funcionario not found' });
                    return;
                }
                const empresa = yield (0, database_1.default)('funcionario').where({ id }).first();
                res.json(empresa);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro do servidor' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            try {
                const rowsDeleted = yield (0, database_1.default)('funcionario').where({ id }).delete();
                if (rowsDeleted === 0) {
                    res.status(404).json({ message: 'Empresa not found' });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ message: 'Erro do servidor' });
            }
        });
    }
}
exports.FuncionarioController = FuncionarioController;
exports.default = new FuncionarioController();
