"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const empresaPaiController_1 = __importDefault(require("../../controllers/empresa/empresaPaiController"));
const router = (0, express_1.default)();
router.post('/', empresaPaiController_1.default.create);
router.get('/', empresaPaiController_1.default.show);
exports.default = router;
