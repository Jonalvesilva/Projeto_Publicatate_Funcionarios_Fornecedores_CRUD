import { getPool, sql } from "../database";
import { sql as sqlObj } from "slonik";
import { normalizeText, createFuncionarioSearch } from "../functions/functions";
import type { Funcionario, FindParams } from "../../../shared/types";

//Get Funcionarios
export async function getFuncionarios({
  limit = 5,
  offset = 0,
  search = "",
  order_by = "nome",
  direction = "desc",
}: FindParams = {}) {
  const pool = await getPool();

  const sqlSearch =
    search !== ""
      ? createFuncionarioSearch(normalizeText(search))
      : sqlObj.fragment``;

  const sqlDirection =
    direction.toLowerCase() === "desc" ? sql`desc` : sql`asc`;

  const sqlOrderBy = sql`order by ${sqlObj.identifier([
    order_by,
  ])} ${sqlDirection}`;

  let funcionarios;

  try {
    funcionarios =
      await pool.many(sql`SELECT * from public.publicatate_funcionarios
  ${sqlSearch} ${sqlOrderBy}
 limit ${limit} offset ${offset}`);
  } catch (error) {
    return {
      success: false,
      funcionarios: [] as Funcionario[],
    };
  }

  return {
    success: true,
    funcionarios: funcionarios,
  };
}

//Get Funcionario
export async function getFuncionario(id: number) {
  const pool = await getPool();
  const funcionario = await pool.one(
    sql`SELECT * from public.publicatate_funcionarios where id=${id}`
  );
  return funcionario;
}

//Add Funcionario
export async function addFuncionario(data: Omit<Funcionario, "id">) {
  const pool = await getPool();
  const { created_at, name, salary, surname, title } = data;
  let newFuncionario;
  try {
    newFuncionario =
      await pool.any(sql`INSERT INTO public.publicatate_funcionarios (nome,sobrenome,titulo,salario,created_at) 
  values (${name},${surname},${title},${salary},${created_at}) returning *`);
  } catch (error) {
    return { success: false, error };
  }
  return { success: true, funcionario: newFuncionario };
}

//Editar Funcionario
export async function editarFuncionario(
  id: number,
  data: Omit<Funcionario, "id">
) {
  const pool = await getPool();
  const { created_at, name, salary, surname, title } = data;
  let editFuncionario;
  try {
    editFuncionario = await pool.any(
      sql`UPDATE public.publicatate_funcionarios SET (nome,sobrenome,titulo,salario,created_at) = (${name},${surname},${title},${salary},${created_at}) where id=${id} returning *`
    );
  } catch (error) {
    return { success: false, error };
  }
  return { success: true, funcionario: editFuncionario };
}

//Deletar Funcionario
export async function deletarFuncionario(id: number) {
  const pool = await getPool();

  try {
    await pool.any(
      sql`DELETE FROM public.publicatate_funcionarios where id=${id}`
    );
  } catch (error) {
    return { success: false, error };
  }
  return { success: true };
}
