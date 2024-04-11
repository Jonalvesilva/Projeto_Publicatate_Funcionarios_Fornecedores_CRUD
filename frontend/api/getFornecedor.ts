import { api } from "./api";
import type { FornecedorRow } from "../../shared/types";

export async function getFornecedor(id: number): Promise<FornecedorRow> {
  const res = await api.get(`/fornecedores/${id}`);
  const fornecedor = res.data;
  return fornecedor;
}
