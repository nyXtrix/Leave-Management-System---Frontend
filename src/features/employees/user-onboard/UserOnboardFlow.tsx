import { Mail, KeyRound, LogIn, CheckCircle2, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Mail,
    color: "text-violet-600",
    bg: "bg-violet-50",
    ring: "ring-violet-100",
    title: "Invitation Sent",
    description: "Employee receives a secure invitation link.",
  },
  {
    icon: KeyRound,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    ring: "ring-indigo-100",
    title: "Set Password",
    description: "Employee clicks the link and creates their account password.",
  },
  {
    icon: LogIn,
    color: "text-sky-600",
    bg: "bg-sky-50",
    ring: "ring-sky-100",
    title: "First Login",
    description: "Employee logs in and their profile is fully activated in the system.",
  },
  {
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    ring: "ring-emerald-100",
    title: "Ready to Go",
    description: "Leave balances seeded, permissions applied, employee is onboarded.",
  },
];

const UserOnboardFlow = () => {
  return (
    <div className="rounded-xl border border-slate-100 bg-white shadow-sm p-6">
      <div className="space-y-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === steps.length - 1;
          return (
            <div key={index} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${step.bg} ring-1 ${step.ring}`}
                >
                  <Icon className={`h-4 w-4 ${step.color}`} />
                </div>
                {!isLast && (
                  <div className="w-px flex-1 bg-slate-100 my-1" />
                )}
              </div>

              <div className={`pb-3 ${!isLast ? "border-b border-slate-50" : ""}`}>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-secondary-800">{step.title}</p>
                  <span className="text-[10px] font-bold text-slate-300 uppercase">
                    Step {index + 1}
                  </span>
                </div>
                <p className="text-[11px] text-secondary-400 font-medium leading-relaxed mt-0.5">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserOnboardFlow;