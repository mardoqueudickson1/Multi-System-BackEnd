import Router from 'express';
import RoleController from '../controllers/roleController';

const router = Router();

router.post('/', RoleController.create);
router.get('/', RoleController.index);

export default router;
