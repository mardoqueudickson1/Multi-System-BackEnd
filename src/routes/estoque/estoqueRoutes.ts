import Router from 'express';
import EstoqueController from '../../controllers/estoque/estoqueController';

const router = Router();

router.get('/', EstoqueController.index);
router.get('/:id', EstoqueController.show);
router.post('/', EstoqueController.create);
router.put('/:id', EstoqueController.update);
router.delete('/:id', EstoqueController.delete);

export default router;
