import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  ShieldCheck, 
  Plus, 
  ChevronRight, 
  LayoutDashboard,
  Edit3,
  Trash2,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

const PERMISSION_MODULES = [
  { 
    id: 'policy', 
    label: 'Leave Policy', 
    description: 'Management of accrual rules, restrictions, and approval flows',
    actions: ['view', 'create', 'update', 'delete'] 
  },
  { 
    id: 'leave_mgmt', 
    label: 'Leave Management', 
    description: 'Setup of leave types, categories, and holiday calendars',
    actions: ['view', 'create', 'update', 'delete'] 
  },
  { 
    id: 'employee_mgmt', 
    label: 'Employee Management', 
    description: 'User invitations, profile management, and directory access',
    actions: ['view', 'create', 'update', 'delete'] 
  },
  { 
    id: 'organization', 
    label: 'Organization Settings', 
    description: 'Company info, branding, and billing management',
    actions: ['view', 'update'] 
  },
];

const MOCK_ROLES = [
  { 
    id: '1', 
    name: 'Super Admin', 
    permissions: {
      policy: ['view', 'create', 'update', 'delete'],
      leave_mgmt: ['view', 'create', 'update', 'delete'],
      employee_mgmt: ['view', 'create', 'update', 'delete'],
      organization: ['view', 'update']
    }
  },
  { 
    id: '2', 
    name: 'HR Manager', 
    permissions: {
      policy: ['view', 'update'],
      leave_mgmt: ['view', 'update'],
      employee_mgmt: ['view', 'create', 'update', 'delete'],
      organization: ['view']
    }
  }
];

export function RolesPage() {
  const [selectedRole, setSelectedRole] = useState(MOCK_ROLES[0]);

  const hasPermission = (moduleId: string, action: string) => {
    return (selectedRole.permissions as any)[moduleId]?.includes(action);
  };

  return (
    <PageLayout 
      title="Access Control" 
      subtitle="Define organizational roles and granular page-wise CRUD permissions"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
           <div className="space-y-4">
              <div className="flex justify-between items-center px-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Roles</p>
                <button className="text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-xl transition-all">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              <div className="space-y-2">
                {MOCK_ROLES.map((role) => (
                  <button 
                    key={role.id}
                    onClick={() => setSelectedRole(role)}
                    className={cn(
                      "w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 text-left group",
                      selectedRole.id === role.id ? "border-indigo-600 bg-indigo-50/50 shadow-soft" : "border-slate-100 bg-white hover:border-slate-200"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                        selectedRole.id === role.id ? "bg-indigo-600 text-white shadow-glow-primary" : "bg-slate-50 text-slate-400 group-hover:bg-slate-100"
                      )}>
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <div>
                        <p className={cn("font-bold text-sm", selectedRole.id === role.id ? "text-indigo-900" : "text-slate-700")}>{role.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Level Access</p>
                      </div>
                    </div>
                    <ChevronRight className={cn("h-4 w-4 transition-transform", selectedRole.id === role.id ? "text-indigo-600 translate-x-1" : "text-slate-300")} />
                  </button>
                ))}
              </div>
           </div>
        </div>

        <div className="lg:col-span-3">
            <Card className="border-none shadow-premium bg-white h-full relative overflow-hidden">
               {/* Fixed Header */}
              <div className="p-8 border-b bg-white flex flex-row items-center justify-between sticky top-0 z-10">
                <div>
                   <CardTitle className="text-2xl font-black text-slate-900">{selectedRole.name} Permissions</CardTitle>
                   <p className="text-sm text-slate-500 mt-1">Configure module-level create, read, update, and delete access</p>
                </div>
                <div className="flex gap-3">
                   <Button variant="ghost" className="text-slate-500 rounded-xl">Discard</Button>
                   <Button className="gradient-primary shadow-glow-primary rounded-xl px-8">Save Permissions</Button>
                </div>
              </div>

              <CardContent className="p-8 space-y-8 h-[calc(100vh-320px)] overflow-y-auto no-scrollbar">
                 <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-start gap-3">
                    <Info className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
                    <p className="text-xs text-orange-800 leading-relaxed">
                      <strong>Note:</strong> Basic individual permissions (Applying for self, viewing personal balance) and Managerial calendar access are <strong>mandatory</strong> and granted automatically based on reporting hierarchy.
                    </p>
                 </div>

                 <div className="space-y-6">
                 {PERMISSION_MODULES.map((module) => (
                   <div key={module.id} className="p-6 rounded-3xl border border-slate-100 bg-slate-50/30 space-y-6">
                      <div className="flex justify-between items-start">
                        <div>
                           <h4 className="font-black text-slate-900">{module.label}</h4>
                           <p className="text-xs text-slate-500 mt-1">{module.description}</p>
                        </div>
                        <Badge variant="outline" className="bg-white border-slate-200 text-[10px]">Module</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {module.actions.map((action) => {
                          const isEnabled = hasPermission(module.id, action);
                          return (
                            <label 
                              key={`${module.id}-${action}`} 
                              className={cn(
                                "flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer group",
                                isEnabled ? "border-indigo-600 bg-white shadow-soft" : "border-slate-100 bg-transparent grayscale"
                              )}
                            >
                               <div className={cn(
                                 "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                                 isEnabled ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-300"
                               )}>
                                 {action === 'view' && <LayoutDashboard className="h-5 w-5" />}
                                 {action === 'create' && <Plus className="h-5 w-5" />}
                                 {action === 'update' && <Edit3 className="h-5 w-5" />}
                                 {action === 'delete' && <Trash2 className="h-5 w-5" />}
                               </div>
                               <div className="text-center">
                                 <p className={cn("text-xs font-black uppercase tracking-widest", isEnabled ? "text-indigo-600" : "text-slate-400")}>{action}</p>
                                 <input type="checkbox" className="sr-only" checked={isEnabled} readOnly />
                               </div>
                            </label>
                          );
                        })}
                      </div>
                   </div>
                 ))}
                 </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </PageLayout>
  );
}

export default RolesPage;
