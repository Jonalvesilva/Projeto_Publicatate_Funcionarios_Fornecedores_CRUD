import { LinkButton } from "@/components/LinkButton";

export default function Home() {
  return (
    <section className="bg-gray-700 flex flex-col items-center justify-center h-[90vh] min-h-[500px]">
      <h2 className="text-lg sm:text-xl md:text-2xl text-white text-center pb-8 pt-2">
        Bem Vindo ao Portal RH da Publicatate
      </h2>
      <div className="bg-white rounded-xl w-[90%] h-[250px] md:h-[200px] max-w-screen-md flex flex-col justify-center gap-y-6 lg:w-full">
        <h2 className="text-lg font-semibold text-center md:text-xl">
          Escolha a opção
        </h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <LinkButton
            to="routes/funcionarios"
            className="bg-green-800 hover:bg-green-600 text-white text-lg md:text-xl text-center p-3 rounded-lg"
          >
            Gerenciamento de Funcionários
          </LinkButton>
          <LinkButton
            to="routes/fornecedores"
            className="bg-blue-800 hover:bg-blue-600 text-white text-lg md:text-xl text-center p-3  rounded-lg"
          >
            Gerenciamento de Fornecedores
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
