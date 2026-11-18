import Image from "next/image";
import { cn } from "./ui";
import { director } from "@/lib/team";
import { site } from "@/lib/site.config";

/**
 * Quién contesta el WhatsApp del estudio, junto a cada llamada a escribir (sobre fondo navy).
 * Le pone cara al momento de más duda: escribirle a un contador que todavía no conocés.
 * Solo datos confirmados: el nombre y el horario publicado. Sin plazos de respuesta ni costos
 * hasta que Manuel los confirme.
 */
export function WhoReplies({
  detail = site.contact.hours,
  className,
}: {
  /** Segunda línea: por defecto, el horario de atención */
  detail?: string;
  className?: string;
}) {
  const photo = director.avatar ?? director.photo;
  return (
    <p className={cn("flex items-center gap-3 text-sm leading-snug text-slate-300", className)}>
      {photo && (
        <Image
          src={photo}
          alt=""
          width={40}
          height={40}
          className="size-10 shrink-0 rounded-full object-cover ring-2 ring-paper/20"
          style={{ objectPosition: director.photoPosition }}
        />
      )}
      <span className="min-w-0">
        Te responde <strong className="font-semibold text-paper">{director.name}</strong>
        {detail && <span className="mt-0.5 block text-slate-400">{detail}</span>}
      </span>
    </p>
  );
}
