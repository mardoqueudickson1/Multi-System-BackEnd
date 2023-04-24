import express, { Application } from 'express';
import './src/config/database';

import empresaRoute from './src/routes/empresas/empresaRoutes';
import EmpresaFilhaRoutes from './src/routes/empresas/empresaFilhaRoutes';
import departamentoRoutes from './src/routes/departamentos/departamentoRoutes';
import roleroutes from './src/routes/funcionario&Roles/roleRoutes';
import contasRouter from './src/routes/contas/contasRouter';
import funcionarioRoutes from './src/routes/funcionario&Roles/funcionarioRoutes';
import transaction from './src/routes/transacoes/transactionRoutes';
import adminFilho from './src/routes/admin/adminFilho';
import TokenRoutes  from './src/routes/tokens/tokenRoutes'

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
    this.app.use('/empresa/filha/departamento', departamentoRoutes);
    this.app.use('/empresa/filha/funcionario', funcionarioRoutes);
    this.app.use('/empresa/filha/role', roleroutes);
    this.app.use('/empresa/filha/conta', contasRouter);
    this.app.use('/empresa/filha/transacoes', transaction);
    this.app.use('/empresa/filha/admin', adminFilho);
    this.app.use('/empresa/filha/token', TokenRoutes)
  }
}

export default new App().app;
