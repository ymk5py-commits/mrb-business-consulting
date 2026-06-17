import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/services";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <Link
      href={`/servicios/${service.slug}`}
      className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-xl hover:shadow-navy-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-white transition-colors duration-200 group-hover:bg-accent">
        <Icon className="h-6 w-6" strokeWidth={1.75} />
      </span>
      <h3 className="font-display mt-5 text-xl text-navy-900">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {service.excerpt}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
        Ver servicio
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
