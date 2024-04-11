"use client";
import { useState, useEffect } from "react";
import { LinkButton } from "../../../../../components/LinkButton";
import { Breadcrumbs } from "../../../../../components/Breadcumbs";
import { useParams, useRouter } from "next/navigation";
import { getFornecedor } from "../../../../../api/getFornecedor";
import { deleteFornecedor } from "../../../../../api/deleteFornecedor";
import { Card } from "../../../../../components/Card";
import { FiLoader } from "react-icons/fi";
import { success, error } from "@/functions/toast";
import "react-toastify/dist/ReactToastify.css";
import { ImSpinner2 } from "react-icons/im";

function getBreadcrumbs() {
  return [
    { title: "Página inicial", link: "/" },
    { title: "Fornecedores", link: "/routes/fornecedores" },
  ];
}

const initialFornecedor = {
  id: 0,
  nome: "",
  status_empresa: "",
  pessoa: "",
  created_at: "",
};

export default function View() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState(initialFornecedor);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isServing, setIsServing] = useState(false);
  const [disabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getFornecedor(Number(params.id))
      .then((res) => {
        setIsServing(true);
        setIsLoading(false);
        setUser(res);
      })
      .catch(() => {
        error("Servidor fora de operação");
        setIsLoading(false);
        setIsServing(false);
        return;
      });
  }, []);

  async function onClickDelete() {
    setIsDeleting(true);
    setIsDisabled(true);
    deleteFornecedor(Number(params.id))
      .then((data) => {
        if (data.success) {
          success("Fornecedor deletado com sucesso");
          router.push("/routes/fornecedores");
          setIsLoading(false);
          setIsDisabled(false);
        } else {
          error("Falha ao deletar fornecedor. Tente novamente.");
          setIsLoading(false);
          setIsDisabled(false);
        }
      })
      .catch(() => {
        error("Servidor fora de operação");
        setIsLoading(false);
        setIsDisabled(false);
        setIsServing(false);
        return;
      });
  }

  return (
    <div className="bg-slate-800 h-screen pt-16">
      <Breadcrumbs
        links={getBreadcrumbs()}
        className="flex flex-row items-center gap-4 w-11/12  h-16 mx-auto md:max-w-screen-md"
      ></Breadcrumbs>
      <Card className="bg-white w-[90%] m-auto p-4 leading-8 rounded-md my-8 md:max-w-screen-md">
        {isLoading ? (
          <ImSpinner2
            size={50}
            className="mt-12 mb-6 flex items-center w-full text-green-500 animate-spin"
          />
        ) : (
          <>
            {isServing ? (
              <>
                <div className="flex gap-4 mb-2 py-2 border-b">
                  <span className="flex flex-row gap-2 md:text-xl">
                    <h2 className="font-bold italic md:text-xl">Nome:</h2>
                    {user.nome}
                  </span>
                </div>
                <div className="flex gap-4 mb-2 py-2 border-b">
                  <span className="flex flex-row gap-2 md:text-xl">
                    <h2 className="font-bold italic md:text-xl">Status:</h2>
                    {user.status_empresa}
                  </span>
                </div>
                <div className="flex gap-4 mb-2 py-2 border-b">
                  <span className="flex flex-row gap-2 md:text-xl">
                    <h2 className="font-bold italic md:text-xl">Pessoa:</h2>
                    {user.pessoa}
                  </span>
                </div>

                <div className="mt-8 flex flex-row gap-4">
                  <button
                    onClick={onClickDelete}
                    disabled={disabled}
                    className="bg-red-600 hover:bg-red-500 btn-text-shadow w-[90px] rounded-xl text-white disabled:bg-gray-500"
                  >
                    {isDeleting ? (
                      <FiLoader className="text-white animate-spin text-lg inline" />
                    ) : (
                      `Deletar`
                    )}
                  </button>
                  <LinkButton
                    className="bg-green-600 hover:bg-green-500 btn-text-shadow px-5 py-1 rounded-xl text-white"
                    to={`/routes/fornecedores/edit/${params.id}`}
                  >
                    Editar
                  </LinkButton>
                </div>
              </>
            ) : (
              <div className="w-full text-center">
                Servidor fora de operação
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
}
