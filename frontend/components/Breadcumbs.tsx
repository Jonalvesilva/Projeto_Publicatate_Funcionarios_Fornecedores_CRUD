import Link from "next/link";

export type BreadcrumbsProps = {
  links: { title: string; link: string }[];
  className: string;
};

export function Breadcrumbs({ links, className }: BreadcrumbsProps) {
  return (
    <div className={className}>
      {links.map(({ title, link }, index) => (
        <span key={index} className="flex flex-row items-center">
          <Link
            key={index}
            href={link}
            className="uppercase text-sm text-white hover:text-gray-400 md:text-lg"
          >
            {title}
          </Link>
        </span>
      ))}
    </div>
  );
}
