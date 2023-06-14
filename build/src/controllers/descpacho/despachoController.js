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
const database_1 = __importDefault(require("../../config/database"));
class DespachoController {
    //GERA numeros alatorio
    //CRIA A TRANSAÇÂO
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data_saida, responsavel_despacho, lista_produtos } = req.body;
            const { nome, telefone, email, endereco } = req.body.pessoa_receber;
            try {
                const aleatorio = Math.floor(Math.random() * (10 + 20) + 10);
                const aleatorio2 = Math.floor(Math.random() * (0 + 9) + 0);
                const aleatorio4 = Math.floor(Math.random() * (0 + 9) + 0);
                const pre = 'TSS';
                const data = new Date();
                const ano = data.getFullYear();
                const segundos = data.getSeconds();
                let numero = [ano, aleatorio, segundos].join('');
                if (numero.length < 10)
                    numero = [pre, ano, aleatorio, aleatorio2, aleatorio4, segundos].join('');
                // Cadastra o nome da pessoa a receber primeiro
                const [pessoa_receber] = yield (0, database_1.default)('pessoa_receber').insert({ nome, telefone, email, endereco }).returning('id');
                // Iniciar uma transação para garantir consistência dos dados
                const trx = yield database_1.default.transaction();
                try {
                    let valorTotal = 0;
                    for (const produto of lista_produtos) {
                        // Verificar se o produto existe no estoque
                        const { id, quantity } = produto;
                        const product = yield trx('estoque').where({ id: id }).first();
                        if (!product) {
                            yield trx.rollback();
                            return res.status(404).json({ message: `Produto com ID ${id} não encontrado` });
                        }
                        if (product.quantidade < quantity) {
                            yield trx.rollback();
                            return res.status(400).json({ error: 'Quantidade insuficiente em estoque' });
                        }
                        const valorProduto = product.valor * quantity; // Valor do produto atual
                        valorTotal += valorProduto;
                        // Atualizar a quantidade disponível do produto no estoque
                        yield trx('estoque').where({ id: id }).decrement('quantidade', quantity);
                    }
                    // Inserir a saída do produto na tabela "saidas_produtos"
                    yield trx('saidas_produtos').insert({
                        registro_n: numero,
                        pessoa_receber: pessoa_receber.id,
                        quantidade: lista_produtos.length,
                        data_saida: data_saida,
                        responsavel_despacho: responsavel_despacho,
                        valor_total: valorTotal,
                        lista_produtos: JSON.stringify(lista_produtos),
                    });
                    // Confirmar a transação
                    yield trx.commit();
                    return res.status(200).json({ message: 'Produtos despachados com sucesso' });
                }
                catch (error) {
                    console.log(error);
                    yield trx.rollback();
                    throw error;
                }
            }
            catch (error) {
                console.log('AAAAAAAAAAAAA:', lista_produtos.length, lista_produtos);
                return res.status(500).json({ error: 'Ocorreu um erro ao registrar a saída dos produtos' });
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                // Verificar se o produto existe no estoque
                const product = yield (0, database_1.default)('saidas_produtos')
                    .join('pessoa_receber', 'saidas_produtos.pessoa_receber', 'pessoa_receber.id')
                    .select('saidas_produtos.*', 'pessoa_receber.nome as pessoa_receber', 'pessoa_receber.telefone as pessoa_receber_telefone', 'pessoa_receber.email as pessoa_receber_email', 'pessoa_receber.endereco as pessoa_receber_endreco')
                    .where('saidas_produtos.id', id)
                    .first();
                if (!product) {
                    return res.status(404).json({ error: 'Produto não encontrado' });
                }
                return res.status(200).json(product);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Ocorreu um erro ao buscar o histórico de saídas do produto' });
            }
        });
    }
    getAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield (0, database_1.default)('saidas_produtos')
                    .join('pessoa_receber', 'saidas_produtos.pessoa_receber', 'pessoa_receber.id')
                    .select('saidas_produtos.*', 'pessoa_receber.nome as pessoa_receber')
                    .orderBy('saidas_produtos.id', 'desc');
                return res.status(200).json(products);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Ocorreu um erro ao buscar o histórico de saídas de produtos' });
            }
        });
    }
}
exports.default = new DespachoController();
