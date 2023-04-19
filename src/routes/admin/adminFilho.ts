import Router from 'express';
import adminFilhoController from '../../controllers/admin/adminFilhoController';

const router = Router();

router.post('/', adminFilhoController.create);
router.get('/', adminFilhoController.show);

export default router;
