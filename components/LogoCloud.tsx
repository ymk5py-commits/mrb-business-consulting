import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/components/ui";

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

/**
 * Nube de logos (clientes / aliados). Pasale un array de imágenes reales.
 * Listo para usar cuando MRB tenga logos de clientes para mostrar.
 */
export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  if (!logos.length) return null;
  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black,transparent)]",
        className,
      )}
    >
      <InfiniteSlider gap={42} reverse speed={80} speedOnHover={25}>
        {logos.map((logo) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={logo.alt}
            className="pointer-events-none h-5 w-auto select-none opacity-70 transition-opacity duration-300 hover:opacity-100 md:h-6"
            height={logo.height ?? 24}
            key={`logo-${logo.alt}`}
            loading="lazy"
            src={logo.src}
            width={logo.width ?? 96}
          />
        ))}
      </InfiniteSlider>
    </div>
  );
}
