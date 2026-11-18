"use client";

import { useId, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { WhatsappIcon } from "./icons";
import { site } from "@/lib/site.config";
import { trackContact } from "@/lib/analytics";
import { serviceGroups } from "@/lib/services";

const inputClasses =
  "mt-1.5 w-full rounded-xl border border-slate-300 bg-paper px-4 text-base text-navy-900 outline-2 outline-offset-1 outline-transparent transition-colors placeholder:text-slate-500 hover:border-slate-400 focus:border-accent focus:outline-accent aria-[invalid=true]:border-red-700 aria-[invalid=true]:focus:outline-red-700 disabled:cursor-not-allowed disabled:opacity-55 sm:text-sm";

type Status = { kind: "idle" } | { kind: "opened"; href: string } | { kind: "blocked"; href: string };

/**
 * Armador de consulta: no envía nada a un servidor. Con los datos arma un mensaje
 * y abre WhatsApp para que la persona lo envíe. Por eso no pide correo.
 *
 * - El botón queda deshabilitado hasta que carga el JS: sin JS, un submit nativo
 *   mandaría los datos en la URL.
 * - Validación propia (en voseo, debajo del campo) en lugar de los globos del navegador.
 * - Si el navegador bloquea la ventana, queda un enlace para abrir WhatsApp a mano.
 */
export function ContactForm() {
  // true solo en el cliente, ya hidratado (en el HTML del servidor es false).
  const ready = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [form, setForm] = useState({ nombre: "", servicio: "", mensaje: "" });
  const [nameError, setNameError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const nameRef = useRef<HTMLInputElement>(null);
  const errorId = useId();

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === "nombre" && nameError && value.trim().length >= 2) setNameError(null);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (form.nombre.trim().length < 2) {
      setNameError("Escribí tu nombre: así sabemos cómo dirigirnos a vos.");
      nameRef.current?.focus();
      return;
    }
    trackContact("form");
    const lines = [
      `Hola ${site.name}, soy ${form.nombre.trim()}.`,
      form.servicio && `Servicio de interés: ${form.servicio}.`,
      form.mensaje.trim() && `Consulta: ${form.mensaje.trim()}`,
    ].filter(Boolean);
    const href = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    const win = window.open(href, "_blank", "noopener,noreferrer");
    // Con "noopener" algunos navegadores devuelven null aunque la ventana se abra:
    // en ambos casos dejamos el enlace a mano; solo cambia el texto.
    setStatus(win ? { kind: "opened", href } : { kind: "blocked", href });
  };

  return (
    <form
      method="post"
      noValidate
      onSubmit={onSubmit}
      className="rounded-2xl border border-rule bg-paper p-6 sm:p-7"
    >
      <div className="grid gap-5">
        <div>
          <label htmlFor="nombre" className="text-sm font-medium text-navy-900">
            Nombre <span className="text-accent-600">*</span>
          </label>
          <input
            ref={nameRef}
            id="nombre"
            name="nombre"
            type="text"
            required
            autoComplete="name"
            value={form.nombre}
            onChange={(e) => update("nombre", e.target.value)}
            placeholder="Ej.: Juan Pérez"
            aria-invalid={nameError ? true : undefined}
            aria-describedby={nameError ? errorId : undefined}
            className={`${inputClasses} h-12`}
          />
          {nameError && (
            <p id={errorId} className="mt-1.5 text-sm text-red-700">
              {nameError}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="servicio" className="text-sm font-medium text-navy-900">
            Servicio de interés
          </label>
          <select
            id="servicio"
            name="servicio"
            value={form.servicio}
            onChange={(e) => update("servicio", e.target.value)}
            className={`${inputClasses} h-12`}
          >
            <option value="">Seleccioná un servicio</option>
            {serviceGroups.map((group) => (
              <optgroup key={group.title} label={group.title}>
                {group.services.map((s) => (
                  <option key={s.slug} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </optgroup>
            ))}
            <option value="Otro / No estoy seguro">Otro / No estoy seguro</option>
          </select>
        </div>

        <div>
          <label htmlFor="mensaje" className="text-sm font-medium text-navy-900">
            Tu consulta
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={4}
            value={form.mensaje}
            onChange={(e) => update("mensaje", e.target.value)}
            placeholder="Contanos brevemente qué necesitás"
            className={`${inputClasses} py-3`}
          />
        </div>

        <button
          type="submit"
          disabled={!ready}
          data-wa-cta
          className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-center text-sm font-semibold text-paper transition-[background-color,scale] duration-200 ease-[var(--ease-out-soft)] hover:bg-whatsapp-600 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-55"
        >
          <WhatsappIcon className="h-5 w-5" />
          Abrir WhatsApp con mi consulta
        </button>

        {/* Qué pasó al enviar (lo anuncian los lectores de pantalla) */}
        <div role="status" aria-live="polite" className="empty:-mt-5">
          {status.kind !== "idle" && (
            <p className="rounded-xl bg-surface px-4 py-3 text-sm leading-relaxed text-navy-900">
              {status.kind === "opened"
                ? "Listo: abrimos WhatsApp con tu mensaje. Solo falta tocar Enviar allá. "
                : "Tu navegador no abrió la ventana. "}
              <a
                href={status.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent-600 underline underline-offset-4 hover:text-navy-900"
              >
                {status.kind === "opened" ? "¿No se abrió? Abrilo acá" : "Abrí WhatsApp acá"}
              </a>
            </p>
          )}
        </div>

        <p className="text-center text-xs leading-relaxed text-slate-600">
          No guardamos tus datos en este sitio: el mensaje lo enviás vos desde WhatsApp.
        </p>
        <noscript>
          <p className="text-center text-sm text-navy-900">
            Para usar el formulario activá JavaScript, o escribinos directo por WhatsApp
            al {site.contact.phone}.
          </p>
        </noscript>
      </div>
    </form>
  );
}
