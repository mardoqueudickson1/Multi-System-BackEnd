'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const balance_1 = __importDefault(require('../../controllers/transacoes/balance'));
const router = (0, express_1.default)();
router.get('/', balance_1.default.index);
exports.default = router;
