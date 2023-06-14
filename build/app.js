"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const cors_1 = __importDefault(require("cors"));
require("./src/config/database");
const empresaRoutes_1 = __importDefault(require("./src/routes/empresas/empresaRoutes"));
const empresaFilhaRoutes_1 = __importDefault(require("./src/routes/empresas/empresaFilhaRoutes"));
const departamentoRoutes_1 = __importDefault(require("./src/routes/departamentos/departamentoRoutes"));
const roleRoutes_1 = __importDefault(require("./src/routes/funcionario&Roles/roleRoutes"));
const contasRouter_1 = __importDefault(require("./src/routes/contas/contasRouter"));
const funcionarioRoutes_1 = __importDefault(require("./src/routes/funcionario&Roles/funcionarioRoutes"));
const transactionRoutes_1 = __importDefault(require("./src/routes/transacoes/transactionRoutes"));
const adminFilho_1 = __importDefault(require("./src/routes/admin/adminFilho"));
const tokenRoutes_1 = __importDefault(require("./src/routes/tokens/tokenRoutes"));
const balanceController_1 = __importDefault(require("./src/routes/transacoes/balanceController"));
const ativosRoutes_1 = __importDefault(require("./src/routes/transacoes/ativosRoutes"));
const passivosRoutes_1 = __importDefault(require("./src/routes/transacoes/passivosRoutes"));
const fotofuncionarioroutes_1 = __importDefault(require("./src/routes/fotos/fotofuncionarioroutes"));
const estoqueRoutes_1 = __importDefault(require("./src/routes/estoque/estoqueRoutes"));
const totalProdCadastradosrouter_1 = __importDefault(require("./src/routes/estoque/totalProdCadastradosrouter"));
const totalValorRoutes_1 = __importDefault(require("./src/routes/estoque/totalValorRoutes"));
const despachoRoutes_1 = __importDefault(require("./src/routes/estoque/despachoRoutes"));
const fornecedorRoutes_1 = __importDefault(require("./src/routes/fornecedores/fornecedorRoutes"));
const PessoaReceberRoutes_1 = __importDefault(require("./src/routes/fornecedores/PessoaReceberRoutes"));
const whiteList = ['https://magenta-custard-5b07fc.netlify.app', 'http://localhost:3000'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};
// Função de middleware para adicionar um delay
function delayMiddleware(_req, _res, next) {
    const delay = 50; // Delay de 1 segundo
    setTimeout(next, delay);
}
// Classe da aplicação principal
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use((0, cors_1.default)(corsOptions));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.static((0, path_1.resolve)(__dirname, 'uploads')));
        this.app.use(delayMiddleware);
    }
    routes() {
        this.app.use('/empresa', empresaRoutes_1.default);
        this.app.use('/empresa/filha', empresaFilhaRoutes_1.default);
        this.app.use('/empresa/filha/departamento', departamentoRoutes_1.default);
        this.app.use('/empresa/filha/funcionario', funcionarioRoutes_1.default);
        this.app.use('/empresa/filha/role', roleRoutes_1.default);
        this.app.use('/empresa/filha/conta', contasRouter_1.default);
        this.app.use('/empresa/filha/transacoes', transactionRoutes_1.default);
        this.app.use('/empresa/filha/admin', adminFilho_1.default);
        this.app.use('/empresa/filha/token', tokenRoutes_1.default);
        this.app.use('/empresa/filha/balanco', balanceController_1.default);
        this.app.use('/empresa/filha/ativos', ativosRoutes_1.default);
        this.app.use('/empresa/filha/passivos', passivosRoutes_1.default);
        this.app.use('/empresa/filha/foto', fotofuncionarioroutes_1.default);
        this.app.use('/empresa/filha/estoque', estoqueRoutes_1.default);
        this.app.use('/empresa/filha/totalprodcadstradaos', totalProdCadastradosrouter_1.default);
        this.app.use('/empresa/filha/totalvalor', totalValorRoutes_1.default);
        this.app.use('/empresa/filha/despacho', despachoRoutes_1.default);
        this.app.use('/empresa/filha/fornecedores', fornecedorRoutes_1.default);
        this.app.use('/empresa/filha/pessoareceber', PessoaReceberRoutes_1.default);
    }
}
exports.App = App;
exports.default = new App().app;
