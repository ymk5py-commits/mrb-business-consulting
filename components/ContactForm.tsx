"use client";

import { useState, type FormEvent } from "react";
import { WhatsappIcon } from "./icons";
import { site } from "@/lib/site.config";
import { trackContact } from "@/lib/analytics";
import { services } from "@/lib/services";

const inputClasses =
  "mt-1.5 w-full rounded-xl border border-slate-300 bg-paper px-4 text-sm text-navy-900 outline-2 outline-offset-1 outline-transparent transition-colors placeholder:text-slate-500 hover:border-slate-400 focus:border-accent focus:outline-accent disabled:cursor-not-allowed disabled:opacity-55";

export function ContactForm() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    servicio: "",
    mensaje: "",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    trackContact("form");
    const lines = [
      `Hola MRB Business Consulting, soy ${form.nombre || "(sin nombre)"}.`,
      form.servicio && `Servicio de interés: ${form.servicio}.`,
      form.mensaje && `Consulta: ${form.mensaje}`,
      form.email && `Mi correo: ${form.email}`,
    ].filter(Boolean);
    const text = encodeURIComponent(lines.join("\n"));
    window.open(
      `https://wa.me/${site.contact.whatsapp}?text=${text}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-rule bg-paper p-7">
      <div className="grid gap-5">
        <div>
          <label htmlFor="nombre" className="text-sm font-medium text-navy-900">
            Nombre <span className="text-accent">*</span>
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            autoComplete="name"
            value={form.nombre}
            onChange={(e) => update("nombre", e.target.value)}
            placeholder="Ej.: Juan Pérez…"
            className={`${inputClasses} h-12`}
          />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-navy-900">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            spellCheck={false}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="nombre@empresa.com.py…"
            className={`${inputClasses} h-12`}
          />
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
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Otro / No estoy seguro">Otro / No estoy seguro</option>
          </select>
        </div>

        <div>
          <label htmlFor="mensaje" className="text-sm font-medium text-navy-900">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={4}
            value={form.mensaje}
            onChange={(e) => update("mensaje", e.target.value)}
            placeholder="Contanos brevemente qué necesitás…"
            className={`${inputClasses} py-3`}
          />
        </div>

        <button
          type="submit"
          className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-whatsapp px-6 text-sm font-semibold text-paper transition-colors hover:bg-whatsapp-600 active:bg-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-55"
        >
          <WhatsappIcon className="h-5 w-5" />
          Enviar consulta por WhatsApp
        </button>
        <p className="text-center text-xs text-slate-500">
          Al enviar se abre WhatsApp con tu mensaje listo para enviar. También podés
          escribirnos directamente.
        </p>
      </div>
    </form>
  );
}
