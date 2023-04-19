import Router from 'express';
import DepartamentoController from '../../controllers/departamentos/departamentocontroller';

const router = Router();

router.post('/', DepartamentoController.create);
router.get('/', DepartamentoController.show);

export default router;
