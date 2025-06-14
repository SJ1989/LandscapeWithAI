
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { DesignShowcase } from "@/components/DesignShowcase";
import { FeatureHighlights } from "@/components/FeatureHighlights";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Navigation />
      <Hero />
      <DesignShowcase />
      <FeatureHighlights />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
