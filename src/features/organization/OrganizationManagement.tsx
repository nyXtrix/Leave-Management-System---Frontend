import React, { useState, useMemo } from 'react';
import { ChevronRight, ChevronLeft, Search, Users, Network, TrendingUp, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/Card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/contexts/AuthContext';
import ORG_DATA from '@/data/mockOrg.json';

interface OrgNode {
  id: string;
  name: string;
  role: string;
  dept: string;
  avatar: string;
  managerId: string | null;
  hasChildren: boolean;
}

const OrganizationManagement = () => {
  const { user } = useAuth();
  const [focusId, setFocusId] = useState<string>("1");
  const [searchQuery, setSearchQuery] = useState("");

  // Set initial focus to the logged-in user if they exist in our data
  React.useEffect(() => {
    if (user?.id && ORG_DATA.some(n => n.id === user.id)) {
      setFocusId(user.id);
    }
  }, [user]);

  // 1. Find current focused node
  const focusNode = useMemo(() => 
    ORG_DATA.find(n => n.id === focusId) as OrgNode, 
  [focusId]);

  // 2. Find manager of focused node
  const managerNode = useMemo(() => 
    ORG_DATA.find(n => n.id === focusNode?.managerId) as OrgNode, 
  [focusNode]);

  // 3. Find direct reports of focused node
  const reports = useMemo(() => 
    ORG_DATA.filter(n => n.managerId === focusId) as OrgNode[], 
  [focusId]);

  // 4. Generate Breadcrumbs (Path to Root)
  const breadcrumbs = useMemo(() => {
    const path: OrgNode[] = [];
    let current = focusNode;
    while (current) {
      path.unshift(current);
      current = ORG_DATA.find(n => n.id === current?.managerId) as OrgNode;
    }
    return path;
  }, [focusNode]);

  const handleFocus = (id: string) => {
    setFocusId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 animate-reveal">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/50 p-6 rounded-[2.5rem] border border-slate-200/60 shadow-premium glass">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 gradient-primary rounded-2xl flex items-center justify-center shadow-glow-primary">
            <Network className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Org Architecture</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Interactive Blueprint</p>
          </div>
        </div>

        <div className="relative group md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
          <input 
            type="text"
            placeholder="Search hierarchy..."
            className="h-12 w-full pl-12 pr-4 rounded-xl border-slate-200 bg-white/80 focus:bg-white focus:ring-4 focus:ring-primary-500/10 transition-all text-sm font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 px-2 overflow-x-auto no-scrollbar pb-2">
        {breadcrumbs.map((node, idx) => (
          <React.Fragment key={node.id}>
            <button
              onClick={() => handleFocus(node.id)}
              className={cn(
                "text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all whitespace-nowrap",
                node.id === focusId 
                  ? "bg-slate-900 text-white shadow-lg" 
                  : "text-slate-400 hover:text-slate-900 hover:bg-slate-100"
              )}
            >
              {node.name}
            </button>
            {idx < breadcrumbs.length - 1 && <ChevronRight className="h-3 w-3 text-slate-300 shrink-0" />}
          </React.Fragment>
        ))}
      </nav>

      {/* Hierarchy View */}
      <div className="relative flex flex-col items-center gap-12 py-10">
        
        {/* Manager (The Up-Link) */}
        {managerNode && (
          <div className="flex flex-col items-center group">
            <button 
              onClick={() => handleFocus(managerNode.id)}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-premium hover:border-primary-200 transition-all group-hover:-translate-y-1"
            >
              <Avatar className="h-10 w-10 border-2 border-white ring-2 ring-slate-100">
                <AvatarImage src={managerNode.avatar} />
                <AvatarFallback>{managerNode.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-xs font-black text-slate-900">{managerNode.name}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">{managerNode.role}</p>
              </div>
              <ChevronLeft className="h-4 w-4 text-slate-300 ml-2" />
            </button>
            <div className="h-12 w-px bg-slate-200" />
          </div>
        )}

        {/* Focused Hero Card */}
        <div className="relative z-10">
          <div className="absolute -inset-4 bg-primary-500/5 blur-3xl rounded-full animate-pulse" />
          <Card className="w-80 border-none shadow-premium rounded-[3rem] overflow-hidden bg-white ring-4 ring-slate-50 relative">
            <div className="h-2 bg-gradient-to-r from-primary-500 to-indigo-600" />
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full scale-125" />
                <Avatar className="h-24 w-24 border-4 border-white shadow-2xl rounded-[2rem]">
                  <AvatarImage src={focusNode?.avatar} />
                  <AvatarFallback className="font-black text-xl">{focusNode?.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 h-6 w-6 rounded-full border-4 border-white shadow-sm" />
              </div>
              
              <h3 className="text-xl font-black text-slate-900 tracking-tight">{focusNode?.name}</h3>
              <p className="text-xs font-black text-primary-500 uppercase tracking-[0.2em] mt-1">{focusNode?.role}</p>
              
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Badge className="bg-slate-50 text-slate-500 border-none px-3 py-1 text-[10px] font-black uppercase">
                  {focusNode?.dept}
                </Badge>
                <Badge variant="outline" className="border-slate-100 text-slate-400 px-3 py-1 text-[10px] font-black uppercase">
                  Level {breadcrumbs.length}
                </Badge>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-50 w-full grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reports</p>
                  <p className="text-xl font-black text-slate-900 mt-1">{reports.length}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Performance</p>
                  <p className="text-xl font-black text-emerald-500 mt-1">98%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Grid (Drill-Down Links) */}
        {reports.length > 0 && (
          <div className="w-full flex flex-col items-center gap-8">
            <div className="h-12 w-px bg-slate-200" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl px-4">
              {reports.map((report) => (
                <button
                  key={report.id}
                  onClick={() => handleFocus(report.id)}
                  className="group relative flex items-center gap-4 p-5 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:border-primary-500/20 hover:shadow-premium transition-all text-left"
                >
                  <Avatar className="h-12 w-12 rounded-2xl group-hover:scale-110 transition-transform">
                    <AvatarImage src={report.avatar} />
                    <AvatarFallback>{report.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-slate-900 truncate">{report.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">{report.role}</p>
                  </div>
                  {report.hasChildren && (
                    <div className="h-8 w-8 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-all">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* No Reports Placeholder */}
        {reports.length === 0 && (
          <div className="text-center py-10 opacity-50 grayscale transition-all hover:grayscale-0">
            <div className="h-16 w-16 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-slate-400" />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Individual Contributor</p>
          </div>
        )}
      </div>

      {/* Growth & KPI Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Span of Control', value: '1:8', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Hierarchy Depth', value: '4 Levels', icon: Network, color: 'text-primary-500', bg: 'bg-primary-50' },
          { label: 'Retention Rate', value: '94%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((stat) => (
          <div key={stat.label} className="flex items-center gap-4 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
            <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shadow-sm", stat.bg)}>
              <stat.icon className={cn("h-6 w-6", stat.color)} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationManagement;