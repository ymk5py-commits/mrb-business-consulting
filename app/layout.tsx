import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { ScrollProgress } from "@/components/motion";
import { MotionProvider } from "@/components/MotionProvider";
import { JsonLd } from "@/components/ui";
import { site } from "@/lib/site.config";
import { organizationSchema, websiteSchema } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const arialRounded = localFont({
  src: "./fonts/ArialRoundedMTBold.ttf",
  variable: "--font-arial-rounded",
  weight: "700",
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
    <html lang="es-PY" className={`${inter.variable} ${arialRounded.variable}`}>
      <body className="flex min-h-dvh flex-col bg-white antialiased">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <MotionProvider>
          <ScrollProgress />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFab />
        </MotionProvider>
      </body>
    </html>
  );
}
