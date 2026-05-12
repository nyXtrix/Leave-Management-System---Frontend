import { AnimateIn } from "../../components/AnimateIn";
import AnimatedDashboard from "./AnimatedDashboard";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";

const HeroSection = () => (
  <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
    <HeroBackground />

    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <HeroContent />
        <AnimateIn animation="fade-left" delay={200} duration={700} className="flex-1 w-full max-w-lg lg:max-w-none">
          <AnimatedDashboard />
        </AnimateIn>
      </div>
    </div>

    <style>{`
      @keyframes floatBadge1 {
        0%, 100% { transform: translateY(0px) rotate(-2deg); }
        50% { transform: translateY(-8px) rotate(-2deg); }
      }
      @keyframes floatBadge2 {
        0%, 100% { transform: translateY(0px) rotate(2deg); }
        50% { transform: translateY(-10px) rotate(2deg); }
      }
      @keyframes heroRowIn {
        from { opacity: 0; transform: translateX(-8px); }
        to { opacity: 1; transform: translateX(0); }
      }
      .float-badge-1 { animation: floatBadge1 3s ease-in-out infinite; }
      .float-badge-2 { animation: floatBadge2 4s ease-in-out infinite; }
      .hero-row { animation: heroRowIn 0.5s ease forwards; opacity: 0; }
    `}</style>
  </section>
);

export default HeroSection;
