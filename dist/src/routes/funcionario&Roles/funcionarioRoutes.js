"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const funcionarioController_1 = __importDefault(require("../../controllers/funcionario&Roles/funcionarioController"));
const router = (0, express_1.default)();
router.post('/', funcionarioController_1.default.create);
router.get('/:id', funcionarioController_1.default.show);
router.get('/', funcionarioController_1.default.index);
router.delete('/:id', funcionarioController_1.default.delete);
exports.default = router;
