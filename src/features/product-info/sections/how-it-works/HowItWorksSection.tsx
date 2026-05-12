import { AnimateIn } from "../../components/AnimateIn";
import StepCard from "./StepCard";
import FlowBar from "./FlowBar";

const steps = [
  {
    number: "01",
    title: "Employee Submits Request",
    description: "The employee selects their leave type, picks dates with real-time balance shown, adds a note, and hits submit in seconds.",
    detail: "Balance auto-calculated · Clash detection · Half-day support",
  },
  {
    number: "02",
    title: "Approval Chain Triggers",
    description: "Configured approvers are notified instantly. They can approve, reject, or forward the request—directly from the notification or the approvals dashboard.",
    detail: "Multi-step routing · Parallel approvals · Auto-escalation",
  },
  {
    number: "03",
    title: "Employee Gets Updated",
    description: "The moment a decision is made, the employee receives a push notification with the outcome. Their balance updates automatically.",
    detail: "Real-time updates · Balance sync · Email fallback",
  },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="py-16 sm:py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <AnimateIn animation="fade-up" duration={500}>
          <span className="inline-block text-sm font-black uppercase tracking-[0.2em] text-primary-500 mb-4">
            How It Works
          </span>
        </AnimateIn>
        <AnimateIn animation="fade-up" delay={80} duration={600}>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-secondary-900 tracking-tight mb-6">
            From request to resolution in minutes.
          </h2>
        </AnimateIn>
        <AnimateIn animation="fade-up" delay={160} duration={600}>
          <p className="text-lg text-secondary-500">
            No email chains. No spreadsheets. A simple three-step loop that keeps everyone informed.
          </p>
        </AnimateIn>
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {steps.map((step, index) => (
          <AnimateIn
            key={step.number}
            animation="fade-up"
            delay={index * 150}
            duration={600}
          >
            <StepCard {...step} isLast={index === steps.length - 1} />
          </AnimateIn>
        ))}
      </div>

      <AnimateIn animation="fade-up" delay={300} duration={600}>
        <FlowBar />
      </AnimateIn>
    </div>

    <style>{`
      @keyframes flowDot {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.5); opacity: 0.7; }
      }
      @keyframes flowLine {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(400%); }
      }
      .flow-dot { animation: flowDot 2s ease-in-out infinite; }
      .flow-line { animation: flowLine 2s ease-in-out infinite; }
    `}</style>
  </section>
);

export default HowItWorksSection;
