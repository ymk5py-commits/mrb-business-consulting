import Link from "next/link";
import type { ReactNode } from "react";

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/* ---------------- Container ---------------- */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

/* ---------------- Section ---------------- */
type SectionTone = "light" | "surface" | "navy";

export function Section({
  children,
  id,
  tone = "light",
  className,
}: {
  children: ReactNode;
  id?: string;
  tone?: SectionTone;
  className?: string;
}) {
  const tones: Record<SectionTone, string> = {
    light: "bg-paper text-slate-700",
    surface: "bg-surface text-slate-700",
    navy: "bg-navy-900 text-slate-100",
  };
  return (
    <section
      id={id}
      className={cn("py-20 sm:py-24 lg:py-28", tones[tone], className)}
    >
      {children}
    </section>
  );
}

/* ---------------- Section heading ----------------
   Sin "eyebrow" arriba del título (etiqueta en mayúsculas = tic de plantilla).
   Alineado a la izquierda por defecto: el cuerpo de cada sección también lo está. */
export function SectionHeading({
  title,
  subtitle,
  align = "left",
  tone = "dark",
  as = "h2",
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
}) {
  const Heading = as;
  const isLight = tone === "light";
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      <Heading
        className={cn(
          "font-display text-balance text-3xl leading-tight sm:text-4xl lg:text-[2.6rem]",
          isLight ? "text-paper" : "text-navy-900",
        )}
      >
        {title}
      </Heading>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-pretty text-base leading-relaxed sm:text-lg",
            isLight ? "text-slate-300" : "text-slate-600",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ---------------- Button ---------------- */
type ButtonVariant = "primary" | "secondary" | "ghost" | "white" | "whatsapp";
type ButtonSize = "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-accent text-paper hover:bg-accent-600 active:bg-navy-800",
  secondary: "bg-navy-900 text-paper hover:bg-navy-800 active:bg-navy-950",
  ghost:
    "bg-transparent text-navy-900 ring-1 ring-inset ring-rule hover:bg-surface hover:ring-slate-400 active:bg-surface-2",
  white: "bg-paper text-navy-900 hover:bg-surface-2 active:bg-surface",
  whatsapp: "bg-whatsapp text-paper hover:bg-whatsapp-600 active:bg-navy-900",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  external,
  className,
  ...rest
}: {
  children: ReactNode;
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
  className?: string;
  "aria-label"?: string;
}) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 cursor-pointer",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

/* ---------------- JSON-LD ---------------- */
export function JsonLd({ data }: { data: object | object[] }) {
  // Escapa "<" para que un "</script" dentro de algún texto no corte el bloque.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
