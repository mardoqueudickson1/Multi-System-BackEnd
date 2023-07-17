import Router from 'express';
// import DepartamentoController from '../../controllers/departamentos/departamentocontroller';
import sendemaiReset from '../../controllers/sendEmail/sendEmailReset';

const router = Router();

// router.post('/', DepartamentoController.create);
router.post('/', sendemaiReset.sendEmail);

export default router;
