import express, { Application } from 'express';
import './src/config/database';

import empresaRoute from './src/routes/empresaRoutes';
import EmpresaFilhaRoutes from './src/routes/empresaFilhaRoutes';
import departamentoRoutes from './src/routes/departamentoRoutes';
import roleroutes from './src/routes/roleRoutes';
import contasRouter from './src/routes/contasRouter';
import funcionarioRoutes from './src/routes/funcionarioRoutes';

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
  }
}

export default new App().app;
