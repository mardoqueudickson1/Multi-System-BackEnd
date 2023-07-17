"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sendEmailReset_1 = __importDefault(require("../../controllers/sendEmail/sendEmailReset"));
const router = (0, express_1.Router)();
router.post('/', sendEmailReset_1.default.sendEmail);
router.get('/', sendEmailReset_1.default.Teste);
exports.default = router;
