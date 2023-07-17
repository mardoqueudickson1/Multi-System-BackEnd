import { Router } from 'express';
import sendemaiReset from '../../controllers/sendEmail/sendEmailReset';

const router = Router();

router.post('/', sendemaiReset.sendEmail);
router.get('/', sendemaiReset.Teste);

export default router;
