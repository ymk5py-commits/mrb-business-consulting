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
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 inline-flex items-center rounded-full bg-whatsapp p-3 text-paper shadow-md transition-colors duration-200 hover:bg-whatsapp-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-900 focus-visible:ring-offset-2 sm:bottom-7 sm:right-7 sm:p-4"
    >
      <WhatsappIcon className="h-6 w-6 sm:h-7 sm:w-7" />
    </a>
  );
}
