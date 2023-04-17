import Router from 'express';
import EmpresaController from '../controllers/empresaFilhaController';

const router = Router();

router.post('/', EmpresaController.create);
router.get('/', EmpresaController.show);
export default router;
