/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import estoquecontroller from './src/routes/estoque/estoqueRoutes';
import totalProCadastradoRouter from './src/routes/estoque/totalProdCadastradosrouter';
import totalProdutoValorRouter from './src/routes/estoque/totalValorRoutes';
import despachoRouter from './src/routes/estoque/despachoRoutes';
import fornecedores from './src/routes/fornecedores/fornecedorRoutes';
import pessoaReceber from './src/routes/fornecedores/PessoaReceberRoutes';

const whiteList = ['https://main--magenta-chaja-b4c1b3.netlify.app'];

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
  const delay = 50; // Delay de 1 segundo
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
    this.app.use('/empresa/filha/estoque', estoquecontroller);
    this.app.use('/empresa/filha/totalprodcadstradaos', totalProCadastradoRouter);
    this.app.use('/empresa/filha/totalvalor', totalProdutoValorRouter);
    this.app.use('/empresa/filha/despacho', despachoRouter);
    this.app.use('/empresa/filha/fornecedores', fornecedores);
    this.app.use('/empresa/filha/pessoareceber', pessoaReceber);
  }
}

export default new App().app;

// AAAAAAAAAAAA
