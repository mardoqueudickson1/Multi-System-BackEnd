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
            try {
                const { produto_id, quantidade, data_saida, responsavel_despacho, pessoa_receber, lista_produtos } = req.body;
                const aleatorio = Math.floor(Math.random() * (10 + 20) + 10);
                const aleatorio2 = Math.floor(Math.random() * (0 + 9) + 0);
                const data = new Date();
                const ano = data.getFullYear();
                const segundos = data.getSeconds();
                let numero = [ano, aleatorio, segundos].join('');
                if (numero.length < 10)
                    numero = [ano, aleatorio, aleatorio2, segundos].join('');
                //Cadastra o nome da pessoa a receber primeiro
                const [id] = yield (0, database_1.default)('pessoa_receber').insert(pessoa_receber).returning('id');
                // Verificar se o produto existe no estoque
                const product = yield (0, database_1.default)('estoque').where({ id: produto_id }).first();
                if (product === 0) {
                    res.status(404).json({ message: 'Produto não encontrado' });
                    return;
                }
                // Adicione o número de transação aos dados da transação
                if (product.quantidade < quantidade) {
                    return res.status(400).json({ error: 'Quantidade insuficiente em estoque' });
                }
                const valor_total = product.valor * quantidade;
                // Iniciar uma transação para garantir consistência dos dados
                const trx = yield database_1.default.transaction();
                try {
                    const [saida] = yield trx('saidas_produtos')
                        .insert({
                        estoque_id: produto_id,
                        lista_produtos: lista_produtos,
                        registro_n: numero,
                        pessoa_receber: id.id,
                        quantidade: -quantidade,
                        data_saida: data_saida,
                        responsavel_despacho: responsavel_despacho,
                        valor_total: valor_total,
                    })
                        .returning('*');
                    // Atualizar a quantidade disponível do produto no estoque
                    yield trx('estoque').where({ id: produto_id }).decrement('quantidade', quantidade);
                    // Confirmar a transação
                    yield trx.commit();
                    return res.status(200).json({ saida });
                }
                catch (error) {
                    console.log(error);
                    yield trx.rollback();
                    throw error;
                }
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Ocorreu um erro ao registrar a saída do produto' });
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                // Verificar se o produto existe no estoque
                const product = yield (0, database_1.default)('saidas_produtos')
                    .join('estoque', 'saidas_produtos.estoque_id', 'estoque.id')
                    .select('saidas_produtos.*', 'estoque.nome AS nome_estoque')
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
                    .join('estoque', 'saidas_produtos.estoque_id', 'estoque.id')
                    .select('saidas_produtos.*', 'estoque.nome AS nome_estoque')
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
