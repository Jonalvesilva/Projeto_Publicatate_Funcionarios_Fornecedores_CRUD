import Link from "next/link";

type tipo = {
  to: string;
  className: string;
  children: string;
};

export function LinkButton(props: tipo) {
  return (
    <Link href={props.to} className={props.className}>
      {props.children}
    </Link>
  );
}
