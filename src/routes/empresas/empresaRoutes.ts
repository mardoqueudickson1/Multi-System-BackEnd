import Router from 'express';
import EmpresaPaiController from '../../controllers/empresa/empresaPaiController';

const router = Router();

router.post('/', EmpresaPaiController.create);
router.get('/', EmpresaPaiController.show);
export default router;
