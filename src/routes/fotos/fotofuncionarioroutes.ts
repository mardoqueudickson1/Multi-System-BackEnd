import { Router } from "express";
import fotoFuncionarioController from "../../controllers/fotos/fotoFuncionarioController";
import loginRequired from '../../middlewares/login/loginRequired'


const router = Router()

router.post('/', loginRequired, fotoFuncionarioController.store)

export default router