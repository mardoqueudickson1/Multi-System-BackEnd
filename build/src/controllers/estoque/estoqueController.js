"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueController = void 0;
const database_1 = __importDefault(require("../../config/database"));
//Classe principal
class EstoqueController {
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            try {
                const stock = yield (0, database_1.default)('estoque')
                    .select('estoque.*', 'fornecedor.nome as nome_fornecedor', 'fornecedor.telefone', 'fornecedor.endereco')
                    .join('fornecedor', 'estoque.fornecedor_id', 'fornecedor.id')
                    .where('estoque.id', id);
                res.json(stock);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro do servidor' });
                console.log(error);
            }
        });
    }
    //Mostra a estoque
    index(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.raw(`
      SELECT *, to_char(estoque.updated_at, 'DD-MM-YYYY') as data_formatada 
      FROM estoque
      ORDER BY estoque.updated_at DESC
    `);
            // Formatação de valor na moeda nacional(KZ)
            const formattedValue = new Intl.NumberFormat('pt-AO', {
                style: 'currency',
                currency: 'AOA',
                minimumFractionDigits: 2,
            }).format(Number(result.valor));
            const dados = result.rows.map((row) => (Object.assign(Object.assign({}, row), { data_formatada: row.data_formatada.toString(), valor_total: row.valor * row.quantidade, valor_formatada: formattedValue })));
            res.status(200).json(dados);
        });
    }
    //Faz cadastro no estoque
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const aleatorio = Math.floor(Math.random() * (10 + 20) + 10);
                const aleatorio2 = Math.floor(Math.random() * (0 + 9) + 0);
                const aleatorio4 = Math.floor(Math.random() * (0 + 9) + 0);
                const pre = 'TSE';
                const data = new Date();
                const ano = data.getFullYear();
                const segundos = data.getSeconds();
                let numero = [ano, aleatorio, segundos].join('');
                if (numero.length < 10)
                    numero = [pre, ano, aleatorio, aleatorio2, aleatorio4, segundos].join('');
                const { nome, descricao, categoria, valor, quantidade, fornecedor } = req.body;
                const [Fornecedor] = yield (0, database_1.default)('fornecedor').insert(fornecedor).returning('id');
                const [id] = yield (0, database_1.default)('estoque')
                    .insert({
                    fornecedor_id: Fornecedor.id,
                    n_transacao: numero,
                    nome,
                    categoria,
                    descricao,
                    valor,
                    quantidade,
                })
                    .returning('id');
                const novo = yield (0, database_1.default)('estoque').where({ id: id.id });
                res.status(201).json(novo);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro do servidor ao criar' });
                console.log(error);
            }
        });
    }
    //Atualiza
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            try {
                const rowsUpdated = yield (0, database_1.default)('estoque').where({ id }).update(req.body);
                if (rowsUpdated === 0) {
                    res.status(404).json({ message: 'estoque not found' });
                    return;
                }
                const empresa = yield (0, database_1.default)('estoque').where({ id }).first();
                res.json(empresa);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro do servidor' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            try {
                const rowsDeleted = yield (0, database_1.default)('estoque').where({ id: id }).delete();
                if (rowsDeleted === 0) {
                    res.status(404).json({ message: 'estoque not found' });
                    return;
                }
                res.status(200).send();
            }
            catch (error) {
                res.status(500).json({ message: 'Erro do servidor' });
            }
        });
    }
}
exports.EstoqueController = EstoqueController;
exports.default = new EstoqueController();
//#TODO estou treabalhando no estoque
