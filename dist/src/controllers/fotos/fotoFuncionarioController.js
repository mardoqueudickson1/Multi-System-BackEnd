"use strict";
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
const multer_1 = __importDefault(require("multer"));
const multerConfig_1 = __importDefault(require("../../config/multerConfig"));
const database_1 = __importDefault(require("../../config/database"));
const upload = (0, multer_1.default)(multerConfig_1.default).single('foto_funcionario');
class FotoFuncionarioController {
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return upload(req, res, (error) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    if (error.code === 'LIMIT_FILE_SIZE') {
                        return res.status(400).json({
                            errors: ["Arquivo precisa ser PNG ou JPG"],
                        });
                    }
                }
                try {
                    const { originalname, filename } = req.file;
                    const { funcinario_id } = req.body;
                    yield (0, database_1.default)('foto_funcionario').insert({ originalname, filename, funcinario_id });
                    return res.json({
                        success: ["Foto enviada com sucesso"]
                    });
                }
                catch (e) {
                    console.log(e);
                    return res.status(400).json({
                        errors: ['erro desconhecido'],
                    });
                }
            }));
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return upload(req, res, (error) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    if (error.code === 'LIMIT_FILE_SIZE') {
                        return res.status(400).json({
                            errors: ["Arquivo precisa ser PNG ou JPG"],
                        });
                    }
                }
                try {
                    const { originalname, filename } = req.file;
                    const { funcinario_id } = req.body;
                    yield (0, database_1.default)('foto_funcionario').update({ originalname, filename, funcinario_id });
                    return res.json({
                        success: ["Foto enviada com sucesso"]
                    });
                }
                catch (e) {
                    console.log(e);
                    return res.status(400).json({
                        errors: ['erro desconhecido'],
                    });
                }
            }));
        });
    }
}
exports.default = new FotoFuncionarioController();
