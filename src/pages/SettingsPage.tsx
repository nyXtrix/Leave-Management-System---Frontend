import {
  Settings,
  Bell,
  Shield,
  Building2,
  Palette,
  Key,
  ShieldCheck,
  Sliders,
  Save,
  RotateCcw,
  Download,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/common/inputs/Input";
import { Badge } from "@/components/ui/Badge";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

function Toggle({ defaultChecked = false }: { defaultChecked?: boolean }) {
  return (
    <SwitchPrimitive.Root
      defaultChecked={defaultChecked}
      className={cn(
        "peer inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden",
        "data-[state=checked]:bg-indigo-600 data-[state=unchecked]:bg-slate-200",
      )}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-premium ring-0 transition-transform duration-300 ease-spring",
          "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

const SECTIONS = [
  {
    icon: Building2,
    title: "Organization Identity",
    description: "Corporate branding and tenant configuration",
    accent: "indigo",
    fields: [
      {
        label: "Corporate Entity Name",
        defaultValue: "ACME Corporation / Global",
        type: "text",
      },
      {
        label: "System Tenant Identifier",
        defaultValue: "acme-01-prod",
        type: "text",
      },
      {
        label: "Administrator Contact",
        defaultValue: "ops@acme.com",
        type: "email",
      },
      {
        label: "Operational Timezone",
        defaultValue: "Asia/Kolkata (IST)",
        type: "text",
      },
    ],
  },
  {
    icon: ShieldCheck,
    title: "Governance & Security",
    description: "Access control and leave enforcement policies",
    accent: "emerald",
    toggles: [
      {
        label: "Executive Self-Authorization",
        description:
          "Allow tier-1 managers to self-approve micro-leaves (≤ 0.5 day)",
        on: false,
      },
      {
        label: "Escalation Protocol",
        description:
          "Auto-escalate requests if no response within 48-hour SLA window",
        on: true,
      },
      {
        label: "Critical Resource Coverage",
        description: "Prevent leave approval if team capacity drops below 60%",
        on: true,
      },
      {
        label: "Legacy Request Rectification",
        description: "Allow employee leave cancellation within 24h of approval",
        on: false,
      },
    ],
  },
  {
    icon: Bell,
    title: "Dispatch & Notifications",
    description: "Communication protocols for system events",
    accent: "amber",
    toggles: [
      {
        label: "Real-time SMTP Alerts",
        description: "Instant email dispatches for new ingress leave requests",
        on: true,
      },
      {
        label: "Synoptic Daily Digest",
        description: "Comprehensive personnel summary at 09:00 UTC daily",
        on: true,
      },
      {
        label: "Slack Webhook Integration",
        description: "Synchronize events to organization #governance channel",
        on: false,
      },
      {
        label: "SMS Carrier Confirmation",
        description:
          "Deliver short-message confirmation for status transitions",
        on: false,
      },
    ],
  },
];

export function SettingsPage() {
  return (
    <div className="space-y-12 pb-16 max-w-4xl">
      {/* Header with quick stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
              Control Plane
            </div>
            <span className="text-xs font-bold text-slate-400">
              Environment: Production (v5.0)
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 flex items-center gap-4">
            <div className="h-12 w-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-xl shrink-0 group">
              <Settings className="h-6 w-6 text-white group-hover:rotate-180 transition-transform duration-700" />
            </div>
            System <span className="text-indigo-600">Configuration</span>
          </h1>
          <p className="text-slate-500 font-medium ml-1">
            Define global behavioral parameters and organizational boundaries.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/50 p-2 rounded-2xl border border-slate-200/60 shadow-sm shrink-0">
          <div className="px-4 py-2 text-center border-r border-slate-200">
            <p className="text-2xl font-black text-slate-900 leading-none">
              14
            </p>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-1">
              Active Rules
            </p>
          </div>
          <div className="px-4 py-2 text-center">
            <p className="text-2xl font-black text-emerald-600 leading-none">
              Healthy
            </p>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-1">
              System State
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {SECTIONS.map((section) => (
          <Card
            key={section.title}
            className="glass rounded-[2rem] border-slate-200/60 shadow-premium overflow-hidden border-l-4"
            style={{ borderLeftColor: `var(--${section.accent}-500)` }}
          >
            <CardHeader className="px-8 py-8 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "h-12 w-12 rounded-2xl flex items-center justify-center shadow-sm border border-white/50",
                      section.accent === "indigo"
                        ? "bg-indigo-100 text-indigo-600"
                        : section.accent === "emerald"
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-amber-100 text-amber-600",
                    )}
                  >
                    <section.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-black tracking-tight text-slate-900">
                      {section.title}
                    </CardTitle>
                    <CardDescription className="text-xs font-medium text-slate-400 uppercase tracking-wide mt-0.5">
                      {section.description}
                    </CardDescription>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="bg-white/50 text-[10px] font-black tracking-widest px-3 py-1"
                >
                  MANAGED
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="px-8 py-8 space-y-8">
              {section.fields && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {section.fields.map((f) => (
                    <div key={f.label} className="space-y-2">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                        {f.label}
                      </Label>
                      <Input
                        type={f.type}
                        defaultValue={f.defaultValue}
                        className="h-12 rounded-xl bg-white/50 border-slate-200/60 focus:bg-white focus:ring-4 focus:ring-indigo-100/50 transition-all font-medium text-sm"
                      />
                    </div>
                  ))}
                </div>
              )}
              {section.toggles && (
                <div className="space-y-4">
                  {section.toggles.map((t, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-5 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-indigo-100 hover:bg-white transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="h-5 w-5 mt-0.5 rounded-full border-2 border-slate-200 group-hover:border-indigo-400 flex items-center justify-center transition-colors">
                          <div className="h-1.5 w-1.5 rounded-full bg-slate-200 group-hover:bg-indigo-400" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800 tracking-tight">
                            {t.label}
                          </p>
                          <p className="text-xs font-medium text-slate-400 mt-0.5 leading-relaxed">
                            {t.description}
                          </p>
                        </div>
                      </div>
                      <Toggle defaultChecked={t.on} />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {/* Specialized Leave Policy Visual Rules */}
        <Card className="glass rounded-[2rem] border-slate-200/60 shadow-premium overflow-hidden">
          <CardHeader className="px-8 py-8 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-sm border border-white/50">
                <Palette className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-black tracking-tight text-slate-900">
                  Leave Quota Framework
                </CardTitle>
                <CardDescription className="text-xs font-medium text-slate-400 uppercase tracking-wide mt-0.5">
                  Define organization-wide personnel limits
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-8 py-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { label: "Casual Allowance", days: 18, color: "indigo" },
                { label: "Medical Reserve", days: 12, color: "rose" },
                { label: "WFH Eligibility", days: 5, color: "emerald" },
                { label: "Rollover Ceiling", days: 5, color: "amber" },
              ].map((p) => (
                <div
                  key={p.label}
                  className="group relative bg-white border border-slate-100 rounded-3xl p-6 text-center hover:shadow-premium hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className={`absolute top-0 left-1/2 -translate-x-1/2 h-1 w-12 rounded-full bg-${p.color}-500/30 group-hover:bg-${p.color}-500 transition-colors`}
                  />
                  <p className="text-4xl font-black text-slate-900 tracking-tighter leading-none">
                    {p.days}
                  </p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4 leading-tight">
                    {p.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50 flex items-center gap-3">
              <Sliders className="h-5 w-5 text-indigo-600" />
              <p className="text-xs font-bold text-indigo-700 italic">
                Advanced algorithm computes these quotas based on seniority and
                employment tier.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Refined Danger zone */}
        <Card className="rounded-[2.5rem] border-rose-200/60 bg-rose-50/10 overflow-hidden relative">
          <div className="absolute top-0 right-0 h-48 w-48 bg-rose-500/5 blur-[80px] pointer-events-none" />
          <CardHeader className="px-8 py-8 border-b border-rose-100/50 bg-rose-50/30">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 shadow-sm border border-white">
                <Key className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-black tracking-tight text-rose-900">
                  Restricted Operations
                </CardTitle>
                <CardDescription className="text-xs font-bold text-rose-500/60 uppercase tracking-widest mt-0.5">
                  Authoritative system resets
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-8 py-8 space-y-6">
            {[
              {
                title: "Global Quota Synchronization",
                desc: "Reset all active personnel balances to baseline. Irreversible operation.",
                btn: "Execute Sync",
                icon: RotateCcw,
                variant: "destructive",
              },
              {
                title: "Data Sovereignty Export",
                desc: "Generate a comprehensive system dump including audit logs in encrypted CSV.",
                btn: "Download Manifest",
                icon: Download,
                variant: "outline",
              },
            ].map((op, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl border border-rose-100 bg-white/50 hover:bg-white transition-all shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-rose-50 group-hover:text-rose-600 transition-colors">
                    <op.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[13px] font-black text-slate-900 leading-none">
                      {op.title}
                    </p>
                    <p className="text-[11px] font-medium text-slate-400 mt-2 max-w-[400px] leading-relaxed">
                      {op.desc}
                    </p>
                  </div>
                </div>
                <Button
                  variant={op.variant as any}
                  size="sm"
                  className={cn(
                    "px-6 rounded-xl font-black uppercase text-[10px] tracking-widest h-11",
                    op.variant === "outline" &&
                      "border-slate-200 text-slate-700 hover:bg-slate-50",
                  )}
                >
                  {op.btn}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Final Actions Block */}
        <div className="flex items-center justify-between gap-6 px-4 py-8 bg-slate-900 rounded-[2.5rem] shadow-premium relative overflow-hidden group">
          <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay opacity-50 pointer-events-none" />
          <div className="relative z-10 hidden md:block">
            <h4 className="text-white font-black tracking-tight flex items-center gap-2">
              <Shield className="h-4 w-4 text-indigo-400" />
              Unsaved Changes Pending
            </h4>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">
              Personnel parameters have been modified
            </p>
          </div>
          <div className="flex gap-4 w-full md:w-auto relative z-10">
            <Button
              variant="ghost"
              className="h-14 flex-1 md:px-8 rounded-2xl text-white/50 hover:text-white hover:bg-white/10 font-black uppercase text-xs tracking-widest transition-all"
            >
              Discard Changes
            </Button>
            <Button
              variant="default"
              className="h-14 flex-[1.5] md:px-10 rounded-2xl font-black uppercase text-xs tracking-widest shadow-glow-primary border-none transition-all group-hover:scale-105"
              icon={Save}
            >
              Deploy Configuration
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
