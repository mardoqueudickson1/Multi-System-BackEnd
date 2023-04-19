import Router from 'express';
import EmpresaFilha from '../../controllers/empresa/empresaFilhaController';

const router = Router();

router.post('/', EmpresaFilha.create);
router.get('/', EmpresaFilha.show);

export default router;
