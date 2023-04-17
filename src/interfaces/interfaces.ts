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
  nome: string;
  departamento: Departamento[];
  empresaPai: EmpresaPai;
}

export interface Departamento {
  id: number;
  nome: string;
  funcionarios: Funcionario[];
  empresaFilha: EmpresaFilha;
}

export interface Funcionario {
  id: number;
  nome: string;
  salario: number;
  departamento: Departamento;
}
