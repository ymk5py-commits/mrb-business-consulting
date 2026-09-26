"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button, cn } from "./ui";
import { WhatsappIcon } from "./icons";
import { navLinks, whatsappHref, site } from "@/lib/site.config";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Sombra sutil una vez que se scrollea (el header queda siempre visible).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar el menú móvil al cambiar de ruta (ajuste de estado en render, sin efecto)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Escape cierra el menú móvil
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full border-b bg-paper transition-colors duration-200",
        scrolled ? "border-rule" : "border-transparent",
      )}
    >
      <nav
        aria-label="Principal"
        className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="/"
          aria-label="MRB Business Consulting — Inicio"
          className="shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4"
        >
          <Logo />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "rounded-sm px-3 py-2 text-sm font-medium underline-offset-8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                isActive(link.href)
                  ? "text-navy-900 underline decoration-accent decoration-2"
                  : "text-slate-600 hover:text-navy-900",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 whitespace-nowrap rounded-sm text-sm font-semibold text-navy-900 transition-colors hover:text-whatsapp focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:inline-flex"
        >
          <WhatsappIcon className="h-4 w-4 text-whatsapp" />
          {site.contact.phone}
          <span className="sr-only"> (WhatsApp)</span>
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-navy-900 transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-rule bg-paper px-5 pb-6 pt-2 lg:hidden"
        >
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "rounded-xl px-4 py-3 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  isActive(link.href)
                    ? "bg-surface text-accent-600"
                    : "text-slate-700 hover:bg-surface",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Button
            href={whatsappHref}
            external
            variant="secondary"
            size="lg"
            className="mt-4 w-full"
            aria-label="Consultá ahora por WhatsApp"
          >
            <WhatsappIcon className="h-5 w-5" />
            Consultá ahora
          </Button>
        </div>
      )}
    </header>
  );
}
