import Link from "next/link";

const props = {
  logotipo: "../logotipo.png",
  title: "Publicatate Engenharia",
};

export default function Navbar() {
  return (
    <div className="h-[100px] w-full flex bg-slate-900 sticky">
      <div id="div-logo" className="w-[200px] flex items-center px-2">
        <Link href="/">
          <img src={props.logotipo} className="" alt="" />
        </Link>
      </div>
      <div
        id="div-title"
        className="w-full flex text-white text-md font-bold pr-2 justify-end items-center md:text-2xl lg:text-3xl"
      >
        <h2>{props.title}</h2>
      </div>
    </div>
  );
}
