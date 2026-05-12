import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AnimateIn } from "../../components/AnimateIn";

const CTAStrip = () => (
  <AnimateIn animation="fade-up" delay={100} duration={600}>
    <div className="mt-20 bg-linear-to-br from-primary-500 to-primary-600 rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xl shadow-primary-500/20">
      <div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
          Ready to modernize with FLOW OFF?
        </h3>
        <p className="text-primary-100 text-base">
          Set up your organization in under 10 minutes. No credit card required.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 shrink-0">
        <Link
          to="/contact"
          className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 font-bold px-6 py-3 rounded-xl text-sm hover:bg-primary-50 transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
        >
          Get started
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center gap-2 bg-primary-600/50 text-white font-semibold px-6 py-3 rounded-xl text-sm border border-primary-400/50 hover:bg-primary-600 transition-all duration-200"
        >
          Contact
        </Link>
      </div>
    </div>
  </AnimateIn>
);

export default CTAStrip;
