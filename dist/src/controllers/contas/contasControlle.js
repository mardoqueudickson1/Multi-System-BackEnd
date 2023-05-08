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
exports.ContasController = void 0;
const database_1 = __importDefault(require("../../config/database"));
//Classe principal
class ContasController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            try {
                const contas = yield (0, database_1.default)('contas').where(id);
                res.json(contas);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro do servidor' });
            }
        });
    }
    //Mostra o contas
    show(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contas = yield (0, database_1.default)('contas').select('*');
                res.status(201).json(contas);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: 'Erro no servidor' });
            }
        });
    }
    //Cria o contas
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, descricao, tipo, empresa_filha_id } = req.body;
            const saldo = 0;
            try {
                yield (0, database_1.default)('contas').insert({
                    descricao,
                    tipo,
                    saldo: saldo,
                    empresa_filha_id
                });
                const novo = yield (0, database_1.default)('contas').where(id);
                res.status(201).json(novo);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro do servidor ao criar' });
                console.log(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            try {
                const rowsDeleted = yield (0, database_1.default)('contas').where({ id }).delete();
                if (rowsDeleted === 0) {
                    res.status(404).json({ message: 'Empresa not found' });
                    return;
                }
                res.status(204).send("APAGADO COM SUCESSO");
            }
            catch (error) {
                res.status(500).json({ message: 'Erro do servidor' });
            }
        });
    }
}
exports.ContasController = ContasController;
exports.default = new ContasController();
