import Router from 'express';
import DepartamentoController from '../../src/controllers/departamentocontroller';

const router = Router();

router.post('/', DepartamentoController.create);
router.get('/', DepartamentoController.show);

export default router;
