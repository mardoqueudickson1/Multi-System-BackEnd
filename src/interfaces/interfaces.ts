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
  id: number;
  nome: string;
  salario: number;
  departamento: Departamento;
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
  tipo: 'ativos ' | 'passivos';
}

export interface Contas_Transacoes {
  id_conta: number;
  id_transacao: number;
}
