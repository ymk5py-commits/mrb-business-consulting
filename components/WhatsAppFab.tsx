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
      className="group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 inline-flex items-center gap-3 rounded-full bg-[#25D366] p-3 text-white shadow-lg shadow-[#25D366]/30 transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-900 focus-visible:ring-offset-2 sm:bottom-7 sm:right-7 sm:p-4"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40 motion-reduce:hidden" />
      <WhatsappIcon className="h-6 w-6 sm:h-7 sm:w-7" />
    </a>
  );
}
