import Router from 'express';
import transactionController from '../../controllers/transacoes/transactionController';
// import FunciorioRequired  from '../../middlewares/login/funcionarioRequired'

const router = Router();

router.post('/', transactionController.create);
router.get('/', transactionController.show);

export default router;
