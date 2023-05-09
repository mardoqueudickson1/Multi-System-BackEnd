import express, { Application } from 'express';
import { resolve } from 'path';
import cors from 'cors';

import './src/config/database';
import empresaRoute from './src/routes/empresas/empresaRoutes';
import EmpresaFilhaRoutes from './src/routes/empresas/empresaFilhaRoutes';
import departamentoRoutes from './src/routes/departamentos/departamentoRoutes';
import roleroutes from './src/routes/funcionario&Roles/roleRoutes';
import contasRouter from './src/routes/contas/contasRouter';
import funcionarioRoutes from './src/routes/funcionario&Roles/funcionarioRoutes';
import transaction from './src/routes/transacoes/transactionRoutes';
import adminFilho from './src/routes/admin/adminFilho';
import TokenRoutes from './src/routes/tokens/tokenRoutes';
import Balance from './src/routes/transacoes/balanceController';
import AtivosRoutes from './src/routes/transacoes/ativosRoutes';
import passivosRoutes from './src/routes/transacoes/passivosRoutes';
import fotofuncionarioRouter from './src/routes/fotos/fotofuncionarioroutes';

const whiteList = ['http://localhost:3000'];

const corsOptions = {
  origin: function (origin: any, callback: Function) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Função de middleware para adicionar um delay
function delayMiddleware(_req: any, _res: any, next: Function) {
  const delay = 1000; // Delay de 1 segundo
  setTimeout(next, delay);
}

// Classe da aplicação principal
export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(resolve(__dirname, 'uploads')));
    this.app.use(delayMiddleware);
  }

  private routes(): void {
    this.app.use('/empresa', empresaRoute);
    this.app.use('/empresa/filha', EmpresaFilhaRoutes);
    this.app.use('/empresa/filha/departamento', departamentoRoutes);
    this.app.use('/empresa/filha/funcionario', funcionarioRoutes);
    this.app.use('/empresa/filha/role', roleroutes);
    this.app.use('/empresa/filha/conta', contasRouter);
    this.app.use('/empresa/filha/transacoes', transaction);
    this.app.use('/empresa/filha/admin', adminFilho);
    this.app.use('/empresa/filha/token', TokenRoutes);
    this.app.use('/empresa/filha/balanco', Balance);
    this.app.use('/empresa/filha/ativos', AtivosRoutes);
    this.app.use('/empresa/filha/passivos', passivosRoutes);
    this.app.use('/empresa/filha/foto', fotofuncionarioRouter);
  }
}

export default new App().app;




