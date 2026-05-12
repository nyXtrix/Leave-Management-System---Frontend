import { useState } from "react";
import { Rocket, Building2, Users2 } from "lucide-react";
import { AnimateIn } from "../../components/AnimateIn";
import SolutionCard from "./SolutionCard";

const solutions = [
  {
    id: "startups",
    icon: Rocket,
    label: "For Startups",
    headline: "Launch fast. Scale later.",
    description:
      "Get your leave process off the ground in minutes with sensible defaults. No complex configuration—just connect your team and go.",
    points: [
      "10-minute setup with default policy templates",
      "Flat org structure support",
      "Manager → Employee simple approval chain",
      "Self-serve balance tracking",
    ],
    cta: "Start free",
    ctaHref: "/register",
    bg: "from-primary-50 to-white",
    accent: "#FF1919",
    iconBg: "bg-primary-50",
    iconColor: "text-primary-500",
    dark: false,
  },
  {
    id: "enterprise",
    icon: Building2,
    label: "For Enterprises",
    headline: "Built for org complexity.",
    description:
      "Multi-department hierarchies, custom approval chains, advanced policy overrides, and per-tenant data isolation—all out of the box.",
    points: [
      "Department-scoped policies and overrides",
      "Multi-level approval chains (sequential & parallel)",
      "RBAC with action-level granularity",
      "Audit logs, compliance exports",
    ],
    cta: "Request demo",
    ctaHref: "/contact",
    bg: "from-secondary-900 to-secondary-800",
    accent: "#fff",
    iconBg: "bg-white/10",
    iconColor: "text-white",
    dark: true,
  },
  {
    id: "hr",
    icon: Users2,
    label: "For HR Teams",
    headline: "The HR view you always wanted.",
    description:
      "A single dashboard for leave balances, pending requests, team calendars, and policy management—so HR spends less time on admin.",
    points: [
      "Org-wide leave calendar view",
      "Bulk policy updates across departments",
      "Real-time analytics & utilization reports",
      "Employee self-service reduces HR tickets by 60%",
    ],
    cta: "Book a demo",
    ctaHref: "/contact",
    bg: "from-blue-50 to-white",
    accent: "#3B82F6",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    dark: false,
  },
];

const SolutionsSection = () => {
  const [active, setActive] = useState("startups");
  const sol = solutions.find((s) => s.id === active) || solutions[0];

  return (
    <section
      id="solutions-startups"
      className="py-16 sm:py-24 bg-secondary-100/30"
    >
      <span id="solutions-enterprise" />
      <span id="solutions-hr" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <AnimateIn animation="fade-up" duration={500}>
            <span className="inline-block text-sm font-black uppercase tracking-[0.2em] text-primary-500 mb-4">
              Solutions
            </span>
          </AnimateIn>
          <AnimateIn animation="fade-up" delay={80} duration={600}>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-secondary-900 tracking-tight mb-6">
              Everything you need.
            </h2>
          </AnimateIn>
          <AnimateIn animation="fade-up" delay={160} duration={600}>
            <p className="text-lg text-secondary-500">
              Whether you're a 5-person startup or a 5,000-person enterprise,
              <span className="text-primary-500 font-bold"> FLOW OFF</span> adapts to how
              you work.
            </p>
          </AnimateIn>
        </div>

        <AnimateIn animation="fade-up" delay={220} duration={500}>
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-white border border-secondary-200 rounded-xl p-1 gap-1 flex-wrap justify-center shadow-sm">
              {solutions.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActive(s.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      active === s.id
                        ? "bg-secondary-900 text-white shadow-sm"
                        : "text-secondary-500 hover:text-secondary-700"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>
        </AnimateIn>

        <AnimateIn animation="zoom-in" delay={60} duration={500} key={active}>
          <SolutionCard sol={sol} />
        </AnimateIn>
      </div>

      <style>{`
        @keyframes solRing { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        @keyframes solPill { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .sol-ring { animation: solRing 3s ease-in-out infinite; }
        .sol-pill { animation: solPill 0.4s ease forwards; opacity: 0; }
      `}</style>
    </section>
  );
};

export default SolutionsSection;
