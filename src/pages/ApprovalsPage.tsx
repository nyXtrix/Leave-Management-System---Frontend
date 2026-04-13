import { useState } from 'react';
import {
  ClipboardCheck, CheckCircle2, XCircle, Clock,
  AlertCircle, ChevronRight
} from 'lucide-react';
import { DataTable, type Column } from '@/components/tables/DataTable';
import { Badge } from '@/components/ui/Badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter
} from '@/components/ui/Dialog';
import { Textarea } from '@/components/ui/Textarea';
import { cn } from '@/lib/utils';
import type { LeaveRequest } from '@/types/leave';

const MOCK_PENDING: LeaveRequest[] = [
  { id: '1', employeeId: 'e1', employeeName: 'Sarah Lee', employeeAvatar: 'https://ui-avatars.com/api/?name=Sarah+Lee&background=f472b6&color=fff', department: 'Engineering', type: 'SICK', startDate: '2024-10-12', endDate: '2024-10-13', duration: 2, status: 'PENDING', appliedDate: '2024-10-10', notes: 'Severe flu, doctor recommended rest' },
  { id: '2', employeeId: 'e5', employeeName: 'Priya Sharma', employeeAvatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=a78bfa&color=fff', department: 'Customer Success', type: 'BEREAVEMENT', startDate: '2024-10-14', endDate: '2024-10-17', duration: 4, status: 'PENDING', appliedDate: '2024-10-13' },
  { id: '3', employeeId: 'e6', employeeName: 'Tom Fisher', employeeAvatar: 'https://ui-avatars.com/api/?name=Tom+Fisher&background=34d399&color=fff', department: 'Marketing', type: 'CASUAL', startDate: '2024-10-20', endDate: '2024-10-22', duration: 3, status: 'PENDING', appliedDate: '2024-10-14' },
];

const TYPE_LABELS: Record<string, string> = { SICK: 'Sick', CASUAL: 'Casual', CUSTOM: 'Custom', WFH: 'WFH', BEREAVEMENT: 'Bereavement' };

export function ApprovalsPage() {
  const [selected, setSelected] = useState<LeaveRequest | null>(null);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [loading, setLoading] = useState<'approve' | 'reject' | null>(null);
  const [requests, setRequests] = useState(MOCK_PENDING);

  const handleApprove = async (req: LeaveRequest) => {
    setLoading('approve');
    await new Promise((r) => setTimeout(r, 900));
    setRequests((prev) => prev.filter((r) => r.id !== req.id));
    setSelected(null);
    setLoading(null);
  };

  const handleReject = async () => {
    if (!selected) return;
    setLoading('reject');
    await new Promise((r) => setTimeout(r, 900));
    setRequests((prev) => prev.filter((r) => r.id !== selected.id));
    setSelected(null);
    setRejectOpen(false);
    setRejectReason('');
    setLoading(null);
  };

  const COLUMNS: Column<LeaveRequest>[] = [
    {
      key: 'employeeName', header: 'Staff Member', sortable: true,
      render: (_val, row) => (
        <div className="flex items-center gap-4 py-1">
          <div className="relative group/avatar">
            <Avatar className="h-11 w-11 rounded-2xl shadow-sm border-2 border-white ring-1 ring-slate-100 transition-transform group-hover/avatar:scale-105">
              <AvatarImage src={row.employeeAvatar} alt={row.employeeName} className="object-cover" />
              <AvatarFallback className="bg-indigo-50 text-indigo-700 font-black">{row.employeeName.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          <div>
            <p className="text-sm font-black text-slate-900 leading-none">{row.employeeName}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{row.department}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'type', header: 'Categorization', sortable: true,
      render: (val) => (
        <div className="flex items-center gap-2">
           <div className={cn(
             "h-2 w-2 rounded-full",
             val === 'SICK' ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]" : 
             val === 'CASUAL' ? "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]" : "bg-slate-400"
           )} />
           <span className="text-sm font-bold text-slate-700">{TYPE_LABELS[String(val)]}</span>
        </div>
      ),
    },
    {
      key: 'startDate', header: 'Execution Window',
      render: (_val, row) => (
        <div className="flex items-center gap-3">
          <div className="px-2.5 py-1.5 bg-slate-100/50 rounded-lg border border-slate-200/50">
            <span className="text-xs font-black text-slate-800">{new Date(row.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
          <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
          <div className="px-2.5 py-1.5 bg-slate-100/50 rounded-lg border border-slate-200/50">
            <span className="text-xs font-black text-slate-800">{new Date(row.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'duration', header: 'Volume',
      render: (val) => (
        <div className="flex items-baseline gap-0.5">
          <span className="text-lg font-black text-slate-900 leading-none">{String(val)}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase">Days</span>
        </div>
      ),
    },
    {
      key: 'status', header: 'Current Phase',
      render: () => (
        <Badge variant="warning" className="px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-widest gap-2 bg-amber-50 text-amber-600 border-amber-200/50 shadow-sm">
           <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
           Decision Pending
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-12 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3 mb-1">
             <Badge variant="outline" className="bg-indigo-50/50 text-indigo-700 border-indigo-100 font-black text-[10px] uppercase tracking-[0.2em] px-3 py-1">Governance Deck</Badge>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 flex items-center gap-4">
            <div className="h-12 w-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl shrink-0 group hover:scale-105 transition-transform duration-500">
               <ClipboardCheck className="h-6 w-6 text-white group-hover:rotate-12 transition-transform" />
            </div>
            Approval <span className="text-indigo-600">Pipeline</span>
          </h1>
          <p className="text-slate-500 font-medium ml-1">Critical personnel requests requiring administrative authorization.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white/50 p-2 rounded-2xl border border-slate-200/60 shadow-sm shrink-0">
           <div className="px-4 py-2 text-center border-r border-slate-200">
             <p className="text-2xl font-black text-slate-900 leading-none">{requests.length}</p>
             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Pending</p>
           </div>
           <div className="px-4 py-2 text-center">
             <p className="text-2xl font-black text-emerald-600 leading-none">98%</p>
             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-1">SLA Confirmed</p>
           </div>
        </div>
      </div>

      {/* Summary Analytics Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Awaiting Action', value: requests.length, sub: 'Immediate attention', icon: Clock, color: 'indigo' },
          { label: 'Authorized Today', value: 2, sub: '+15% from avg', icon: CheckCircle2, color: 'emerald' },
          { label: 'Denied Requests', value: 1, sub: 'Policy violation', icon: XCircle, color: 'rose' },
        ].map((s) => (
          <Card key={s.label} className="hover:shadow-glow-primary transition-all duration-300 border-slate-200/50 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 h-32 w-32 bg-${s.color}-500/5 blur-[50px] -mr-16 -mt-16 group-hover:scale-150 transition-transform`} />
            <CardContent className="flex items-center gap-5 py-6 px-7 relative z-10">
              <div className={cn(
                "h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-white/50",
                s.color === 'indigo' ? "bg-indigo-100 text-indigo-600" :
                s.color === 'emerald' ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
              )}>
                <s.icon className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <p className="text-3xl font-black text-slate-900 leading-none truncate">{s.value}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{s.label}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className={`h-1 w-1 rounded-full bg-${s.color}-500`} />
                  <p className="text-[9px] font-bold text-slate-400">{s.sub}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Approval Table Container */}
      <div className="glass rounded-[2rem] border-slate-200/60 shadow-premium overflow-hidden">
        <div className="px-8 py-7 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
           <div>
             <h3 className="text-lg font-black text-slate-900 leading-tight">Priority Authorization Queue</h3>
             <p className="text-xs font-medium text-slate-400 mt-0.5 uppercase tracking-wide">Audit-Log Enabled Workspace</p>
           </div>
           <div className="flex items-center gap-3">
             <Button variant="ghost" size="sm" className="h-9 px-4 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/50 border border-slate-200/50">Bulk Actions</Button>
           </div>
        </div>
        
        <div className="p-2">
          <DataTable
            data={requests}
            columns={COLUMNS}
            searchable
            searchKeys={['employeeName', 'department', 'type']}
            emptyMessage="All caught up! The pipeline is clear."
            onRowClick={(row) => setSelected(row)}
            actions={(row) => (
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                <Button
                  size="sm"
                  variant="success"
                  onClick={(e) => { e.stopPropagation(); void handleApprove(row); }}
                  className="h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:shadow-glow-success border-none"
                >
                  Authorize
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={(e) => { e.stopPropagation(); setSelected(row); setRejectOpen(true); }}
                  className="h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-none"
                >
                  Deny
                </Button>
              </div>
            )}
          />
        </div>
      </div>

      {/* Refined Detail Dialog */}
      <Dialog open={!!selected && !rejectOpen} onOpenChange={(o) => !o && setSelected(null)}>
        {selected && (
          <DialogContent className="sm:max-w-xl rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl glass-dark text-white">
            <div className="absolute top-0 right-0 h-48 w-48 bg-indigo-600/20 blur-[60px] pointer-events-none" />
            <div className="px-8 py-8 relative z-10">
              <DialogHeader className="mb-8">
                <div className="flex items-center justify-between">
                   <Badge className="bg-white/10 text-white border-white/10 font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-full">Case ID: {selected.id.toUpperCase()}</Badge>
                   <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">{new Date(selected.appliedDate).toLocaleDateString()}</p>
                </div>
                <DialogTitle className="text-3xl font-black tracking-tight mt-4">Authorization Detail</DialogTitle>
                <DialogDescription className="text-white/50 font-medium">Verify employee credentials and resource impact.</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="flex items-center gap-5 p-6 bg-white/5 rounded-3xl border border-white/5">
                  <Avatar className="h-16 w-16 rounded-2xl ring-4 ring-white/10">
                    <AvatarImage src={selected.employeeAvatar} />
                    <AvatarFallback>{selected.employeeName.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xl font-black tracking-tight">{selected.employeeName}</p>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mt-1">{selected.department} Unit</p>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge variant="ghost" className="bg-indigo-600/30 text-indigo-300 border-indigo-400/20 text-[9px] font-black">Full-Time</Badge>
                      <Badge variant="ghost" className="bg-emerald-600/30 text-emerald-300 border-emerald-400/20 text-[9px] font-black">Good Standing</Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    ['Categorization', TYPE_LABELS[selected.type]],
                    ['Temporal Span', `${selected.duration} Business Days`],
                    ['Effective Start', new Date(selected.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })],
                    ['Effective End', new Date(selected.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-white/5 rounded-2xl p-4 border border-white/5">
                      <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1.5">{k}</p>
                      <p className="font-bold text-base">{v}</p>
                    </div>
                  ))}
                </div>

                {selected.notes && (
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                    <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-2">Personnel Statement</p>
                    <p className="text-sm text-white/80 leading-relaxed font-medium italic">"{selected.notes}"</p>
                  </div>
                )}
              </div>

              <div className="mt-10 flex gap-3">
                <Button variant="ghost" onClick={() => setSelected(null)} className="h-14 flex-1 rounded-2xl text-white/60 hover:text-white hover:bg-white/10 font-black uppercase text-xs tracking-widest transition-all">Dismiss Case</Button>
                <Button variant="destructive" className="h-14 flex-1 rounded-2xl font-black uppercase text-xs tracking-widest bg-rose-600/20 text-rose-500 hover:bg-rose-600 hover:text-white shadow-xl border-none transition-all" onClick={() => { setRejectOpen(true); }}>Terminate</Button>
                <Button variant="success" className="h-14 flex-[2] rounded-2xl font-black uppercase text-xs tracking-widest shadow-glow-primary border-none transition-all" isLoading={loading === 'approve'} onClick={() => void handleApprove(selected)}>Finalize Authorization</Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectOpen} onOpenChange={(o) => { if (!o) { setRejectOpen(false); setRejectReason(''); } }}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Reject Leave Request</DialogTitle>
            <DialogDescription>Provide a reason — it will be shared with the employee.</DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <Textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. Critical sprint week, resource constraints..."
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setRejectOpen(false); setRejectReason(''); }}>Cancel</Button>
            <Button variant="destructive" icon={XCircle} isLoading={loading === 'reject'} onClick={() => void handleReject()} disabled={!rejectReason.trim()}>
              Confirm Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
