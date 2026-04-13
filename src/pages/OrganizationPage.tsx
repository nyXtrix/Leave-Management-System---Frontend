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

function NodeCard({ node, depth = 0 }: { node: OrgNode; depth?: number }) {
  const isRoot = depth === 0;
  const isManager = node.role === 'MANAGER' || node.role === 'SUPER_ADMIN';

  return (
    <div className="flex flex-col items-center relative">
      <div className={cn(
        "group flex flex-col items-center p-6 rounded-[2.5rem] border transition-all duration-500 cursor-pointer",
        isRoot ? "bg-slate-900 border-slate-800 text-white shadow-2xl scale-110 z-20 min-w-[220px]" :
          isManager ? "bg-white border-slate-200/50 shadow-premium min-w-[190px] hover:border-indigo-200 hover:shadow-glow-primary" :
          "bg-white/40 glass border-white/50 min-w-[170px] hover:scale-105"
        )}
      >
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full scale-150 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <Avatar className={cn(
            "rounded-2xl transition-transform duration-500 group-hover:scale-110",
            isRoot ? "h-16 w-16 shadow-glow-primary" : "h-14 w-14"
          )}>
            <AvatarImage src={node.avatar} alt={node.name} className="object-cover" />
            <AvatarFallback className="font-black">{node.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1.5 -right-1.5 bg-emerald-500 border-4 border-white h-5 w-5 rounded-full shadow-sm" />
        </div>
        
        <div className="text-center space-y-1">
          <p className={cn(
            "font-black tracking-tight leading-none",
            isRoot ? "text-white text-base" : "text-slate-900 text-sm"
          )}>
            {node.name}
          </p>
          <p className={cn(
            "text-[10px] font-bold uppercase tracking-[0.15em]",
            isRoot ? "text-indigo-400" : "text-slate-400"
          )}>
            {node.dept}
          </p>
        </div>

        <Badge
          className={cn(
            "mt-4 px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full border-2",
            isRoot ? "bg-indigo-600/20 text-white border-indigo-400/20" : 
            isManager ? "bg-indigo-50 text-indigo-700 border-indigo-100" : 
            "bg-slate-50 text-slate-500 border-slate-100"
          )}
        >
          {node.role.replace('_', ' ')}
        </Badge>
      </div>

      {node.children.length > 0 && (
        <div className="flex flex-col items-center">
          <div className="w-px h-10 bg-gradient-to-b from-indigo-500/50 to-transparent" />
          <div className="flex gap-10 items-start pt-2 relative">
            {/* SVG Link lines could go here for total cinematic effect but using borders/divs for simplicity */}
             <div className="absolute top-0 left-[20%] right-[20%] h-px bg-slate-200/50" />
            {node.children.map((child, idx) => (
              <div key={idx} className="flex flex-col items-center group/node">
                <div className="w-px h-10 bg-slate-200 group-hover/node:bg-indigo-400 transition-colors duration-500" />
                <NodeCard node={child} depth={depth + 1} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
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
