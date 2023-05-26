import Router from 'express';
import totalValorcontroller from '../../controllers/estoque/totalValorcontroller';

const router = Router();

router.get('/', totalValorcontroller.sumProductTotalValue);

export default router;
