import Router from 'express';
import transactionController from '../../controllers/transacoes/transactionController';

const router = Router();

router.post('/', transactionController.create);
router.get('/', transactionController.index);

export default router;
