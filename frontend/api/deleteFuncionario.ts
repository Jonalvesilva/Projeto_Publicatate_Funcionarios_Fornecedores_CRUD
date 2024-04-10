import { api } from "./api";
import type { Funcionario } from "../../shared/types";

export type DeleteFuncionarioOutput = {
  success: boolean;
  funcionario: Funcionario;
};

export async function deleteFuncionario(
  id: number
): Promise<DeleteFuncionarioOutput> {
  const res = await api.delete(`/funcionarios/${id}`);
  const funcionario = res.data;
  return funcionario;
}
