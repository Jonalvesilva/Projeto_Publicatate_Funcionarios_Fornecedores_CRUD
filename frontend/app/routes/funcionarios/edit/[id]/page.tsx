"use client";
import { useRouter, useParams } from "next/navigation";
import { TextField } from "../../../../../components/TextField";
import { getFuncionario } from "@/api/getFuncionario";
import { putFuncionario } from "@/api/putFuncionario";
import { Breadcrumbs } from "../../../../../components/Breadcumbs";
import { TextNumber } from "../../../../../components/TextNumber";
import { FiLoader } from "react-icons/fi";
import { FormEvent, useEffect, useState } from "react";
import { success, error } from "@/functions/toast";

function getBreadcrumbs(title: string, id: number) {
  return [
    { title: "Página inicial", link: "/" },
    { title: "Funcionários", link: `/routes/funcionarios/` },
    { title: `ID ${id}`, link: `/routes/funcionarios/view/${id}` },
  ];
}

const initialFuncionario = {
  id: 0,
  name: "",
  surname: "",
  title: "",
  salary: "",
  created_at: "",
};

export default function Edit() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setIsDisabled] = useState(false);
  const [form, setForm] = useState(initialFuncionario);

  useEffect(() => {
    getFuncionario(Number(params.id)).then((data) => {
      setForm({
        name: data.nome,
        surname: data.sobrenome,
        salary: data.salario,
        title: data.titulo,
        id: data.id,
        created_at: data.created_at,
      });
    });
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsDisabled(true);
    await putFuncionario(Number(params.id), form)
      .then((response) => {
        if (response.success) {
          success("Funcionário editado com sucesso!");
          setIsLoading(false);
          setIsDisabled(false);
          router.push(`/routes/funcionarios/view/${Number(params.id)}`);
        } else {
          error("Falha ao editar funcionário!");
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
        Editar Funcionário
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
