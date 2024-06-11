import Router from 'express';
import Token from '../../controllers/tokens/tokenController';
import ResetPassword from '../../controllers/tokens/resetPasswordController';


const router = Router();

router.post('/', Token.store);
router.put('/', ResetPassword.resetPassword);

export default router;
