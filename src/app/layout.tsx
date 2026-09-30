import type { Metadata, Viewport } from "next";
import { Manrope, Unbounded } from "next/font/google";
import "./globals.css";
import ModalProvider from "@/components/ui/ModalProvider";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-unbounded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Проектная группа «ЛИДЕР» — архитектурно-строительное проектирование и обследование зданий",
  description:
    "Проектная группа «ЛИДЕР»: проектирование промышленных, жилых и общественных зданий, техническое обследование, инженерные изыскания, реставрация объектов культурного наследия, сопровождение Главгосэкспертизы. Москва, Брянск, Орёл.",
  keywords: ["архитектурно-строительное проектирование", "техническое обследование зданий", "инженерные изыскания", "объекты культурного наследия", "реставрация ОКН", "Главгосэкспертиза", "проектная организация", "BIM"],
  openGraph: {
    title: "Проектная группа «ЛИДЕР» — проектируем будущее вместе",
    description: "150+ крупных проектов с 2018 года. Проектирование, обследование, изыскания, ОКН, сопровождение экспертизы.",
    type: "website",
    locale: "ru_RU",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1628",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" data-scroll-behavior="smooth" className={`${manrope.variable} ${unbounded.variable}`}>
      <body className="antialiased">
        <ModalProvider>{children}</ModalProvider>
      </body>
    </html>
  );
}
