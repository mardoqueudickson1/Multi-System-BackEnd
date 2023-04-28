import Router  from 'express'
import ativiosController from '../../controllers/transacoes/ativosController'

const router = Router()

router.get('/', ativiosController.ativos)

export default router