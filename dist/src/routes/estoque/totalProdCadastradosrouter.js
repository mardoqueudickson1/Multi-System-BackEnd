"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const totalProdutoCadastrado_1 = __importDefault(require("../../controllers/estoque/totalProdutoCadastrado"));
const router = (0, express_1.default)();
router.get('/', totalProdutoCadastrado_1.default.sumProductValues);
exports.default = router;
