"use client";
import { useRouter, useParams } from "next/navigation";
import { TextField } from "../../../../../components/TextField";
import { getFornecedor } from "@/api/getFornecedor";
import { putFornecedor } from "@/api/putFornecedor";
import { Breadcrumbs } from "../../../../../components/Breadcumbs";
import { SelectField } from "../../../../../components/SelectField";
import { FiLoader } from "react-icons/fi";
import { FormEvent, useEffect, useState } from "react";
import { success, error } from "@/functions/toast";

function getBreadcrumbs(title: string, id: number) {
  return [
    { title: "Página inicial", link: "/" },
    { title: "Fornecedores", link: `/routes/fornecedores/` },
    { title: `ID ${id}`, link: `/routes/fornecedores/view/${id}` },
  ];
}

const initialFornecedor = {
  id: 0,
  name: "",
  status: "",
  person: "",
  created_at: "",
};

export default function Edit() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setIsDisabled] = useState(false);
  const [form, setForm] = useState(initialFornecedor);

  useEffect(() => {
    getFornecedor(Number(params.id)).then((data) => {
      setForm({
        name: data.nome,
        status: data.status_empresa,
        person: data.pessoa,
        id: data.id,
        created_at: data.created_at,
      });
    });
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsDisabled(true);
    await putFornecedor(Number(params.id), form)
      .then((response) => {
        if (response.success) {
          success("Fornecedor editado com sucesso!");
          setIsLoading(false);
          setIsDisabled(false);
          router.push(`/routes/fornecedores/view/${Number(params.id)}`);
        } else {
          error("Falha ao editar fornecedor!");
          setIsLoading(false);
          setIsDisabled(false);
        }
      })
      .catch(() => {
        error("Servidor fora de operação");
        setIsLoading(false);
        setIsDisabled(false);
        return;
      });
  };

  return (
    <div className="bg-slate-800 h-full md:min-h-screen pt-12">
      <Breadcrumbs
        links={getBreadcrumbs(`Perfil`, Number(params.id))}
        className="flex flex-row items-center gap-4 w-11/12 h-16 mx-auto md:max-w-screen-md"
      />
      <h1 className="text-center font-bold italic text-white font-serif my-4 text-2xl md:text-3xl ">
        Editar Fornecedor
      </h1>
      <form
        className="flex flex-col gap-y-4 w-[90%] mx-auto md:max-w-screen-md"
        method="POST"
        onSubmit={onSubmit}
      >
        <label className="text-lg text-white">Nome:</label>
        <TextField
          placeholder="Digite o Nome"
          className={`h-12 rounded-xl px-2 my-2 text-lg`}
          value={form.name}
          onChange={(e: any) => {
            setForm({ ...form, name: e });
          }}
        />
        <div className="flex flex-row w-full gap-x-4">
          <label className="w-[50%]">
            <span className="text-lg text-white">Pessoa:</span>
            <SelectField
              options={["Fisica", "Juridica"]}
              onChange={(person) => {
                person = person.target.value;
                setForm({ ...form, person });
              }}
              className="h-12 rounded-xl px-2 my-2 text-lg w-full"
            />
          </label>

          <label className="w-[50%]">
            <span className="text-white text-lg">Status:</span>
            <SelectField
              options={["Ativa", "Inativa", "Pendente"]}
              onChange={(status) => {
                status = status.target.value;
                setForm({ ...form, status });
              }}
              className="h-12 rounded-xl px-2 my-2 text-lg w-full"
            />
          </label>
        </div>

        <button
          disabled={disabled}
          type="submit"
          className="my-6 w-full lg:w-[200px] h-10 bg-green-700 text-white disabled:bg-gray-500"
        >
          {isLoading ? (
            <FiLoader className="text-white animate-spin text-lg inline" />
          ) : (
            `Enviar`
          )}
        </button>
      </form>
    </div>
  );
}
