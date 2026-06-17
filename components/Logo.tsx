import { cn } from "./ui";

/** Logo MRB (SVG vectorial del brand kit). variant "white" para fondos oscuros. */
export function Logo({
  variant = "navy",
  className,
}: {
  variant?: "navy" | "white";
  className?: string;
}) {
  const src =
    variant === "white" ? "/brand/logo-mrb-white.svg" : "/brand/logo-mrb.svg";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="MRB Business Consulting"
      width={148}
      height={64}
      className={cn("h-11 w-auto sm:h-12", className)}
    />
  );
}
