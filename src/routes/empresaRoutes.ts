import Router from 'express';
import EmpresaController from '../../src/controllers/empresaController';

const router = Router();

router.post('/', EmpresaController.create);
router.get('/', EmpresaController.show);
export default router;
