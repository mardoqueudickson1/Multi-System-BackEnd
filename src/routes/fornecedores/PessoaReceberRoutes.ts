import { Router } from 'express';
import pessoaRecebercontroller from '../../controllers/fornecedores/pessoaReceberControlle';

const router = Router();

router.get('/', pessoaRecebercontroller.getAll);

export default router;
