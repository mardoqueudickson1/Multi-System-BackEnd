'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const empresaFilhaController_1 = __importDefault(require('../../controllers/empresa/empresaFilhaController'));
const router = (0, express_1.default)();
router.post('/', empresaFilhaController_1.default.create);
router.get('/', empresaFilhaController_1.default.show);
exports.default = router;
