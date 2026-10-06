"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { GA_ID, CONSENT_KEY, CONSENT_EVENT, trackContact } from "@/lib/analytics";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CONSENT_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CONSENT_EVENT, callback);
  };
}
function snapshot() { return localStorage.getItem(CONSENT_KEY) ?? "pending"; }
function serverSnapshot() { return "server"; }
function choose(value: "accepted" | "rejected") {
  localStorage.setItem(CONSENT_KEY, value);
  // Reload clears Google's loaded scripts when permission is withdrawn.
  window.location.reload();
}
export function CookiePreferences() {
  return <button type="button" className="cursor-pointer underline underline-offset-4" onClick={() => {
    localStorage.removeItem(CONSENT_KEY);
    window.location.reload();
  }}>Preferencias de cookies</button>;
}
export function Analytics() {
  const consent = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const pathname = usePathname();
  const accepted = consent === "accepted";
  useEffect(() => {
    if (!GA_ID || !accepted) return;
    window.dataLayer ??= [];
    window.gtag ??= function (...args: unknown[]) { window.dataLayer!.push(args); };
    window.gtag("consent", "default", {
      analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
    });
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
    const click = (event: MouseEvent) => {
      const link = (event.target as Element)?.closest?.("a");
      const href = link?.getAttribute("href") ?? "";
      if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) trackContact("whatsapp");
      else if (href.startsWith("tel:")) trackContact("phone");
      else if (href.startsWith("mailto:")) trackContact("email");
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, [accepted]);
  useEffect(() => {
    if (!GA_ID || !accepted) return;
    window.gtag?.("event", "page_view", {
      page_location: window.location.origin + pathname,
      page_path: pathname,
      page_title: document.title,
      page_referrer: document.referrer ? new URL(document.referrer).origin : "",
    });
  }, [pathname, accepted]);
  if (!GA_ID) return null;
  return <>
    {accepted && <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />}
    {consent === "pending" && <section aria-label="Preferencias de privacidad" className="fixed bottom-4 left-4 right-4 z-[80] max-w-lg rounded-2xl border border-rule bg-paper p-5 text-sm text-navy-900 shadow-xl">
      <p className="font-semibold">Medición de visitas</p>
      <p className="mt-2 leading-relaxed">Con tu permiso usamos Google Analytics para conocer las visitas y los clics de contacto. Podés navegar sin aceptar. <Link href="/privacidad" className="underline">Más información</Link>.</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button className="cursor-pointer rounded-full border border-rule px-4 py-2 font-semibold" onClick={() => choose("rejected")}>Rechazar</button>
        <button className="cursor-pointer rounded-full bg-navy-900 px-4 py-2 font-semibold text-paper" onClick={() => choose("accepted")}>Aceptar medición</button>
      </div>
    </section>}
  </>;
}
