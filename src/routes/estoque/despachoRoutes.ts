import { Router } from 'express';
import despachoController from '../../controllers/descpacho/despachoController';

const router = Router();

router.post('/', despachoController.create);

export default router;
