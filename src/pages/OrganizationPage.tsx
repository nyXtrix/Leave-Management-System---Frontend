import { Network, Users, Shield, Zap, Search, SlidersVertical } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import PageLayout from '@/components/layout/PageLayout';
import OrganizationManagement from '@/features/organization/OrganizationManagement';

const ORG_TREE = {
  name: 'Alex Johnson',
  role: 'SUPER_ADMIN',
  dept: 'Executive Directive',
  avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=020617&color=fff',
  children: [
    {
      name: 'James Chen',
      role: 'MANAGER',
      dept: 'Engineering',
      avatar: 'https://ui-avatars.com/api/?name=James+Chen&background=4f46e5&color=fff',
      children: [
        { name: 'Sarah Lee', role: 'EMPLOYEE', dept: 'Engineering', avatar: 'https://ui-avatars.com/api/?name=Sarah+Lee&background=f472b6&color=fff', children: [] },
      ],
    },
    {
      name: 'Mark Woods',
      role: 'MANAGER',
      dept: 'Product',
      avatar: 'https://ui-avatars.com/api/?name=Mark+Woods&background=0ea5e9&color=fff',
      children: [
        { name: 'Emily Davis', role: 'EMPLOYEE', dept: 'Design', avatar: 'https://ui-avatars.com/api/?name=Emily+Davis&background=f59e0b&color=fff', children: [] },
      ],
    },
    {
      name: 'Priya Sharma',
      role: 'MANAGER',
      dept: 'Customer Success',
      avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=8b5cf6&color=fff',
      children: [
        { name: 'Tom Fisher', role: 'EMPLOYEE', dept: 'Marketing', avatar: 'https://ui-avatars.com/api/?name=Tom+Fisher&background=10b981&color=fff', children: [] },
      ],
    },
  ],
};

interface OrgNode {
  name: string;
  role: string;
  dept: string;
  avatar: string;
  children: OrgNode[];
}

export function OrganizationPage() {
  return (
    // <div className="space-y-12 pb-10">
    //   <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
    //     <div className="space-y-2">
    //        <div className="flex items-center gap-3">
    //          <div className="px-3 py-1 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">Enterprise Architecture</div>
    //          <span className="text-xs font-bold text-slate-400">Structural Governance v2.0</span>
    //       </div>
    //       <h1 className="text-4xl font-black tracking-tight text-slate-900 flex items-center gap-4">
    //         <div className="h-12 w-12 gradient-primary rounded-2xl flex items-center justify-center shadow-glow-primary shrink-0 relative overflow-hidden group">
    //            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
    //            <Network className="h-6 w-6 text-white" />
    //         </div>
    //         Unit <span className="text-indigo-600">Architecture</span>
    //       </h1>
    //       <p className="text-slate-500 font-medium ml-1">Visualization of administrative reporting lines and cross-functional dependencies.</p>
    //     </div>
        
    //     <div className="flex items-center gap-3 shrink-0">
    //       <div className="relative group lg:w-64">
    //         <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
    //         <input placeholder="Search architecture..." className="h-11 w-full pl-10 pr-4 rounded-xl border border-slate-200/60 bg-white/50 focus:bg-white transition-all text-sm font-medium" />
    //       </div>
    //       <Button variant="outline" className="h-11 rounded-xl gap-2 font-bold text-xs uppercase tracking-widest"><SlidersVertical className="h-4 w-4" /> Parameters</Button>
    //       <Button variant="default" className="h-11 rounded-xl px-6 font-black uppercase tracking-widest text-xs shadow-glow-primary">Export Blueprint</Button>
    //     </div>
    //   </div>

    //   <div className="relative">
    //     {/* Decorative Grid Background for Org Chart */}
    //     <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
        
    //     <Card className="overflow-auto glass border-slate-200/60 shadow-premium rounded-[3rem] relative z-10 no-scrollbar">
    //       <CardContent className="py-24 px-12">
    //         <div className="flex justify-center min-w-max pb-12">
    //           <NodeCard node={ORG_TREE} />
    //         </div>
    //       </CardContent>
    //     </Card>
    //   </div>

    //   {/* Legend & Meta Stats */}
    //   <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
    //     <div className="flex items-center gap-8">
    //       {[
    //         { label: 'Executive', color: 'bg-slate-900', icon: Shield },
    //         { label: 'Management', color: 'bg-indigo-500', icon: Zap },
    //         { label: 'Operational', color: 'bg-slate-200', icon: Users },
    //       ].map((item) => (
    //         <div key={item.label} className="flex items-center gap-3 group">
    //           <div className={cn("h-4 w-4 rounded-lg shadow-sm transition-transform group-hover:scale-125", item.color)} />
    //           <div className="flex flex-col">
    //             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
        
    //     <div className="flex items-center gap-6 bg-white/50 px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
    //        <div className="flex items-center gap-2">
    //          <Users className="h-4 w-4 text-indigo-600" />
    //          <span className="text-sm font-black text-slate-900">1,248</span>
    //          <span className="text-[10px] font-bold text-slate-400 uppercase">Nodes</span>
    //        </div>
    //        <div className="w-px h-4 bg-slate-200" />
    //        <div className="flex items-center gap-2">
    //          <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-glow-success" />
    //          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Health Optimal</span>
    //        </div>
    //     </div>
    //   </div>
    // </div>
    <PageLayout title='Organization'>
      <OrganizationManagement/>
    </PageLayout>
  );
}
