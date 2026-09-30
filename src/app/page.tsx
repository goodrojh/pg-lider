"use client";
import Hero from "@/components/sections/Hero";
import Ticker from "@/components/sections/Ticker";
import Features from "@/components/sections/Features";
import Services from "@/components/sections/Services";
import HowItWorks from "@/components/sections/HowItWorks";
import Compare from "@/components/sections/Compare";
import Cases from "@/components/sections/Cases";
import Clients from "@/components/sections/Clients";
import Calculator from "@/components/sections/Calculator";
import Software from "@/components/sections/Software";
import Pricing from "@/components/sections/Pricing";
import Expert from "@/components/sections/Expert";
import About from "@/components/sections/About";
import FAQ from "@/components/sections/FAQ";
import Blog from "@/components/sections/Blog";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Ticker />
      <Cases />
      <Features />
      <Services />
      <HowItWorks />
      <Compare />
      <Clients />
      <Calculator />
      <Software />
      <Pricing />
      <Expert />
      <About />
      <FAQ />
      <Blog />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
