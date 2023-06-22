"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const database_1 = __importDefault(require("../../config/database"));
const hashPassWord_1 = require("../../utils/hashPassWord");
class PasswordResetController {
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token, password } = req.body;
                const password_hash = (0, hashPassWord_1.generateHash)(password);
                const secretKey = process.env.TOKEN_SECRET || '';
                const decoded = jsonwebtoken_1.default.verify(token, secretKey);
                const { id, email } = decoded;
                const rowsUpdated = yield (0, database_1.default)('funcionario').where({ id }).update({ password_hash: password_hash });
                if (rowsUpdated === 0) {
                    res.status(404).json({ message: 'funcionario not found' });
                    return;
                }
                res.status(200).json({
                    email: email,
                    message: 'Senha alterada com sucesso',
                });
            }
            catch (error) {
                console.log(error);
                if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                    res.status(400).json({ message: 'Token expirado' });
                }
                else {
                    res.status(400).json({ message: 'ERRO no servidor' });
                }
            }
        });
    }
}
exports.default = new PasswordResetController();
