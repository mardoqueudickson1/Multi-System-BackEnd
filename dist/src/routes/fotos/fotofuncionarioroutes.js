'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = require('express');
const fotoFuncionarioController_1 = __importDefault(require('../../controllers/fotos/fotoFuncionarioController'));
const loginRequired_1 = __importDefault(require('../../middlewares/login/loginRequired'));
const router = (0, express_1.Router)();
router.post('/', loginRequired_1.default, fotoFuncionarioController_1.default.store);
router.put('/', loginRequired_1.default, fotoFuncionarioController_1.default.update);
exports.default = router;
