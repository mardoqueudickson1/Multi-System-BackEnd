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
exports.TodalProdutoEstoqueController = void 0;
const database_1 = __importDefault(require("../../config/database"));
//Classe principal
class TodalProdutoEstoqueController {
    constructor() {
        this.sumProductValues = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, database_1.default)('estoque').count('* as total').first();
                const totalQuantity = result || 0; // Quantidade total retornado pela consulta
                res.status(200).json(totalQuantity);
            }
            catch (error) {
                console.error('Erro ao somar os valores dos produtos:', error);
                res.status(500).json({ error: 'Erro ao somar os valores dos produtos' });
            }
        });
    }
}
exports.TodalProdutoEstoqueController = TodalProdutoEstoqueController;
exports.default = new TodalProdutoEstoqueController();
//#TODO estou treabalhando no estoque
