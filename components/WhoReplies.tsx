import Image from "next/image";
import { cn } from "./ui";
import { director } from "@/lib/team";
import { site } from "@/lib/site.config";

/**
 * Quién contesta el WhatsApp del estudio, junto a cada llamada a escribir.
 * Le pone cara al momento de más duda: escribirle a un contador que todavía no conocés.
 * Solo datos confirmados: el nombre y el horario publicado. Sin plazos de respuesta ni costos
 * hasta que Manuel los confirme.
 */
export function WhoReplies({
  detail = site.contact.hours,
  tone = "dark",
  className,
}: {
  /** Segunda línea: por defecto, el horario de atención */
  detail?: string;
  /** Fondo sobre el que va: navy (dark) o papel (light) */
  tone?: "dark" | "light";
  className?: string;
}) {
  const photo = director.avatar ?? director.photo;
  const dark = tone === "dark";
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-sm leading-snug",
        dark ? "text-slate-300" : "text-slate-600",
        className,
      )}
    >
      {photo && (
        <Image
          src={photo}
          alt=""
          width={40}
          height={40}
          className={cn(
            "size-10 shrink-0 rounded-full object-cover ring-2",
            dark ? "ring-paper/20" : "ring-rule",
          )}
          style={{ objectPosition: director.photoPosition }}
        />
      )}
      <span className="min-w-0">
        Te responde{" "}
        <strong className={cn("font-semibold", dark ? "text-paper" : "text-navy-900")}>
          {director.name}
        </strong>
        {detail && (
          <span className={cn("mt-0.5 block", dark ? "text-slate-400" : "text-slate-500")}>
            {detail}
          </span>
        )}
      </span>
    </p>
  );
}
