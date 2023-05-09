'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const contasControlle_1 = __importDefault(require('../../controllers/contas/contasControlle'));
const router = (0, express_1.default)();
router.post('/', contasControlle_1.default.create);
router.get('/', contasControlle_1.default.show);
router.delete('/:id', contasControlle_1.default.delete);
exports.default = router;
