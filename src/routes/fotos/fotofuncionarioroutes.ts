import { Router } from "express";
import fotoFuncionarioController from "../../controllers/fotos/fotoFuncionarioController";
import loginRequired from '../../middlewares/login/loginRequired'


const router = Router()

router.post('/', loginRequired, fotoFuncionarioController.store)
router.put('/', loginRequired, fotoFuncionarioController.update)


export default router