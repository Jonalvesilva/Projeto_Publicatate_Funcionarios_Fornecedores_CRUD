import { api } from "./api";
import type { FuncionarioRow } from "../../shared/types";

export async function getFuncionario(id: number): Promise<FuncionarioRow> {
  const res = await api.get(`/funcionarios/${id}`);
  const funcionario = res.data;
  return funcionario;
}
