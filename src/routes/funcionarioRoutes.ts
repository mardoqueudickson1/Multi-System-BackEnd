import Router from 'express';
import funcionarioController from '../controllers/funcionarioController';

const router = Router();

router.post('/', funcionarioController.create);
router.get('/', funcionarioController.show);
router.get('/:id', funcionarioController.index);

export default router;
