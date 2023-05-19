"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const estoqueController_1 = __importDefault(require("../../controllers/estoque/estoqueController"));
const router = (0, express_1.default)();
router.get('/', estoqueController_1.default.index);
router.get('/:id', estoqueController_1.default.show);
router.post('/', estoqueController_1.default.create);
router.put('/:id', estoqueController_1.default.update);
router.delete('/:id', estoqueController_1.default.destroy);
exports.default = router;
