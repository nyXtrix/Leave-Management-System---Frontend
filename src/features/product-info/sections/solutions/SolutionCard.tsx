import { Link } from "react-router-dom";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface SolutionCardProps {
  sol: {
    headline: string;
    description: string;
    points: string[];
    cta: string;
    ctaHref: string;
    bg: string;
    accent: string;
    iconBg: string;
    iconColor: string;
    dark: boolean;
    icon: LucideIcon;
  };
}

const SolutionCard = ({ sol }: SolutionCardProps) => (
  <div className={`bg-linear-to-br ${sol.bg} rounded-2xl border ${sol.dark ? "border-secondary-700" : "border-secondary-200"} overflow-hidden shadow-lg`}>
    <div className="flex flex-col lg:flex-row">
      <div className="flex-1 p-8 sm:p-10 lg:p-12">
        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${sol.iconBg} mb-6`}>
          <sol.icon className={`h-6 w-6 ${sol.iconColor}`} strokeWidth={1.75} />
        </div>
        <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 ${sol.dark ? "text-white" : "text-secondary-900"}`}>
          {sol.headline}
        </h3>
        <p className={`text-base mb-8 leading-relaxed ${sol.dark ? "text-secondary-400" : "text-secondary-500"}`}>
          {sol.description}
        </p>
        <ul className="space-y-3 mb-8">
          {sol.points.map((p) => (
            <li key={p} className="flex items-start gap-3">
              <svg className="h-5 w-5 shrink-0 mt-0.5" viewBox="0 0 20 20" fill={sol.accent}>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className={`text-sm font-medium ${sol.dark ? "text-secondary-300" : "text-secondary-700"}`}>{p}</span>
            </li>
          ))}
        </ul>
        <Link
          to={sol.ctaHref}
          className={`inline-flex items-center gap-2 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all duration-200 hover:-translate-y-0.5 ${
            sol.dark
              ? "bg-white text-secondary-900 hover:bg-secondary-50 shadow-lg"
              : "bg-secondary-900 text-white hover:bg-secondary-800 shadow-lg shadow-secondary-900/10"
          }`}
        >
          {sol.cta}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 sm:p-10">
        <div className="relative w-full max-w-sm flex flex-col items-center">
          <div
            className="h-24 w-24 rounded-3xl flex items-center justify-center shadow-xl mb-6 sol-ring"
            style={{ background: `${sol.accent}20`, border: `2px solid ${sol.accent}30` }}
          >
            <sol.icon className="h-12 w-12" style={{ color: sol.accent }} strokeWidth={1.5} />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {sol.points.slice(0, 3).map((p, i) => (
              <div
                key={p}
                className={`text-[11px] font-semibold px-3 py-1.5 rounded-full border sol-pill ${sol.dark ? "bg-white/10 border-white/20 text-white/70" : "bg-white border-secondary-200 text-secondary-600 shadow-sm"}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {p.split(" ").slice(0, 4).join(" ")}…
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SolutionCard;
