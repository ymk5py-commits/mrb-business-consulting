import { Plus } from "lucide-react";

/** Preguntas frecuentes: filetes arriba y abajo, sin caja redondeada. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="min-w-0 divide-y divide-rule border-y border-rule">
      {items.map((item, i) => (
        <details key={i} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-base font-medium text-navy-900 transition-colors hover:text-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent [&::-webkit-details-marker]:hidden">
            {item.q}
            <Plus
              className="h-5 w-5 shrink-0 text-accent-600 transition-transform duration-200 group-open:rotate-45"
              aria-hidden="true"
            />
          </summary>
          <p className="-mt-1 max-w-xl pb-6 text-sm leading-relaxed text-slate-600">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
