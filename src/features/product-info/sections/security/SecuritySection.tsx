import { AnimateIn } from "../../components/AnimateIn";
import PermissionMatrix from "./PermissionMatrix";

const securityPoints = [
  { title: "Scope-Aware Permissions", description: "Control access at three scopes: own records only, department-wide, or the entire organization." },
  { title: "Action-Level Granularity", description: "Independently grant VIEW, CREATE, UPDATE, and DELETE per module—not just on/off switches." },
  { title: "Audit-Ready Logging", description: "Every approval, rejection, or policy change is timestamped and attributed to a specific user." },
  { title: "Multi-Tenant Isolation", description: "Every company's data is completely isolated. One tenant can never access another's records." },
];

const SecuritySection = () => (
  <section id="security" className="py-16 sm:py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-4xl mx-auto mb-14">
        <AnimateIn animation="fade-up" duration={500}>
          <span className="inline-block text-sm font-black uppercase tracking-[0.2em] text-primary-500 mb-4">
            Security & Permissions
          </span>
        </AnimateIn>
        <AnimateIn animation="fade-up" delay={80} duration={600}>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-secondary-900 tracking-tight mb-6">
            Enterprise-grade security.
          </h2>
        </AnimateIn>
        <AnimateIn animation="fade-up" delay={160} duration={600}>
          <p className="text-lg text-secondary-500">
            Fine-grained access control built on a role-based permission engine—no bloated admin panels, just simple, powerful rules.
          </p>
        </AnimateIn>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
        <div className="flex-1 w-full overflow-x-auto">
          <PermissionMatrix />
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
          {securityPoints.map((point, i) => (
            <AnimateIn key={point.title} animation="fade-left" delay={200 + i * 120} duration={500}>
              <div className="flex gap-4">
                <div className="shrink-0 h-8 w-8 rounded-lg bg-secondary-900 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-extrabold text-white">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-secondary-800 mb-1">{point.title}</h3>
                  <p className="text-sm text-secondary-500 leading-relaxed">{point.description}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default SecuritySection;
