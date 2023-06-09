import Router from 'express';
import passivosController from '../../controllers/transacoes/passivosController';

const router = Router();

router.get('/', passivosController.ativos);

export default router;
