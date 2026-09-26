import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/services";

/** Servicio como bloque tipográfico: filete arriba, título, resumen y link. */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/servicios/${service.slug}`}
      className="group flex h-full flex-col border-t border-rule pt-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4"
    >
      <h3 className="font-display text-xl text-navy-900 transition-colors group-hover:text-accent-600">
        {service.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{service.excerpt}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600">
        Ver servicio
        <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
