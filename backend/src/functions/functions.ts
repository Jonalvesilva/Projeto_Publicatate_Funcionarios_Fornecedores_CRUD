import { sql as sqlObj } from "slonik";

//Normaliza Texto
export function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ");
}

//Function Create Search Funcionario SQL
export function createFuncionarioSearch(search: string) {
  const str = `%${search}%`;
  return sqlObj.fragment`where LOWER(nome) like ${str} OR LOWER(sobrenome) like ${str} OR LOWER(titulo) like ${str} OR LOWER(salario) like ${str} 
  OR LOWER(created_at) like ${str}`;
}

//Function Create Search Funcionario SQL
export function createFornecedorSearch(search: string) {
  const str = `%${search}%`;
  return sqlObj.fragment`where LOWER(nome) like ${str} OR LOWER(status_empresa) like ${str} OR LOWER(pessoa) like ${str} OR LOWER(created_at) like ${str}`;
}
