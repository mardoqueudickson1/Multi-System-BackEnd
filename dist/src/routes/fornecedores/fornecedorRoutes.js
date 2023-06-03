"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fornecedorController_1 = __importDefault(require("../../controllers/fornecedores/fornecedorController"));
const router = (0, express_1.Router)();
router.get('/', fornecedorController_1.default.getAll);
exports.default = router;
