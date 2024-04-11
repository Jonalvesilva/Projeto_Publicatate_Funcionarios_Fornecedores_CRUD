"use client";
import { useRouter } from "next/navigation";
import { TextField } from "../../../../components/TextField";
import { postFornecedor } from "../../../../api/postFornecedor";
import { Breadcrumbs } from "../../../../components/Breadcumbs";
import { SelectField } from "../../../../components/SelectField";
import { FiLoader } from "react-icons/fi";
import { FormEvent, useState } from "react";
import { success, error } from "@/functions/toast";

function getBreadcrumbs() {
  return [
    { title: "Página inicial", link: "/" },
    { title: "Fornecedores", link: `/routes/fornecedores/` },
  ];
}
const date = new Date();

const initialFornecedor = {
  name: "",
  status: "Ativa",
  person: "Fisica",
  created_at: date.toISOString(),
};

export default function Create() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setIsDisabled] = useState(false);
  const [form, setForm] = useState(initialFornecedor);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsDisabled(true);
    console.log(form);
    await postFornecedor(form)
      .then((response) => {
        if (response.success) {
          success("Fornecedor cadastrado com sucesso!");
          setIsLoading(false);
          setIsDisabled(false);
          router.push("/routes/fornecedores");
        } else {
          error("Falha ao cadastrar fornecedor!");
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
        links={getBreadcrumbs()}
        className="flex flex-row items-center gap-4 w-11/12 h-16 mx-auto md:max-w-screen-md"
      />
      <h1 className="text-center font-bold italic text-white font-serif my-4 text-2xl md:text-3xl ">
        Adicionar Fornecedor
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
