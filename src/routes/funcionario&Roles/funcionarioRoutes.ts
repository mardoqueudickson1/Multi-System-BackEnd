import Router from 'express';
import funcionarioController from '../../controllers/funcionario&Roles/funcionarioController';

const router = Router();

router.post('/', funcionarioController.create);
router.get('/:id', funcionarioController.show);
router.put('/:id', funcionarioController.update);
router.get('/', funcionarioController.index);
router.delete('/:id', funcionarioController.delete);

export default router;
