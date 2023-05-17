import Router from 'express';
import EstoqueController from '../../controllers/estoque/estoqueController';

const router = Router();

router.get('/', EstoqueController.index);
router.post('/', EstoqueController.create);
router.put('/', EstoqueController.update);
router.delete('/', EstoqueController.destroy);

export default router;
