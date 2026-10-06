export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
export const CONSENT_KEY = "mrb-analytics-consent";
export const CONSENT_EVENT = "mrb-consent-change";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackContact(method: "whatsapp" | "phone" | "email" | "form") {
  if (!GA_ID || localStorage.getItem(CONSENT_KEY) !== "accepted") return;
  window.gtag?.("event", "contact_click", {
    contact_method: method,
    page_path: window.location.pathname,
    page_location: window.location.origin + window.location.pathname,
  });
}
