import Router from 'express';
import transactionController from '../controllers/transactionController';

const router = Router();

router.post('/', transactionController.create);
router.get('/', transactionController.index);

export default router;
