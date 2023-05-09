'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.generateHash = void 0;
const bcryptjs_1 = __importDefault(require('bcryptjs'));
const saltRounds = 10;
function generateHash(password) {
  const salt = bcryptjs_1.default.genSaltSync(saltRounds);
  const hash = bcryptjs_1.default.hashSync(password, salt);
  return hash;
}
exports.generateHash = generateHash;
