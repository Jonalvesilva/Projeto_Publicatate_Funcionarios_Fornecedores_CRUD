export type Funcionario = {
  id: number;
  name: string;
  surname: string;
  title: string;
  salary: string;
  created_at: string;
};

export type Fornecedor = {
  id: number;
  name: string;
  status: string;
  person: string;
  created_at: string;
};

export type FindParams = {
  limit?: number;
  offset?: number;
  search?: string;
  order_by?: string;
  direction?: string;
};

export type FuncionarioRow = {
  id: number;
  nome: string;
  sobrenome: string;
  titulo: string;
  salario: string;
  created_at: string;
};
