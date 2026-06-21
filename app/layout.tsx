import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Schibsted_Grotesk, Spectral } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { ScrollProgress } from "@/components/motion";
import { CustomCursor } from "@/components/CustomCursor";
import { MotionProvider } from "@/components/MotionProvider";
import { JsonLd } from "@/components/ui";
import { site } from "@/lib/site.config";
import { organizationSchema, websiteSchema } from "@/lib/seo";

// Cuerpo: grotesca humanista, muy legible y sobria.
const bodyFont = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Titulares: neo-grotesca moderna con carácter, sobria.
const displayFont = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-face",
  display: "swap",
});

// Acento editorial: serif itálica refinada para el hero.
const serifFont = Spectral({
  subsets: ["latin"],
  weight: ["500"],
  style: ["italic"],
  variable: "--font-serif-accent",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "consultoría empresarial Paraguay",
    "estudio contable Asunción",
    "asesoría tributaria Paraguay",
    "constituir empresa Paraguay",
    "constitución de sociedades",
    "S.A.",
    "S.R.L.",
    "E.A.S.",
    "liquidación de impuestos",
    "IVA",
    "IRE",
    "IPS",
    "DNIT",
    "RUC",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  manifest: "/site.webmanifest",
  category: "business",
};

export const viewport: Viewport = {
  themeColor: "#001b43",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-PY"
      className={`${bodyFont.variable} ${displayFont.variable} ${serifFont.variable}`}
    >
      <body className="flex min-h-dvh flex-col bg-white antialiased">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <MotionProvider>
          <ScrollProgress />
          <CustomCursor />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFab />
        </MotionProvider>
      </body>
    </html>
  );
}
