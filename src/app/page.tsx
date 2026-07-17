import { Header } from "@/components/pizza-dash/header";
import { Hero } from "@/components/pizza-dash/hero";
import { MenuSection } from "@/components/pizza-dash/menu-section";
import { AboutSection } from "@/components/pizza-dash/about-section";
import { TestimonialsSection } from "@/components/pizza-dash/testimonials-section";
import { HowToOrderSection } from "@/components/pizza-dash/how-to-order-section";
import { FAQSection } from "@/components/pizza-dash/faq-section";
import { TopPicksSection } from "@/components/pizza-dash/top-picks-section";
import { Footer } from "@/components/pizza-dash/footer";
import { CartDrawer } from "@/components/pizza-dash/cart-drawer";
import { FloatingButtons } from "@/components/pizza-dash/floating-buttons";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <MenuSection />
        <AboutSection />
        <TestimonialsSection />
        <HowToOrderSection />
        <TopPicksSection />
        <FAQSection />
      </main>
      <Footer />
      <CartDrawer />
      <FloatingButtons />
    </div>
  );
}