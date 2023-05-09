import multer from 'multer';
import multerConfig from '../../config/multerConfig';
import db from '../../config/database';

const upload = multer(multerConfig).single('foto_funcionario');

class FotoFuncionarioController {
  public async store(req: any, res: any): Promise<any> {
    return upload(req, res, async (error: any) => {
      if (error) {
        if (error.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            errors: ['Arquivo precisa ser PNG ou JPG'],
          });
        }
      }

      try {
        const { originalname, filename } = req.file;
        const { funcinario_id } = req.body;
        await db('foto_funcionario').insert({ originalname, filename, funcinario_id });
        return res.json({
          success: ['Foto enviada com sucesso'],
        });
      } catch (e) {
        console.log(e);
        return res.status(400).json({
          errors: ['erro desconhecido'],
        });
      }
    });
  }

  public async update(req: any, res: any): Promise<any> {
    return upload(req, res, async (error: any) => {
      if (error) {
        if (error.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            errors: ['Arquivo precisa ser PNG ou JPG'],
          });
        }
      }

      try {
        const { originalname, filename } = req.file;
        const { funcinario_id } = req.body;
        await db('foto_funcionario').update({ originalname, filename, funcinario_id });
        return res.json({
          success: ['Foto enviada com sucesso'],
        });
      } catch (e) {
        console.log(e);
        return res.status(400).json({
          errors: ['erro desconhecido'],
        });
      }
    });
  }
}

export default new FotoFuncionarioController();
