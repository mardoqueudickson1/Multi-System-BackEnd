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
        this.sumProductTotalValue = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, database_1.default)('estoque').sum('valor as total').first();
                const totalValue = result || 0;
                if (totalValue) {
                    // Formatação do valor como dinheiro, com vírgulas e pontos
                    const formattedValue = new Intl.NumberFormat('pt-AO', {
                        style: 'currency',
                        currency: 'AOA',
                        minimumFractionDigits: 2,
                    })
                        .format(Number(totalValue.total))
                        .replace(/\s/g, '')
                        .replace(/(?<=\d)(?=(\d{3})+(?!\d))/g, '.')
                        .replace(/,/g, ',');
                    res.status(200).json({ valor: formattedValue });
                }
                else {
                    res.status(200).json({ valor: totalValue });
                }
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
