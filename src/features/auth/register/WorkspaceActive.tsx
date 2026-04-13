import React from 'react';
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

interface WorkspaceActiveProps {
  companyName?: string;
}

const WorkspaceActive = ({ companyName }: WorkspaceActiveProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-40 pointer-events-none" />
      <div className="relative z-10 glass border-emerald-100 rounded-[2.5rem] p-12 max-w-xl w-full text-center space-y-8 shadow-premium animate-reveal">
        <div className="h-20 w-20 bg-emerald-50 border border-emerald-200 rounded-3xl mx-auto flex items-center justify-center text-emerald-500">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase">
            Workspace Active
          </h1>
          <p className="text-slate-500 font-medium leading-relaxed">
            Identity finalized for{" "}
            <span className="text-primary-600 font-black">
              {companyName}
            </span>
            . Your administrative console is now provisioned.
          </p>
        </div>
        <Button
          onClick={() => navigate("/")}
          className="w-full h-16 rounded-2xl text-sm font-black uppercase tracking-widest bg-slate-900 hover:bg-slate-800 shadow-glow-secondary border-none group transition-all active:scale-95"
        >
          Enter Portal
          <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default WorkspaceActive;
