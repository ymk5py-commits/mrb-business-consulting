"use client";

import { useState, type FormEvent } from "react";
import { WhatsappIcon } from "./icons";
import { site } from "@/lib/site.config";
import { services } from "@/lib/services";

const inputClasses =
  "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-navy-900 shadow-sm transition-colors placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

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
    <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
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
            placeholder="Tu nombre y apellido"
            className={inputClasses}
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
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            className={inputClasses}
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
            className={inputClasses}
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
            placeholder="Contanos brevemente qué necesitás"
            className={inputClasses}
          />
        </div>

        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1ebe5b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 cursor-pointer"
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
