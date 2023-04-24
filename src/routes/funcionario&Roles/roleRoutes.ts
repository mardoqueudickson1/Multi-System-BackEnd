import Router from 'express';
import RoleController from '../../controllers/funcionario&Roles/roleController';
import LoginRequired  from '../../middlewares/login/adminFilhoRequired'

const router = Router();

router.post('/', RoleController.create);
router.get('/', LoginRequired, RoleController.show);
router.get('/:id', RoleController.index);

export default router;
