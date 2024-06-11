import Router from 'express';
import DepartamentoController from '../../controllers/departamentos/departamentocontroller';
// import sendemaiReset from '../../controllers/sendEmail/sendEmailReset';

const router = Router();

router.post('/', DepartamentoController.create);
router.get('/', DepartamentoController.index);
// router.post('/', sendemaiReset.sendEmail);

export default router;
