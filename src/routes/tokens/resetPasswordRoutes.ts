import Router from 'express';
import ResetPassword from '../../controllers/tokens/resetPasswordController';

const router = Router();

router.put('/', ResetPassword.resetPassword);

export default router;
