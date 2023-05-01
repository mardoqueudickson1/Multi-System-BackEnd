export interface EmpresaPai {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  nif: number;
  especialidade: string;
  endereco: string;
  empresasFilhas: EmpresaFilha[];
}

export interface EmpresaFilha {
  id: number;
  empresaPai: EmpresaPai;
  nome: string;
  email: string;
  telefone: string;
  especialidade: string;
  endereco: string;
  departamento: Departamento[];
}

export interface Departamento {
  id: number;
  nome: string;
  funcionarios: Funcionario[];
  empresaFilha: EmpresaFilha;
}

export interface Role {
  id: number;
  nome: string;
  descricao: string;
}

export interface Funcionario {
  id : number;
  departamento_id: number;
  empresa_filha_id: number;
  role_id: number;
  nome: string;
  sobrenome: string;
  email: string;
  nif: string;
  telefone: string;
  password_hash: string;
  salario: number;
  data_de_nascimento: Date;
  data_de_contratacao: Date;
  educacao: string;
  bio: string;
  linguas_falada: string;
  endereco: string;
}

export interface Transaction {
  id: number;
  valor: number;
  descricao: string;
  tipo: 'receita' | 'despesa' | 'compra de ativo' | 'pagamento de divida';
  empresa_filha_id: number;
}
export interface Contas {
  descricao: string;
  empresa_filha_id: number;
  saldo: number;
  tipo: 'ativos ' | 'passivos';
}

export interface Contas_Transacoes {
  id_conta: number;
  id_transacao: number;
}

export interface AdminFilho {
  id : number;
  empresa_filha_id: number;
  role_id: number;
  nome: string;
  sobrenome: string;
  email: string;
  nif: string;
  telefone: string;
  password_hash: string;
  data_de_nascimento: Date;
  data_de_contratacao: Date;
  educacao: string;
  bio: string;
  linguas_falada: string;
  endereco: string;
}






