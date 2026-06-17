import { whatsappHref } from "@/lib/site.config";
import { WhatsappIcon } from "./icons";

/** Botón flotante de WhatsApp, presente en todo el sitio. */
export function WhatsAppFab() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-3 rounded-full bg-[#25D366] p-4 text-white shadow-lg shadow-[#25D366]/30 transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 sm:bottom-7 sm:right-7"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40 motion-reduce:hidden" />
      <WhatsappIcon className="h-7 w-7" />
      <span className="sr-only">Escribir por WhatsApp</span>
    </a>
  );
}
