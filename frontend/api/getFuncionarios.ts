import { api } from "./api";
import type { FuncionarioRow } from "../../shared/types";

type GetFuncionarioInput = {
  limit?: number;
  offset?: number;
  search?: string;
  order_by?: string;
  direction?: string;
};

type GetFuncionariosOutput = {
  countFuncionarios: number;
  funcionarios: FuncionarioRow[];
};

export async function getFuncionarios(
  params: GetFuncionarioInput = {}
): Promise<GetFuncionariosOutput> {
  const res = await api.get("/funcionarios", {
    params,
  });
  const funcionarios = res.data;
  return funcionarios;
}
