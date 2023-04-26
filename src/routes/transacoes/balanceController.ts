import Router from 'express';

import balanceController from '../../controllers/transacoes/balance'

const router =  Router()

router.get('/', balanceController.index);


export default router;