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
  id: string;
  nome: string;
  descricao: string;
}

export interface Funcionario {
  id: number;
  nome: string;
  salario: number;
  departamento: Departamento;
}
