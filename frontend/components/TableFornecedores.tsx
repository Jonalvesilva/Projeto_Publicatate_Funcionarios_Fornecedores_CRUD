import type { FornecedorRow } from "../../shared/types";
import { LinkButton } from "./LinkButton";

export type field = {
  head: String[];
  rows: FornecedorRow[];
};

export function TableFornecedores({ head, rows }: field) {
  return (
    <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
      <thead className="text-white">
        {rows.map((element, index) => {
          return (
            <tr
              key={index}
              className="bg-blue-600 flex flex-col flex-no wrap min-[900px]:table-row rounded-l-lg sm:rounded-none mb-6 lg:mb-0"
            >
              {head.map((dados, index) => {
                return (
                  <th key={index} className="p-2 text-center h-11">
                    {dados}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody className="flex-1 min-[900px]:flex-none">
        {rows.map((element, index) => {
          return (
            <tr
              key={index}
              className="flex flex-col flex-no wrap min-[900px]:table-row mb-6 lg:mb-0"
            >
              <td className="border-grey-light border hover:bg-gray-100 p-2 h-11 text-center">
                {element.id}
              </td>
              <td className="border-grey-light border hover:bg-gray-100 p-2 h-11 text-center">
                {element.nome}
              </td>
              <td className="border-grey-light border hover:bg-gray-100 p-2 h-11 text-center">
                {element.status_empresa}
              </td>
              <td className="border-grey-light border hover:bg-gray-100 p-2 h-11 text-center">
                {element.pessoa}
              </td>
              <td className="border-grey-light border hover:bg-gray-100 p-2 h-11 text-center">
                {new Date(element.created_at).toLocaleDateString("en-GB")}
              </td>
              <td className="border-grey-light border p-2 h-11 flex justify-center items-center">
                <LinkButton
                  to={`/routes/fornecedores/view/${element.id}`}
                  key={element.id}
                  className="bg-blue-800 p-1 text-white rounded-lg"
                >
                  Mostrar Fornecedor
                </LinkButton>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
