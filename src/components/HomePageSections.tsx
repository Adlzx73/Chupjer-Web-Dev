import { ComparisonMatrix } from "@/components/ComparisonMatrix";
import { DemoCTA } from "@/components/DemoCTA";
import { Faq } from "@/components/Faq";
import { FindYourMatch } from "@/components/FindYourMatch";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Pricing } from "@/components/Pricing";
import { ProductDeck } from "@/components/ProductDeck";
import { RoiCalculator } from "@/components/RoiCalculator";
import { Testimonials } from "@/components/Testimonials";
import { WhyChupjer } from "@/components/WhyChupjer";

/** All homepage sections, in display order. */
export function HomePageSections() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProductDeck />
        <ComparisonMatrix />
        <FindYourMatch />
        <RoiCalculator />
        <WhyChupjer />
        <Testimonials />
        <Pricing />
        <Faq />
        <DemoCTA />
      </main>
      <Footer />
      {/* Bottom padding so the mobile sticky bar never covers the footer. */}
      <div className="h-20 md:hidden" aria-hidden />
    </>
  );
}
