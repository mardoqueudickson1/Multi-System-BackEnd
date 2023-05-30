import { Router } from 'express';
import despachoController from '../../controllers/descpacho/despachoController';

const router = Router();

router.post('/', despachoController.create);
router.get('/', despachoController.getAll);
router.get('/:id', despachoController.get);

export default router;
