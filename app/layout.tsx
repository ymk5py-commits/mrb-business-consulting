import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Schibsted_Grotesk, Spectral } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
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

// Home: ≤ 60 / ≤ 158 caracteres (Google trunca más allá).
const HOME_TITLE = "Estudio Contable en Lambaré y Gran Asunción | MRB";
const HOME_DESCRIPTION =
  "Estudio contable, tributario y societario en Lambaré (Gran Asunción). Contabilidad, impuestos, sociedades e IPS para empresas y personas de todo Paraguay.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: HOME_TITLE,
    template: `%s | ${site.name}`,
  },
  description: HOME_DESCRIPTION,
  applicationName: site.name,
  keywords: [
    "consultoría empresarial Paraguay",
    "estudio contable Lambaré",
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
  alternates: { canonical: `${site.url}/` },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: `${site.url}/`,
    siteName: site.name,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
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
      <body className="antialiased">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-navy-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-paper focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-bright"
        >
          Saltar al contenido
        </a>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Header />
        <main id="contenido" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <WhatsAppFab />
        <Analytics />
      </body>
    </html>
  );
}
