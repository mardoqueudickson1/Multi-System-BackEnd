import { extname, resolve } from 'path';
import multer, { FileFilterCallback } from 'multer';


const aleatorio = (): number => Math.floor(Math.random() * 10000 + 10000);


export default {
  // A propriedade fileFilter define uma função que é usada para filtrar os arquivos que serão processados pelo multer.
  fileFilter: (_req: any, file: any, cb: FileFilterCallback) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
    const Error = new multer.MulterError('LIMIT_FILE_SIZE');
      return cb(Error);
    }

    return cb(null, true);
  },

  // A propriedade storage define um objeto que configura onde e como os arquivos processados pelo multer serão armazenados.
  storage: multer.diskStorage({
    destination: (_req: any, _file: any, cb: any) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },

    // A propriedade filename define como os arquivos serão nomeados.
    filename: (_req: any, file: any, cb: any) => {
      const ext = extname(file.originalname);
      const filename = `${Date.now()}_${aleatorio()}${ext}`;
      cb(null, filename);
    },
  }),
};
