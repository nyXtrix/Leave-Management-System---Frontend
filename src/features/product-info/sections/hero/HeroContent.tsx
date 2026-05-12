import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { AnimateIn } from "../../components/AnimateIn";

const HeroContent = () => (
  <div className="flex-1 text-center lg:text-left">
    <AnimateIn animation="fade-up" delay={100} duration={600}>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-secondary-900 leading-[1.1] tracking-tight mb-6">
        FLOW OFF
        <br />
        <span className="text-primary-500">that scales</span> with
        <br />
        your team.
      </h1>
    </AnimateIn>

    <AnimateIn animation="fade-up" delay={200} duration={600}>
      <p className="text-lg sm:text-xl text-secondary-500 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
        A unified platform for leave requests, approvals, and policy management.
        Built for modern enterprises with role-based access and smart workflows.
      </p>
    </AnimateIn>

    <AnimateIn animation="fade-up" delay={300} duration={600}>
      <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 hover:-translate-y-0.5 text-sm w-full sm:w-auto justify-center"
        >
          Get Started
         <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-white hover:bg-secondary-50 text-secondary-700 font-semibold px-6 py-3 rounded-xl border border-secondary-200 transition-all duration-200 hover:-translate-y-0.5 text-sm w-full sm:w-auto justify-center"
        >
          <Play className="h-4 w-4 fill-secondary-400 text-secondary-400" />
          Watch demo
        </Link>
      </div>
    </AnimateIn>

    <AnimateIn animation="fade-up" delay={420} duration={500}>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-secondary-400">
        {["SOC 2 Compliant", "GDPR Ready", "99.9% Uptime"].map((badge) => (
          <div key={badge} className="flex items-center gap-1.5">
            <svg
              className="h-4 w-4 text-emerald-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="font-medium">{badge}</span>
          </div>
        ))}
      </div>
    </AnimateIn>
  </div>
);

export default HeroContent;
