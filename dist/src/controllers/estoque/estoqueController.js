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
exports.EstoqueController = void 0;
const database_1 = __importDefault(require("../../config/database"));
//Classe principal
class EstoqueController {
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            try {
                const departamento = yield (0, database_1.default)('estoque').where({ id });
                res.json(departamento);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro do servidor' });
                console.log(error);
            }
        });
    }
    //Mostra a estoque
    index(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const esoque = yield (0, database_1.default)('estoque').select('*');
                res.status(201).json(esoque);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: 'Erro do servidor ao pesquisar' });
            }
        });
    }
    //Faz cadastro no estoque
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [id] = yield (0, database_1.default)('estoque').insert(req.body).returning('id');
                const novo = yield (0, database_1.default)('estoque').where({ id: id.id });
                res.status(201).json(novo);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro do servidor ao criar' });
                console.log(error);
            }
        });
    }
    //Atualiza
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            try {
                const rowsUpdated = yield (0, database_1.default)('estoque').where(id).update(req.body);
                if (rowsUpdated === 0) {
                    res.status(404).json({ message: 'esoque not found' });
                    return;
                }
                const esoque = yield (0, database_1.default)('estoque').where(id).first();
                res.json(esoque);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro do servidor' });
            }
        });
    }
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            try {
                const rowsDeleted = yield (0, database_1.default)('estoque').where(id).delete();
                if (rowsDeleted === 0) {
                    res.status(404).json({ message: 'estoque not found' });
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
exports.EstoqueController = EstoqueController;
exports.default = new EstoqueController();
//#TODO estou treabalhando no estoque
