import { getPool, sql } from "../database";
import { sql as sqlObj } from "slonik";
import { normalizeText, createFornecedorSearch } from "../functions/functions";
import type { Fornecedor, FindParams } from "../../../shared/types";

//Get Fornecedores
export async function getFornecedores({
  limit = 5,
  offset = 0,
  search = "",
  order_by = "nome",
  direction = "desc",
}: FindParams = {}) {
  const pool = await getPool();

  const sqlSearch =
    search !== ""
      ? createFornecedorSearch(normalizeText(search))
      : sqlObj.fragment``;

  const sqlDirection =
    direction.toLowerCase() === "desc" ? sql`desc` : sql`asc`;

  const sqlOrderBy = sql`order by ${sqlObj.identifier([
    order_by,
  ])} ${sqlDirection}`;

  let fornecedores;

  try {
    fornecedores =
      await pool.many(sql`SELECT * from public.publicatate_fornecedores
  ${sqlSearch} ${sqlOrderBy}
 limit ${limit} offset ${offset}`);
  } catch (error) {
    return {
      success: false,
      fornecedores: [] as Fornecedor[],
      error,
    };
  }

  return {
    success: true,
    fornecedores: fornecedores,
  };
}

//Get Fornecedor
export async function getFornecedor(id: number) {
  const pool = await getPool();
  const fornecedor = await pool.one(
    sql`SELECT * from public.publicatate_fornecedores where id=${id}`
  );
  return fornecedor;
}

//Add Fornecedor
export async function addFornecedor(data: Omit<Fornecedor, "id">) {
  const pool = await getPool();
  const { created_at, name, person, status } = data;
  let newFornecedor;
  try {
    newFornecedor =
      await pool.any(sql`INSERT INTO public.publicatate_fornecedores (nome,status_empresa,pessoa,created_at) 
  values (${name},${status},${person},${created_at}) returning *`);
  } catch (error) {
    return { success: false, error };
  }
  return { success: true, fornecedor: newFornecedor };
}

//Editar Fornecedor
export async function editarFornecedor(
  id: number,
  data: Omit<Fornecedor, "id">
) {
  const pool = await getPool();
  const { created_at, name, status, person } = data;
  let editFornecedor;
  try {
    editFornecedor = await pool.any(
      sql`UPDATE public.publicatate_fornecedores SET (nome,status_empresa,pessoa,created_at) = (${name},${status},${person},${created_at}) where id=${id} returning *`
    );
  } catch (error) {
    return { success: false, error };
  }
  return { success: true, fornecedor: editFornecedor };
}

//Deletar Fornecedor
export async function deletarFornecedor(id: number) {
  const pool = await getPool();

  try {
    await pool.any(
      sql`DELETE FROM public.publicatate_fornecedores where id=${id}`
    );
  } catch (error) {
    return { success: false, error };
  }
  return { success: true };
}
