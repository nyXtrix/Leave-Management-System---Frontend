import { useState } from 'react';
import { Users, Plus, Pencil, Trash2, Mail, Building2, ShieldCheck, Search, Filter, MoreHorizontal } from 'lucide-react';
import { DataTable, type Column } from '@/components/tables/DataTable';
import { Badge } from '@/components/ui/Badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import type { Employee } from '@/types/employee';

const MOCK_EMPLOYEES: Employee[] = [
  { id: 'e1', name: 'Sarah Lee', email: 'sarah@acme.com', department: 'Engineering', position: 'Senior Engineer', role: 'EMPLOYEE', avatar: 'https://ui-avatars.com/api/?name=Sarah+Lee&background=f472b6&color=fff', joinDate: '2022-03-01', status: 'ACTIVE', tenantId: 'acme-01' },
  { id: 'e2', name: 'Mark Woods', email: 'mark@acme.com', department: 'Product', position: 'Product Manager', role: 'MANAGER', avatar: 'https://ui-avatars.com/api/?name=Mark+Woods&background=38bdf8&color=fff', joinDate: '2021-07-15', status: 'ACTIVE', tenantId: 'acme-01' },
  { id: 'e3', name: 'Emily Davis', email: 'emily@acme.com', department: 'Design', position: 'UI/UX Designer', role: 'EMPLOYEE', avatar: 'https://ui-avatars.com/api/?name=Emily+Davis&background=fbbf24&color=fff', joinDate: '2023-01-10', status: 'ACTIVE', tenantId: 'acme-01' },
  { id: 'e4', name: 'James Chen', email: 'james@acme.com', department: 'Engineering', position: 'Tech Lead', role: 'MANAGER', avatar: 'https://ui-avatars.com/api/?name=James+Chen&background=4ade80&color=fff', joinDate: '2020-05-20', status: 'ACTIVE', tenantId: 'acme-01' },
  { id: 'e5', name: 'Priya Sharma', email: 'priya@acme.com', department: 'Customer Success', position: 'CS Manager', role: 'MANAGER', avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=a78bfa&color=fff', joinDate: '2022-09-01', status: 'ACTIVE', tenantId: 'acme-01' },
  { id: 'e6', name: 'Tom Fisher', email: 'tom@acme.com', department: 'Marketing', position: 'Growth Lead', role: 'EMPLOYEE', avatar: 'https://ui-avatars.com/api/?name=Tom+Fisher&background=34d399&color=fff', joinDate: '2023-06-12', status: 'INACTIVE', tenantId: 'acme-01' },
];

const DEPT_STATS = [
  { name: 'Engineering', count: 42, icon: '⚙️', color: 'indigo' },
  { name: 'Product', count: 12, icon: '📦', color: 'emerald' },
  { name: 'Design', count: 8, icon: '🎨', color: 'rose' },
  { name: 'Growth', count: 15, icon: '🚀', color: 'amber' },
  { name: 'Ops', count: 5, icon: '🤝', color: 'slate' },
];

export function EmployeesPage() {
  const [search, setSearch] = useState('');

  const COLUMNS: Column<Employee>[] = [
    {
      key: 'name', header: 'Staff Persona', sortable: true,
      render: (_val, row) => (
        <div className="flex items-center gap-4 py-1.5">
          <div className="relative group/avatar">
            <Avatar className="h-12 w-12 rounded-2xl shadow-sm border-2 border-white ring-1 ring-slate-100 transition-transform group-hover/avatar:scale-105">
              <AvatarImage src={row.avatar} alt={row.name} className="object-cover" />
              <AvatarFallback className="bg-slate-50 text-slate-400 font-bold">{row.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className={cn(
              "absolute -bottom-1 -right-1 h-4 w-4 border-2 border-white rounded-full",
              row.status === 'ACTIVE' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-300'
            )} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-black text-slate-900 leading-none truncate">{row.name}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 truncate group-hover:text-indigo-600 transition-colors">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'department', header: 'Department', sortable: true,
      render: (val) => (
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm">
            <Building2 className="h-4 w-4 text-slate-400" />
          </div>
          <span className="text-sm font-black text-slate-700">{String(val)}</span>
        </div>
      ),
    },
    {
      key: 'position', header: 'Designation',
      render: (val) => <span className="text-sm font-medium text-slate-500 tracking-tight">{String(val)}</span>,
    },
    {
      key: 'role', header: 'Access Tier', sortable: true,
      render: (val) => {
        const r = String(val);
        const isManager = r === 'MANAGER' || r === 'ADMIN';
        return (
          <Badge className={cn(
            "px-2.5 py-1 rounded-lg font-black text-[9px] uppercase tracking-widest gap-1.5",
            isManager ? "bg-indigo-50 text-indigo-700 border-indigo-100" : "bg-slate-50 text-slate-500 border-slate-100"
          )}>
            {isManager && <ShieldCheck className="h-3 w-3" />}
            {r}
          </Badge>
        );
      },
    },
    {
      key: 'status', header: 'Registry Status', sortable: true,
      render: (val) => (
        <Badge variant={val === 'ACTIVE' ? 'success' : 'default'} className="px-3 py-1 font-black text-[9px] uppercase tracking-[0.2em] rounded-full">
          {String(val)}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-12 pb-10">
      {/* Dynamic Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">Member Directory</div>
             <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
             <span className="text-xs font-bold text-slate-400">v4.2 Enterprise</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 flex items-center gap-4">
            <div className="h-12 w-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-xl shrink-0 group hover:scale-105 transition-transform duration-500">
               <Users className="h-6 w-6 text-white group-hover:rotate-12 transition-transform" />
            </div>
            Personnel <span className="text-indigo-600">Assets</span>
          </h1>
          <p className="text-slate-500 font-medium ml-1">Real-time management of your organization's human capital and permissions.</p>
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden lg:flex items-center gap-4 bg-white/50 p-1.5 rounded-2xl border border-slate-200/60 shadow-sm mr-2">
             <div className="px-4 py-1.5 border-r border-slate-200/60">
                <p className="text-xs font-black text-slate-400 uppercase tracking-tighter">Total Staff</p>
                <p className="text-xl font-black text-slate-900 leading-none mt-1">1,248</p>
             </div>
             <div className="px-4 py-1.5">
                <p className="text-xs font-black text-slate-400 uppercase tracking-tighter">Growth</p>
                <p className="text-xl font-black text-emerald-600 leading-none mt-1">+12.4%</p>
             </div>
          </div>
          <Button variant="default" icon={Plus} size="lg" className="rounded-2xl h-14 shadow-glow-primary font-black uppercase tracking-widest text-xs px-8">Onboard Member</Button>
        </div>
      </div>

      {/* Grid of Department Visual Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {DEPT_STATS.map((d) => (
          <Card key={d.name} className="group relative overflow-hidden h-44 rounded-[2rem] border-slate-200/50 hover:border-indigo-200 hover:shadow-premium transition-all duration-500">
            <div className={cn(
               "absolute top-0 right-0 h-32 w-32 blur-[60px] opacity-10 transition-transform group-hover:scale-150 duration-700",
               `bg-${d.color}-500/20`
            )} />
            <CardContent className="h-full flex flex-col justify-between p-7 relative z-10">
               <div className="flex justify-between items-start">
                  <div className="h-12 w-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-500">
                    {d.icon}
                  </div>
                  <Badge variant="ghost" className="bg-slate-100/50 text-[10px] font-black">{d.count} STAFF</Badge>
               </div>
               <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">{d.name}</h4>
                  <p className="text-[10px] font-bold text-slate-300 mt-1">Personnel Unit</p>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Employee Registry — Premium Table Container */}
      <div className="glass rounded-[2.5rem] border-slate-200/60 shadow-premium overflow-hidden">
        <div className="px-10 py-8 border-b border-slate-100 bg-slate-50/50 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
           <div className="space-y-1">
             <h3 className="text-xl font-black text-slate-900 leading-tight">Master Personnel Registry</h3>
             <p className="text-xs font-medium text-slate-400 uppercase tracking-[0.15em] flex items-center gap-2 text-indigo-600">
                <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
                Live Synchronization Active
             </p>
           </div>
           
           <div className="flex items-center gap-3">
              <div className="relative group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search staff registry..." 
                  className="h-11 w-full lg:w-72 pl-10 pr-4 rounded-xl border border-slate-200/60 bg-white/50 focus:bg-white focus:ring-4 focus:ring-indigo-100/50 transition-all text-sm font-medium"
                />
              </div>
              <Button variant="ghost" icon={Filter} className="h-11 rounded-xl bg-white border border-slate-200/60 px-4 font-bold text-xs">Structural Filters</Button>
           </div>
        </div>
        
        <div className="p-3">
          <DataTable
            data={MOCK_EMPLOYEES}
            columns={COLUMNS}
            pageSize={8}
            onRowClick={(row) => console.log('Profile view:', row.id)}
            actions={(row) => (
              <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                <button className="h-9 w-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all">
                  <Mail className="h-4 w-4" />
                </button>
                <button className="h-9 w-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-amber-600 hover:bg-amber-50 border border-transparent hover:border-amber-100 transition-all">
                  <Pencil className="h-4 w-4" />
                </button>
                <button className="h-9 w-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all">
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="w-px h-5 bg-slate-100 mx-1" />
                <button className="h-9 w-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-slate-50 transition-all">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}
