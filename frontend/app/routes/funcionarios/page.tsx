"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { TableFuncionarios } from "../../../components/TableFuncionarios";
import { LinkButton } from "../../../components/LinkButton";
import { FuncionarioRow } from "../../../../shared/types";
import { Breadcrumbs } from "../../../components/Breadcumbs";
import { SearchBar } from "../../../components/SearchBar";
import { config } from "../../../utils/config";
import { getFuncionarios } from "../../../api/getFuncionarios";
import { asyncDebounce } from "../../../utils/asyncDebounce";
import { PaginationButtons } from "../../../components/PaginationButtons";
import { ImSpinner2 } from "react-icons/im";

const pageSize = config.pageSize;
const debounced = asyncDebounce(getFuncionarios, 1000);

const initialFuncionarioList = {
  count: 0,
  funcionarios: [] as FuncionarioRow[],
};

const headers = [
  "ID",
  "Nome",
  "Sobrenome",
  "Cargo",
  "Salario",
  "Data Criação",
  "Opções",
];

export default function Funcionarios() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || undefined;
  const [search, setSearch] = useState(initialSearch ?? "");
  const [orderBy, setOrderBy] = useState("created_at");
  const [direction, setDirection] = useState("desc");
  const [isLoading, setIsLoading] = useState(true);
  const [isServing, setIsServing] = useState(true);
  const [funcionarioList, setFuncionarioList] = useState(
    initialFuncionarioList
  );
  const pageCount = Math.ceil(funcionarioList.count / pageSize);

  const getFuncionarioParams = {
    offset: 0,
    limit: pageSize,
    search: search.length > 0 ? search : undefined,
    direction,
    order_by: orderBy,
  };

  const [page, setPage] = useState(1);
  const offset = pageSize * (page - 1);

  const handle = () => {
    setIsLoading(true);
    debounced(getFuncionarioParams)
      .then((data) => {
        setIsServing(true);
        setFuncionarioList({
          count: data.countFuncionarios,
          funcionarios: data.funcionarios,
        });
        setPage(1);
        setIsLoading(false);
      })
      .catch((error) => {
        error.code == "ERR_NETWORK" ? setIsServing(false) : setIsServing(true);
        error.code == "ERR_NETWORK" ? setIsLoading(false) : "";
        error.code == "ERR_NETWORK"
          ? setFuncionarioList(initialFuncionarioList)
          : "";
      });
  };

  useEffect(() => {
    setIsLoading(true);
    debounced(getFuncionarioParams)
      .then((data) => {
        setIsServing(true);
        setFuncionarioList({
          count: data.countFuncionarios,
          funcionarios: data.funcionarios,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        error.code == "ERR_NETWORK" ? setIsServing(false) : setIsServing(true);
        error.code == "ERR_NETWORK" ? setIsLoading(false) : "";
        error.code == "ERR_NETWORK"
          ? setFuncionarioList(initialFuncionarioList)
          : "";
      });
    setPage(1);
  }, [direction, orderBy]);

  useEffect(() => {
    setIsLoading(true);
    debounced({ ...getFuncionarioParams, offset })
      .then((data) => {
        setIsServing(true);
        setFuncionarioList({
          count: data.countFuncionarios,
          funcionarios: data.funcionarios,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        error.code == "ERR_NETWORK" ? setIsServing(false) : setIsServing(true);
        error.code == "ERR_NETWORK" ? setIsLoading(false) : "";
        error.code == "ERR_NETWORK"
          ? setFuncionarioList(initialFuncionarioList)
          : "";
      });
  }, [page]);

  return (
    <section
      className={`w-full ${
        funcionarioList.count > 0 ? "h-full" : "h-screen"
      } bg-slate-800 pb-12 min-[900px]:h-[90vh] lg:min-h-[700px] xl:pt-[50px]`}
    >
      <div className="w-full max-w-screen-lg mx-auto">
        <Breadcrumbs
          links={[{ title: "Página inicial", link: "/" }]}
          className="flex flex-row items-center gap-4 w-11/12 pl-4 h-16 mx-auto md:max-w-screen-lg"
        ></Breadcrumbs>
        <div className="bg-white w-11/12 h-full rounded-xl mx-auto p-3 md:max-w-[900px]">
          <div className="flex flex-col justify-center items-center md:flex-row">
            <div className="p-3 flex justify-start items-center grow">
              <h2 className="text-xl">Gerenciamento de Funcionários</h2>
            </div>
            <div className="flex">
              <LinkButton
                to="funcionarios/create"
                className="p-2 bg-green-700 text-white rounded-xl hover:bg-green-500"
              >
                Adicionar Funcionário
              </LinkButton>
            </div>
          </div>
          <SearchBar
            search={search}
            onChange={(event) => setSearch(event.target.value)}
            onKey={(e) => (e.keyCode == 13 ? handle() : "")}
          />
          <div className="w-full flex gap-8 ">
            <select
              value={orderBy}
              className="bg-transparent py-2 px-6 border rounded-3xl flex-1 focus:outline-none cursor-pointer"
              onChange={(event) => setOrderBy(event.target.value)}
            >
              <option value="id">ID</option>
              <option value="titulo">Cargo</option>
              <option value="created_at">Data Criação</option>
            </select>
            <select
              value={direction}
              onChange={(event) => setDirection(event.target.value)}
              className="bg-white py-2 px-6 border rounded-3xl flex-1 cursor-pointer focus:outline-none"
            >
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          </div>
          {isLoading ? (
            <ImSpinner2
              size={50}
              className="mt-12 mb-6 flex items-center w-full text-green-500 animate-spin"
            />
          ) : (
            <>
              <TableFuncionarios
                head={headers}
                rows={funcionarioList.funcionarios}
              />
              <div>
                <PaginationButtons
                  currentPage={page}
                  pageCount={pageCount}
                  onClick={(event) => {
                    let target = event.target as HTMLInputElement;
                    setPage(Number(target.value));
                  }}
                ></PaginationButtons>
              </div>
              {!isServing && (
                <div className="w-full text-center">
                  Servidor não disponível. Tente novamente mais tarde
                </div>
              )}
              {typeof funcionarioList.count == "undefined" &&
              isServing == true ? (
                <div className="w-full text-center">Sem resultados</div>
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
