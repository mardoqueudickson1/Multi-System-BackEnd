'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const departamentocontroller_1 = __importDefault(require('../../controllers/departamentos/departamentocontroller'));
const router = (0, express_1.default)();
router.post('/', departamentocontroller_1.default.create);
router.get('/', departamentocontroller_1.default.show);
exports.default = router;
