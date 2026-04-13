import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Mail, Info, Clock, CheckCircle2 } from 'lucide-react';
import UserOnboardManagement from '@/features/user-onboard/UserOnboardManagement';

export function InviteUserPage() {
  return (
    <PageLayout 
      title="Team Expansion" 
      subtitle="Onboard new admins, manager and employees to your organization workspace."
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-20">
        {/* Main Onboarding Flow */}
        <div className="lg:col-span-3">
           <UserOnboardManagement />
        </div>

        {/* Status & Sidebar Information */}
        <div className="space-y-6">
           {/* Guidelines Card */}
           <div className="p-8 rounded-[32px] bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-32 h-32 bg-primary-500/20 rounded-full blur-3xl transition-all group-hover:bg-primary-500/30" />
              <Info className="h-8 w-8 mb-6 text-primary-400" />
              <h3 className="text-xl font-black leading-tight tracking-tight">Onboarding <span className="text-primary-400">Policy</span></h3>
              <ul className="mt-8 space-y-5">
                {[
                  "Secure unique invitation links",
                  "Auto-seeded leave balances",
                  "Real-time chart integration",
                  "Role-based permission sets"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm font-bold text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-primary-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
           </div>

           {/* Active Queue Card */}
           <Card className="border-none shadow-premium bg-white/80 backdrop-blur-sm rounded-[2rem] overflow-hidden">
              <CardHeader className="p-6 border-b border-slate-50 bg-slate-50/50">
                <CardTitle className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] flex items-center justify-between">
                  Recently Sent
                  <span className="h-5 px-2 bg-slate-900 text-white rounded-full text-[9px] flex items-center">02</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                 {[
                   { email: "sarah.dev@company.com", time: "2m ago", initial: "S" },
                   { email: "mike.mgr@company.com", time: "1h ago", initial: "M" }
                 ].map((invite, i) => (
                   <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-all group animate-reveal">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center font-black text-xs shadow-sm ring-1 ring-primary-100 uppercase">
                          {invite.initial}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] font-black text-slate-800 truncate">{invite.email}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <Clock className="h-3 w-3 text-slate-400" />
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">{invite.time}</p>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-300 hover:text-primary-600 hover:bg-primary-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                        <Mail className="h-4 w-4" />
                      </Button>
                   </div>
                 ))}
                 
                 <Button variant="outline" className="w-full mt-2 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest border-slate-100 text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all">
                   View Invitation History
                 </Button>
              </CardContent>
           </Card>
        </div>
      </div>
    </PageLayout>
  );
}

export default InviteUserPage;
