import { Container, Button } from "@/components/ui";
import { Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="bg-linear-to-br from-navy-950 via-navy-900 to-navy-800">
      <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <span className="font-display text-7xl text-accent-bright sm:text-8xl">404</span>
        <h1 className="font-display mt-4 text-3xl text-white sm:text-4xl">
          Página no encontrada
        </h1>
        <p className="mt-4 max-w-md text-slate-300">
          La página que buscás no existe o fue movida. Volvé al inicio o explorá
          nuestros servicios.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/" variant="white" size="lg">
            <Home className="h-5 w-5" />
            Ir al inicio
          </Button>
          <Button href="/servicios" variant="primary" size="lg">
            Ver servicios
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
