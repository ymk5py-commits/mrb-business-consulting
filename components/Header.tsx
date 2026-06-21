"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button, cn } from "./ui";
import { WhatsappIcon } from "./icons";
import { navLinks, whatsappHref } from "@/lib/site.config";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      // Ocultar al bajar (pasado el hero), mostrar al subir o cerca del tope.
      setHidden(y > 160 && y > lastY.current + 4);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar el menú móvil al cambiar de ruta
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-white/90 backdrop-blur transition-[transform,box-shadow] duration-300 ease-out",
        scrolled ? "shadow-sm shadow-slate-900/5 ring-1 ring-slate-900/5" : "",
        hidden && !open ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <nav
        aria-label="Principal"
        className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <Link href="/" aria-label="MRB Business Consulting — Inicio" className="shrink-0">
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
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "text-accent"
                  : "text-slate-600 hover:text-navy-900",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button href={whatsappHref} external variant="primary" aria-label="Escribir por WhatsApp">
            <WhatsappIcon className="h-4 w-4" />
            Consultá ahora
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-navy-900 hover:bg-surface lg:hidden cursor-pointer"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-slate-200 bg-white px-5 pb-6 pt-2 lg:hidden"
        >
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "rounded-xl px-4 py-3 text-base font-medium transition-colors",
                  isActive(link.href)
                    ? "bg-surface text-accent"
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
            variant="primary"
            size="lg"
            className="mt-4 w-full"
            aria-label="Escribir por WhatsApp"
          >
            <WhatsappIcon className="h-5 w-5" />
            Consultá ahora
          </Button>
        </div>
      )}
    </header>
  );
}
