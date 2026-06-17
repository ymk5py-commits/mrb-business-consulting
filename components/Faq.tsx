import { Plus } from "lucide-react";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {items.map((item, i) => (
        <details key={i} className="group px-6 open:bg-surface/40">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-base font-medium text-navy-900 [&::-webkit-details-marker]:hidden">
            {item.q}
            <Plus
              className="h-5 w-5 shrink-0 text-accent transition-transform duration-200 group-open:rotate-45"
              aria-hidden="true"
            />
          </summary>
          <p className="-mt-1 pb-5 text-sm leading-relaxed text-slate-600">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
