import Router from 'express';
import totalProdutoCadastrado from '../../controllers/estoque/totalProdutoCadastrado';

const router = Router();

router.get('/', totalProdutoCadastrado.sumProductValues);

export default router;
