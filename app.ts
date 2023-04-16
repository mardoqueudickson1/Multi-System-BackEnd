import express, { Application } from 'express';
import './knex/config/dabase';

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
    this.app.use('/api/users');
  }
}

export default new App().app;
