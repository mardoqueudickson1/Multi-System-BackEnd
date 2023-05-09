'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const path_1 = require('path');
const multer_1 = __importDefault(require('multer'));
const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);
exports.default = {
  // A propriedade fileFilter define uma função que é usada para filtrar os arquivos que serão processados pelo multer.
  fileFilter: (_req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      const Error = new multer_1.default.MulterError('LIMIT_FILE_SIZE');
      return cb(Error);
    }
    return cb(null, true);
  },
  // A propriedade storage define um objeto que configura onde e como os arquivos processados pelo multer serão armazenados.
  storage: multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, (0, path_1.resolve)(__dirname, '..', '..', 'uploads', 'images'));
    },
    // A propriedade filename define como os arquivos serão nomeados.
    filename: (_req, file, cb) => {
      const ext = (0, path_1.extname)(file.originalname);
      const filename = `${Date.now()}_${aleatorio()}${ext}`;
      cb(null, filename);
    },
  }),
};
