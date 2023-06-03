import { Router } from 'express';
import fornecedorcontroller from '../../controllers/fornecedores/fornecedorController';

const router = Router();

router.get('/', fornecedorcontroller.getAll);

export default router;
