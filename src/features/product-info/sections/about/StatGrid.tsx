import { AnimateIn } from "../../components/AnimateIn";

const stats = [
  { value: "10k+", label: "Employees Managed" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "< 2h", label: "Avg. Approval Time" },
  { value: "60%", label: "Reduction in HR Admin" },
];

const StatGrid = () => (
  <div className="grid grid-cols-2 gap-4">
    {stats.map((stat, i) => (
      <AnimateIn key={stat.label} animation="zoom-in" delay={i * 100} duration={550}>
        <div className="bg-secondary-900 rounded-2xl p-6 sm:p-8 h-full">
          <p className="text-3xl sm:text-4xl font-extrabold text-white mb-1">{stat.value}</p>
          <p className="text-sm text-secondary-400 font-medium">{stat.label}</p>
        </div>
      </AnimateIn>
    ))}
  </div>
);

export default StatGrid;
