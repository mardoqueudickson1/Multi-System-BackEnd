"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ativosController_1 = __importDefault(require("../../controllers/transacoes/ativosController"));
const router = (0, express_1.default)();
router.get('/', ativosController_1.default.ativos);
exports.default = router;
