import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import ModalProvider from "@/components/ui/ModalProvider";
import CookieBanner from "@/components/ui/CookieBanner";
import Analytics from "@/components/ui/Analytics";
import { SITE, OFFICES } from "@/lib/site";
import { LEGAL } from "@/lib/legal";

const plex = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

const TITLE = "Проектирование зданий и сооружений — проектная организация «Раздел Проект»";
const DESC =
  "Архитектурно-строительное проектирование, техническое обследование зданий, инженерные изыскания и сопровождение Главгосэкспертизы. 150+ объектов с 2018 года: промышленные корпуса, жилые комплексы, объекты культурного наследия. Москва, Брянск, Орёл.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: TITLE,
    template: "%s — Раздел Проект",
  },
  description: DESC,
  keywords: [
    "проектирование зданий",
    "проектная организация",
    "архитектурно-строительное проектирование",
    "техническое обследование зданий",
    "инженерные изыскания",
    "реставрация объектов культурного наследия",
    "Главгосэкспертиза",
    "рабочая документация",
    "стадия П",
    "BIM-проектирование",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESC,
    type: "website",
    locale: "ru_RU",
    siteName: SITE.name,
    url: "/",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#101a33",
  width: "device-width",
  initialScale: 1,
};

/** Разметка организации для Яндекса и Google */
function organizationJsonLd() {
  const base = SITE.url.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${base}/#organization`,
    name: SITE.name,
    alternateName: "Раздел Проект — проектная организация",
    url: base,
    // Реквизиты попадают в разметку только когда заполнены — см. src/lib/legal.ts
    ...(LEGAL.fullName ? { legalName: LEGAL.fullName } : {}),
    ...(LEGAL.inn ? { taxID: LEGAL.inn } : {}),
    ...(LEGAL.ogrn ? { identifier: { "@type": "PropertyValue", name: "ОГРН", value: LEGAL.ogrn } } : {}),
    telephone: SITE.phone,
    email: SITE.email,
    description: DESC,
    priceRange: "$$",
    areaServed: { "@type": "Country", name: "Россия" },
    address: OFFICES.map((o) => ({
      "@type": "PostalAddress",
      addressLocality: o.city,
      addressCountry: "RU",
    })),
    knowsAbout: [
      "архитектурно-строительное проектирование",
      "техническое обследование зданий и сооружений",
      "инженерные изыскания",
      "сохранение объектов культурного наследия",
      "сопровождение государственной экспертизы",
    ],
    openingHours: "Mo-Fr 09:00-19:00",
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" data-scroll-behavior="smooth" className={plex.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </head>
      <body className="antialiased">
        <ModalProvider>{children}</ModalProvider>
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
