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
exports.AdminFilhoController = void 0;
const hashPassWord_1 = require("../../utils/hashPassWord");
const database_1 = __importDefault(require("../../config/database"));
//Classe principal
class AdminFilhoController {
    // public async index(req: Request, res: Response): Promise<void> {
    //   const id = Number(req.params.id);
    //   try {
    //     const empresa = await db<AdminFilho>('funcionario').where({ id });
    //     res.json(empresa);
    //   } catch (error) {
    //     res.status(500).json({ message: 'Erro do servidor' });
    //   }
    // }
    //Mostra a empresa filha
    show(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admins = yield (0, database_1.default)('admin_filho').select('*');
                res.status(201).json(admins);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: 'Erro no servidor' });
            }
        });
    }
    //Cria a admin da empresa filha
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
            let novoAdminFilho = req.body;
            novoAdminFilho['n_admin_filho'] = numero;
            novoAdminFilho['password_hash'] = senha;
            try {
                const [id] = yield (0, database_1.default)('admin_filho').insert(novoAdminFilho).returning('id');
                const novo = yield (0, database_1.default)('admin_filho').where({ id: id.id });
                res.status(201).json(novo);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro do servidor ao criar' });
                console.log(error);
            }
        });
    }
}
exports.AdminFilhoController = AdminFilhoController;
exports.default = new AdminFilhoController();
