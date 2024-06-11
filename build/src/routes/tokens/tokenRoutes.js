"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tokenController_1 = __importDefault(require("../../controllers/tokens/tokenController"));
const resetPasswordController_1 = __importDefault(require("../../controllers/tokens/resetPasswordController"));
const router = (0, express_1.default)();
router.post('/', tokenController_1.default.store);
router.put('/', resetPasswordController_1.default.resetPassword);
exports.default = router;
