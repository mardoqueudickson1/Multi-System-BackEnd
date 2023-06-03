"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const totalValorcontroller_1 = __importDefault(require("../../controllers/estoque/totalValorcontroller"));
const router = (0, express_1.default)();
router.get('/', totalValorcontroller_1.default.sumProductTotalValue);
exports.default = router;
