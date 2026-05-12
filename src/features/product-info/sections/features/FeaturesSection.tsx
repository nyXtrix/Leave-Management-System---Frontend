import {
  Calendar, Users, ShieldCheck, Zap, BarChart3, Bell,
} from "lucide-react";
import { AnimateIn } from "../../components/AnimateIn";
import FeatureCard from "./FeatureCard";

const features = [
  { icon: Calendar, title: "Smart Leave Requests", description: "Employees submit leave with half-day precision, clash detection, and real-time balance visibility—all from one clean interface.", color: "text-primary-500", bg: "bg-primary-50" },
  { icon: Zap, title: "Multi-Step Approval Engine", description: "Build unlimited approval chains. Parallel, sequential, or role-based routing—with automatic forwarding when approvers are absent.", color: "text-amber-500", bg: "bg-amber-50" },
  { icon: Users, title: "Department-Level Policies", description: "Define accrual rules, blackout periods, and leave types per department or organization-wide with a visual policy editor.", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: ShieldCheck, title: "Granular Role Permissions", description: "Control what each role can view, create, update, or delete—scoped to their own records, their department, or the whole org.", color: "text-emerald-500", bg: "bg-emerald-50" },
  { icon: BarChart3, title: "Live Analytics Dashboard", description: "Track leave trends, department utilization, and approval response times with real-time data updated after every action.", color: "text-purple-500", bg: "bg-purple-50" },
  { icon: Bell, title: "Instant Notifications", description: "Push notifications to approvers, applicants, and managers the moment a leave status changes—no manual follow-ups needed.", color: "text-rose-500", bg: "bg-rose-50" },
];

const FeaturesSection = () => (
  <section id="features" className="py-16 sm:py-24 bg-slate-50/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-4xl mx-auto mb-14">
        <AnimateIn animation="fade-up" duration={500}>
          <span className="inline-block text-sm font-black uppercase tracking-[0.2em] text-primary-500 mb-4">
            Platform Features
          </span>
        </AnimateIn>
        <AnimateIn animation="fade-up" delay={80} duration={600}>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-secondary-900 tracking-tight mb-6">
            Everything HR needs, nothing it doesn't.
          </h2>
        </AnimateIn>
        <AnimateIn animation="fade-up" delay={160} duration={600}>
          <p className="text-lg text-secondary-500">
            FLOW OFF is a complete leave management toolkit designed for modern teams—from single startups to multi-department enterprises.
          </p>
        </AnimateIn>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature, i) => (
          <AnimateIn
            key={feature.title}
            animation="fade-up"
            delay={i * 80}
            duration={550}
          >
            <FeatureCard {...feature} />
          </AnimateIn>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
