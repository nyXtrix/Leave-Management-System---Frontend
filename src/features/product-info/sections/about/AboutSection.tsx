import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AnimateIn } from "../../components/AnimateIn";
import StatGrid from "./StatGrid";
import CTAStrip from "./CTAStrip";

const AboutSection = () => (
  <section id="about" className="py-16 sm:py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        <div className="flex-1 text-center lg:text-left">
          <AnimateIn animation="fade-right" duration={500}>
            <span className="inline-block text-sm font-black uppercase tracking-[0.2em] text-primary-500 mb-4">
              About
            </span>
          </AnimateIn>
          <AnimateIn animation="fade-right" delay={80} duration={600}>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-secondary-900 tracking-tight mb-6">
              Built by engineers who hated spreadsheet leave tracking.
            </h2>
          </AnimateIn>
          <AnimateIn animation="fade-right" delay={160} duration={600}>
            <p className="text-lg text-secondary-500 leading-relaxed mb-6">
              <span className="text-primary-500 font-bold"> FLOW OFF</span> was born out of frustration with fragmented HR tools. We believed that something as fundamental as employee time-off shouldn't require five different systems, a shared spreadsheet, and a WhatsApp group to manage.
            </p>
          </AnimateIn>
          <AnimateIn animation="fade-right" delay={240} duration={600}>
            <p className="text-base text-secondary-400 leading-relaxed mb-8">
              We built a platform that's powerful enough for enterprise compliance requirements, yet simple enough that an employee can submit a leave request in under 30 seconds. No training required.
            </p>
          </AnimateIn>
          <AnimateIn animation="fade-right" delay={300} duration={500}>
            <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-primary-500 hover:text-primary-600 transition-colors">
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimateIn>
        </div>

        <div className="flex-1 w-full max-w-lg lg:max-w-none">
          <StatGrid />
        </div>
      </div>
      <CTAStrip />
    </div>
  </section>
);

export default AboutSection;
