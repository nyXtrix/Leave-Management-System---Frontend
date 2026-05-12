import { AnimateIn } from "../../components/AnimateIn";
import WorkflowDiagram from "./WorkflowDiagram";

const WorkflowSection = () => (
  <section id="workflow" className="py-16 sm:py-24 bg-secondary-900 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="flex-1 text-center lg:text-left">
          <AnimateIn animation="fade-right" duration={500} threshold={0.1}>
            <span className="inline-block text-sm font-black uppercase tracking-[0.2em] text-primary-500 mb-4">
              Workflow Engine
            </span>
          </AnimateIn>

          <AnimateIn animation="fade-right" delay={100} duration={600} threshold={0.1}>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
              Build approval chains as complex as your org.
            </h2>
          </AnimateIn>

          <AnimateIn animation="fade-right" delay={180} duration={600} threshold={0.1}>
            <p className="text-lg text-secondary-400 leading-relaxed mb-8">
              Create unlimited approval levels—sequential or parallel. Set role-based routing, automatic forwarding when approvers are out, and time-limit escalations.
            </p>
          </AnimateIn>

          <div className="space-y-4">
            {[
              { label: "Sequential & Parallel Approval", desc: "Mix and match routing modes per leave type." },
              { label: "Role-Based Auto-Routing", desc: "Route by department, hierarchy, or custom roles." },
              { label: "Out-of-Office Forwarding", desc: "Automatically re-routes when an approver is on leave." },
            ].map((item, i) => (
              <AnimateIn key={item.label} animation="fade-right" delay={260 + i * 100} duration={500} threshold={0.1}>
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-primary-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="h-3 w-3 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{item.label}</p>
                    <p className="text-sm text-secondary-400">{item.desc}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>

        <AnimateIn animation="fade-left" delay={100} duration={700} threshold={0.1} className="flex-1 w-full max-w-lg lg:max-w-none">
          <WorkflowDiagram />
        </AnimateIn>
      </div>
    </div>
  </section>
);

export default WorkflowSection;
