'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const transactionController_1 = __importDefault(require('../../controllers/transacoes/transactionController'));
// import FunciorioRequired  from '../../middlewares/login/funcionarioRequired'
const router = (0, express_1.default)();
router.post('/', transactionController_1.default.create);
router.get('/', transactionController_1.default.show);
router.get('/:id', transactionController_1.default.index);
router.delete('/:id', transactionController_1.default.delete);
exports.default = router;
