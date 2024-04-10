"use client";
import { useRouter, useParams } from "next/navigation";
import { TextField } from "../../../../components/TextField";
import { postFuncionario } from "../../../../api/postFuncionario";
import { Breadcrumbs } from "../../../../components/Breadcumbs";
import { TextNumber } from "../../../../components/TextNumber";
import { FiLoader } from "react-icons/fi";
import { FormEvent, useState } from "react";
import { success, error } from "@/functions/toast";

function getBreadcrumbs() {
  return [
    { title: "Página inicial", link: "/" },
    { title: "Funcionários", link: `/routes/funcionarios/` },
  ];
}
const date = new Date();

const initialFuncionario = {
  name: "",
  surname: "",
  title: "",
  salary: "",
  created_at: date.toISOString(),
};

export default function Create() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setIsDisabled] = useState(false);
  const [form, setForm] = useState(initialFuncionario);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsDisabled(true);
    await postFuncionario(form)
      .then((response) => {
        if (response.success) {
          success("Funcionario cadastrado com sucesso!");
          setIsLoading(false);
          setIsDisabled(false);
          router.push("/routes/funcionarios");
        } else {
          error("Falha ao cadastrar funcionário!");
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
        Adicionar Funcionário
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
        <label className="text-lg text-white">Sobrenome:</label>
        <TextField
          placeholder="Digite o Sobrenome"
          className={`h-12 rounded-xl px-2 my-2 text-lg`}
          value={form.surname}
          onChange={(e: any) => {
            setForm({ ...form, surname: e });
          }}
        />

        <label className="text-lg text-white">Título:</label>
        <TextField
          placeholder="Digite o Titulo"
          className={`h-12 rounded-xl px-2 my-2 text-lg`}
          value={form.title}
          onChange={(e: any) => {
            setForm({ ...form, title: e });
          }}
        />

        <label className="text-lg text-white">Salário:</label>
        <TextNumber
          placeholder="Digite o Salário"
          className={`h-12 rounded-xl px-2 my-2 text-lg`}
          value={form.salary}
          onChange={(e: any) => {
            setForm({ ...form, salary: e });
          }}
        />
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
