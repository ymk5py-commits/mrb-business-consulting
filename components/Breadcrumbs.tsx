import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({
  items,
}: {
  items: { name: string; href?: string }[];
}) {
  return (
    <nav aria-label="Migas de pan" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-slate-400">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-white">
                {item.name}
              </Link>
            ) : (
              <span className="text-slate-200">{item.name}</span>
            )}
            {i < items.length - 1 && (
              <ChevronRight className="h-4 w-4 text-slate-500" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
