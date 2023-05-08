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
const database_1 = __importDefault(require("../../config/database"));
exports.default = {
    index(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const contaAtivo = yield (0, database_1.default)('contas').where('tipo', 'ativo').first();
            const contaPassivo = yield (0, database_1.default)('contas').where('tipo', 'passivo').first();
            const ativos = contaAtivo.saldo;
            const passivos = contaPassivo.saldo;
            const balanco_geral = ativos - passivos;
            return res.json({ ativos, passivos, balanco_geral });
        });
    },
};
