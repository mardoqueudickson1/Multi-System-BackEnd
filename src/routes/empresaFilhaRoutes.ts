import Router from 'express';
import EmpresaFilha from '../../src/controllers/empresaFilhaController';

const router = Router();

router.post('/', EmpresaFilha.create);
router.get('/', EmpresaFilha.show);

export default router;
