import Router from 'express';
import RoleController from '../../controllers/funcionario&Roles/roleController';

const router = Router();

router.post('/', RoleController.create);
router.get('/', RoleController.show);
router.get('/:id', RoleController.index);

export default router;
