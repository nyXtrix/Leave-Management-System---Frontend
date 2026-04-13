import React, { useState } from 'react';
import  PageLayout  from '@/components/layout/PageLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { cn } from '@/lib/utils';
import { ShieldCheck, Calendar, Zap, ClipboardCheck, ArrowLeft, ArrowRight, Save } from 'lucide-react';

const STEPS = [
  { id: 'general', title: 'General Info', icon: ShieldCheck, description: 'Policy name and target groups' },
  { id: 'accrual', title: 'Accrual Rules', icon: Calendar, description: 'How leaves are earned' },
  { id: 'restrictions', title: 'Restrictions', icon: Zap, description: 'Notice periods and limits' },
  { id: 'approval', title: 'Approval Flow', icon: ClipboardCheck, description: 'Levels and approvers' },
];

export function PolicyPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const collapsed = false;

  return (
    <PageLayout 
      title="Leave Policy Configuration" 
      subtitle="Define organizational rules, accruals, and approval workflows"
    >
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Horizontal Stepper */}
        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2" />
          <div 
            className="absolute top-1/2 left-0 h-0.5 bg-indigo-600 -translate-y-1/2 transition-all duration-500" 
            style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
          />
          
          <div className="relative flex justify-between">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div key={step.id} className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => setCurrentStep(index)}>
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 z-10",
                    isActive ? "bg-indigo-600 text-white shadow-glow-primary scale-110" : 
                    isCompleted ? "bg-indigo-100 text-indigo-600" : "bg-white border-2 border-slate-200 text-slate-400"
                  )}>
                    <Icon className="h-6 w-6" />
                  </div>
                  {!collapsed && (
                    <div className="text-center absolute -bottom-14 w-32">
                      <p className={cn("text-xs font-bold uppercase tracking-widest", isActive ? "text-indigo-600" : "text-slate-400")}>
                        {step.title}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-16">
          <Card className="border-none shadow-premium bg-white/80 backdrop-blur-sm overflow-hidden min-h-[500px] flex flex-col">
            <CardHeader className="border-b bg-slate-50/50 p-8">
               <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl font-black text-slate-900">{STEPS[currentStep].title}</CardTitle>
                    <p className="text-slate-500 mt-1">{STEPS[currentStep].description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Progress</p>
                    <p className="text-lg font-black text-indigo-600">{Math.round(progress)}%</p>
                  </div>
               </div>
            </CardHeader>
            
            <CardContent className="flex-1 p-8">
              {/* Step Content Rendering */}
              <div className="animate-reveal py-4">
                {currentStep === 0 && <GeneralInfoStep />}
                {currentStep === 1 && <AccrualRulesStep />}
                {currentStep === 2 && <RestrictionRulesStep />}
                {currentStep === 3 && <ApprovalWorkflowStep />}
              </div>
            </CardContent>

            <div className="border-t p-8 bg-slate-50/30 flex justify-between items-center">
              <Button 
                variant="ghost" 
                onClick={prevStep} 
                className={cn(currentStep === 0 && "invisible")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous Step
              </Button>
              
              <div className="flex gap-4">
                <Button variant="ghost" className="text-slate-500">Save Draft</Button>
                {currentStep === STEPS.length - 1 ? (
                  <Button className="gradient-primary shadow-glow-primary">
                    <Save className="mr-2 h-4 w-4" /> Finalize Policy
                  </Button>
                ) : (
                  <Button onClick={nextStep} className="gradient-primary shadow-glow-primary">
                    Next Step <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}

// Placeholder Step Components
const GeneralInfoStep = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 gap-8">
       <div className="space-y-2">
         <label className="text-sm font-bold text-slate-700">Policy Name</label>
         <input type="text" placeholder="e.g. Standard Corporate Policy" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
       </div>
       <div className="space-y-2">
         <label className="text-sm font-bold text-slate-700">Effective From</label>
         <input type="date" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
       </div>
    </div>
    <div className="space-y-2">
       <label className="text-sm font-bold text-slate-700">Applicable Employee Categories</label>
       <div className="grid grid-cols-3 gap-4">
         {['Full-Time', 'Contract', 'Probationary', 'Intern', 'Remote'].map(cat => (
           <label key={cat} className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-indigo-600 transition-colors cursor-pointer group">
             <input type="checkbox" className="w-5 h-5 rounded accent-indigo-600" />
             <span className="text-sm font-semibold text-slate-600 group-hover:text-indigo-600">{cat}</span>
           </label>
         ))}
       </div>
    </div>
  </div>
);

const AccrualRulesStep = () => (
  <div className="space-y-8">
    <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-100">
      <h4 className="font-bold text-indigo-900">How should leave balance increase?</h4>
      <p className="text-sm text-indigo-600">Choose the calculation method for this policy.</p>
    </div>
    <div className="grid grid-cols-2 gap-8">
       <label className="p-6 rounded-2xl border-2 border-indigo-600 bg-white shadow-soft cursor-pointer relative overflow-hidden">
          <div className="absolute top-4 right-4 h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-white" />
          </div>
          <h5 className="font-black text-slate-900">Monthly Accrual</h5>
          <p className="text-xs text-slate-500 mt-2">Leaves are credited on the 1st of every month. Best for scalable teams.</p>
       </label>
       <label className="p-6 rounded-2xl border-2 border-slate-100 bg-slate-50/50 cursor-pointer">
          <h5 className="font-black text-slate-400">Upfront Allocation</h5>
          <p className="text-xs text-slate-400 mt-2">Full quota is given at the start of the year. Simplest for management.</p>
       </label>
    </div>
  </div>
);

const RestrictionRulesStep = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-4">
        <h4 className="font-bold text-slate-800">Request Restrictions</h4>
        <div className="flex items-center justify-between p-4 rounded-xl border bg-white">
          <span className="text-sm font-semibold">Min. Notice Period</span>
          <div className="flex items-center gap-2">
             <input type="number" className="w-16 px-2 py-1 text-center border-b font-bold" defaultValue={3} />
             <span className="text-xs text-slate-400">Days</span>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 rounded-xl border bg-white">
          <span className="text-sm font-semibold">Max Continuous Days</span>
          <div className="flex items-center gap-2">
             <input type="number" className="w-16 px-2 py-1 text-center border-b font-bold" defaultValue={10} />
             <span className="text-xs text-slate-400">Days</span>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="font-bold text-slate-800">Advanced Settings</h4>
        <label className="flex items-center gap-3 p-4 rounded-xl border bg-white cursor-pointer hover:bg-slate-50 transition-colors">
          <input type="checkbox" className="w-5 h-5 accent-indigo-600" defaultChecked />
          <span className="text-sm font-semibold">Allow half-day requests</span>
        </label>
        <label className="flex items-center gap-3 p-4 rounded-xl border bg-white cursor-pointer hover:bg-slate-50 transition-colors">
          <input type="checkbox" className="w-5 h-5 accent-indigo-600" />
          <span className="text-sm font-semibold">Allow negative balances</span>
        </label>
      </div>
    </div>
  </div>
);

const ApprovalWorkflowStep = () => (
  <div className="space-y-8">
    <div className="space-y-4">
       <button className="w-full p-6 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-bold hover:border-indigo-600 hover:text-indigo-600 transition-all flex flex-col items-center gap-2 py-12">
          <Zap className="h-8 w-8" />
          Add Approval Level
       </button>
       
       <div className="relative group p-6 rounded-3xl bg-white border border-slate-100 shadow-soft">
          <div className="flex justify-between items-center">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-black">1</div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">Direct Manager</p>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Immediate Superior</p>
                </div>
             </div>
             <Button variant="ghost" size="sm" className="text-rose-500 hover:bg-rose-50 rounded-xl">Remove</Button>
          </div>
       </div>

       <div className="flex justify-center -my-2">
         <div className="w-px h-6 bg-slate-200" />
       </div>

       <div className="relative group p-6 rounded-3xl bg-white border border-slate-100 shadow-soft opacity-80">
          <div className="flex justify-between items-center">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-black">2</div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">Department Head</p>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Secondary Review</p>
                </div>
             </div>
             <Button variant="ghost" size="sm" className="text-rose-500 hover:bg-rose-50 rounded-xl">Remove</Button>
          </div>
       </div>
    </div>
  </div>
);
