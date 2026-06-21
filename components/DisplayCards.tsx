"use client";

import type { ReactNode } from "react";
import { Calculator, ReceiptText, Building2 } from "lucide-react";
import { cn } from "@/components/ui";

type DisplayCardProps = {
  className?: string;
  icon?: ReactNode;
  title?: string;
  description?: string;
  meta?: string;
};

function DisplayCard({
  className,
  icon = <Calculator className="size-4 text-white" />,
  title = "MRB",
  description = "Consultoría empresarial",
  meta = "Paraguay",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 border-white/10 bg-navy-900/80 px-4 py-3 backdrop-blur-sm transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-linear-to-l after:from-white after:to-transparent after:content-[''] hover:border-accent/40 hover:bg-navy-900 [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className,
      )}
    >
      <div>
        <span className="relative inline-flex items-center justify-center rounded-full bg-accent p-2 text-white shadow-lg shadow-accent/30">
          {icon}
        </span>
        <p className="font-display text-lg font-semibold text-white">{title}</p>
      </div>
      <p className="whitespace-nowrap text-base text-slate-200">{description}</p>
      <p className="text-sm text-slate-400">{meta}</p>
    </div>
  );
}

const cards: DisplayCardProps[] = [
  {
    icon: <Calculator className="size-4 text-white" />,
    title: "Contabilidad",
    description: "Registros y estados al día",
    meta: "Mes a mes",
    className:
      "grayscale-[100%] [grid-area:stack] before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-xl before:bg-white/55 before:content-[''] before:transition-opacity before:duration-700 hover:-translate-y-10 hover:grayscale-0 hover:before:opacity-0",
  },
  {
    icon: <ReceiptText className="size-4 text-white" />,
    title: "Impuestos",
    description: "IVA, IRE e IRP ante la DNIT",
    meta: "En término",
    className:
      "grayscale-[100%] [grid-area:stack] translate-x-14 translate-y-10 before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-xl before:bg-white/55 before:content-[''] before:transition-opacity before:duration-700 hover:-translate-y-1 hover:grayscale-0 hover:before:opacity-0",
  },
  {
    icon: <Building2 className="size-4 text-white" />,
    title: "Constitución",
    description: "S.A., S.R.L. y E.A.S.",
    meta: "Llave en mano",
    className: "[grid-area:stack] translate-x-28 translate-y-20 hover:translate-y-10",
  },
];

export function DisplayCards() {
  return (
    <div className="grid origin-center scale-[0.62] place-items-center [grid-template-areas:'stack'] sm:scale-[0.8] lg:scale-100">
      {cards.map((c, i) => (
        <DisplayCard key={i} {...c} />
      ))}
    </div>
  );
}
