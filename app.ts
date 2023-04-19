import express, { Application } from 'express';
import './src/config/database';

import empresaRoute from './src/routes/empresas/empresaRoutes';
import EmpresaFilhaRoutes from './src/routes/empresas/empresaFilhaRoutes';
import departamentoRoutes from './src/routes/departamentos/departamentoRoutes';
import roleroutes from './src/routes/funcionario&Roles/roleRoutes';
import contasRouter from './src/routes/contas/contasRouter';
import funcionarioRoutes from './src/routes/funcionario&Roles/funcionarioRoutes';
import transaction from './src/routes/transacoes/transactionRoutes';

// Classe da aplicação principal
export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes(): void {
    this.app.use('/empresa', empresaRoute);
    this.app.use('/empresa/filha', EmpresaFilhaRoutes);
    this.app.use('/departamento', departamentoRoutes);
    this.app.use('/funcionario', funcionarioRoutes);
    this.app.use('/role', roleroutes);
    this.app.use('/contas', contasRouter);
    this.app.use('/transacoes', transaction);
  }
}

export default new App().app;
