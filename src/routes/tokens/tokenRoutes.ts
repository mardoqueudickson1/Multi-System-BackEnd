import Router from 'express';
import Token from '../../controllers/tokens/tokenController';

const router = Router();

router.post('/', Token.store);

export default router;
