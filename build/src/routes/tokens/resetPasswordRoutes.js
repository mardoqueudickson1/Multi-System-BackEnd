"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resetPasswordController_1 = __importDefault(require("../../controllers/tokens/resetPasswordController"));
const router = (0, express_1.default)();
router.put('/', resetPasswordController_1.default.resetPassword);
exports.default = router;
