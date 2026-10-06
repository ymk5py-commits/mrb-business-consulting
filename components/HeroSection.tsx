import Image from "next/image";
import type { ReactNode } from "react";

/** Shared decorative background, with the same readable navy treatment as home. */
export function HeroSection({ image, children, className = "" }: {
  image: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative isolate overflow-hidden bg-navy-950 ${className}`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Image src={image} alt="" fill priority sizes="100vw" quality={80}
          className="scale-105 object-cover object-center blur-[3px]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,16,38,0.92)_0%,rgba(0,16,38,0.80)_48%,rgba(0,16,38,0.70)_100%)]" />
      </div>
      <div className="relative">{children}</div>
    </section>
  );
}
