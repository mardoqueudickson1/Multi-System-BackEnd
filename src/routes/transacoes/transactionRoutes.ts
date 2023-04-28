import Router from 'express';
import transactionController from '../../controllers/transacoes/transactionController';
// import FunciorioRequired  from '../../middlewares/login/funcionarioRequired'

const router = Router();

router.post('/', transactionController.create);
router.get('/', transactionController.show);
router.get('/:id', transactionController.index);


export default router;
