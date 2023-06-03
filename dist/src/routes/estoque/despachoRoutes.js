"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const despachoController_1 = __importDefault(require("../../controllers/descpacho/despachoController"));
const router = (0, express_1.Router)();
router.post('/', despachoController_1.default.create);
router.get('/', despachoController_1.default.getAll);
router.get('/:id', despachoController_1.default.get);
exports.default = router;
