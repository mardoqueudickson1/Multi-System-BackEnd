import Router from 'express';
import ContasController from '../../controllers/contas/contasControlle';

const router = Router();

router.post('/', ContasController.create);
router.get('/', ContasController.show);

export default router;
