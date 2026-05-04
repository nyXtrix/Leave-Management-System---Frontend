import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, Plus, Building2, ChevronDown, CalendarDays, ShieldCheck, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar';
import { useAuth } from '@/contexts/AuthContext';
import { ApplyLeaveDialog } from '@/components/common/ApplyLeaveDialog';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { User, Settings, LogOut } from 'lucide-react';

const MOCK_NOTIFICATIONS = [
  { id: '1', title: 'Leave Approved', body: 'Your casual leave for Apr 5 was approved.', time: '2m ago', read: false },
  { id: '2', title: 'New Request', body: 'Sarah Lee applied for 2 days sick leave.', time: '1h ago', read: false },
  { id: '3', title: 'Policy Update', body: 'Q4 leave rollover policy has been updated.', time: '3h ago', read: true },
];

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);
  const [search, setSearch] = useState('');

  const unread = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  const displayName = user ? `${user.firstName} ${user.lastName}` : 'User';

  function getInitials(first: string, last: string) {
    return (first[0] + last[0]).toUpperCase();
  }


  return (
    <>
      <header className="h-24 px-10 border-b border-slate-200/50 bg-white/70 backdrop-blur-3xl flex items-center gap-8 sticky top-0 z-40 shadow-sm">
        {/* Tenant indicator / Organization Switcher */}
        <div className="flex items-center gap-3 bg-white/50 hover:bg-white transition-all cursor-pointer px-5 py-3 rounded-2xl border border-slate-200/60 shadow-sm shrink-0 group">
          <div className="h-9 w-9 gradient-primary rounded-xl flex items-center justify-center text-white shadow-glow-primary group-hover:scale-110 transition-transform">
            <Building2 className="h-4.5 w-4.5" />
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-70">Workspace</span>
            <span className="text-sm font-black text-slate-900 flex items-center gap-1.5 leading-none mt-1">
              {user?.tenantName ?? 'ACME Corp'}
              <ChevronDown className="h-3.5 w-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            </span>
          </div>
        </div>

        {/* Global Search — Enhanced UI */}
        <div className="relative flex-1 max-w-xl group hidden md:block">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center">
            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search enterprise... (⌘K)"
            className="w-full h-12 bg-slate-100/50 hover:bg-white focus:bg-white border-2 border-transparent focus:border-indigo-100 focus:ring-4 focus:ring-indigo-50/50 rounded-2xl pl-12 pr-12 text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {search ? (
              <button
                onClick={() => setSearch('')}
                className="p-1 h-6 w-6 flex items-center justify-center bg-slate-200 hover:bg-slate-300 text-slate-500 rounded-lg transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            ) : (
              <div className="px-1.5 py-0.5 rounded border border-slate-200 bg-white text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                Esc
              </div>
            )}
          </div>
        </div>

        {/* Action Center */}
        <div className="flex items-center gap-4 ml-auto shrink-0">
          {/* Quick Info (Large screens) */}
          <div className="hidden xl:flex items-center gap-6 px-4 bg-slate-50/80 rounded-2xl h-12 border border-slate-200/50">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                <CalendarDays className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-900 leading-none">14.5D</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">Casual</p>
              </div>
            </div>
            <div className="w-px h-6 bg-slate-200" />
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 ring-4 ring-indigo-50">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-900 leading-none">3 Actions</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">Required</p>
              </div>
            </div>
          </div>

          <div className="w-px h-8 bg-slate-200 mx-1 hidden lg:block" />

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications((s) => !s)}
              className={cn(
                "relative h-12 w-12 flex items-center justify-center rounded-2xl border-2 transition-all duration-300 group shadow-sm",
                showNotifications 
                  ? "bg-indigo-600 border-indigo-600 text-white shadow-glow-primary"
                  : "bg-white border-slate-200/60 text-slate-500 hover:text-indigo-600 hover:border-indigo-100 hover:shadow-md"
              )}
            >
              <Bell className={cn("h-5 w-5", showNotifications ? "animate-bounce" : "group-hover:scale-110")} />
              {unread > 0 && (
                <span className={cn(
                  "absolute top-2 right-2 h-3 w-3 rounded-full border-2 border-white animate-pulse",
                  showNotifications ? "bg-white" : "bg-rose-500"
                )} />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-14 w-96 glass-dark text-white rounded-[2rem] border-white/10 shadow-2xl z-50 overflow-hidden animate-reveal p-1">
                <div className="flex items-center justify-between px-6 py-5">
                  <h4 className="text-lg font-black tracking-tight">Updates</h4>
                  <Badge variant="ghost" className="text-[10px] font-black uppercase tracking-widest bg-white/10 text-white px-2 py-0.5">{unread} NEW</Badge>
                </div>
                <div className="max-h-[400px] overflow-y-auto no-scrollbar space-y-1 mb-2 px-1">
                  {MOCK_NOTIFICATIONS.map((n) => (
                    <div
                      key={n.id}
                      className={cn(
                        "group/notif flex gap-4 px-5 py-4 rounded-2xl transition-all cursor-pointer relative overflow-hidden",
                        !n.read ? "bg-white/10" : "hover:bg-white/5"
                      )}
                    >
                      <div className={cn(
                        "h-2 w-2 rounded-full absolute left-2 top-1/2 -translate-y-1/2",
                        !n.read ? "bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.6)]" : "bg-transparent"
                      )} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate leading-tight">{n.title}</p>
                        <p className="text-xs text-white/50 mt-1 line-clamp-2 leading-relaxed font-medium">{n.body}</p>
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.1em] mt-2 group-hover/notif:text-indigo-300 transition-colors">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full h-14 border-t border-white/5 hover:bg-white/5 text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                  Enterprise Action Center <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          <div className="w-px h-8 bg-slate-200 mx-1 hidden lg:block" />

          {/* Final Action Section */}
          <div className="flex items-center gap-3">
            <Button
              className="h-12 w-12 sm:w-auto rounded-2xl shadow-glow-primary border-none text-white text-sm font-black uppercase tracking-widest hidden sm:flex"
              onClick={() => setApplyOpen(true)}
            >
              <Plus className="h-5 w-5 sm:mr-2" />
              <span className="hidden sm:inline">Apply Leave</span>
            </Button>
            
            {/* Quick Profile Hub */}
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center h-12 pl-1 pr-1.5 rounded-2xl bg-white border border-slate-200/60 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group">
                  <Avatar className="h-9 w-9 rounded-[0.8rem] shadow-sm ring-1 ring-slate-100 group-hover:scale-95 transition-transform">
                    <AvatarFallback className="bg-slate-100 text-slate-600 font-black text-xs">
                      {user ? getInitials(user.firstName, user.lastName) : 'U'}
                    </AvatarFallback>
                  </Avatar>

                  <ChevronDown className="h-3.5 w-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors ml-1 hidden sm:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 rounded-3xl p-2 shadow-2xl border-slate-100 animate-slide-up">
                <div className="px-4 py-4 mb-2 flex items-center gap-3 bg-slate-50 rounded-2xl">
                   <Avatar className="h-10 w-10">
                    <AvatarFallback className="font-bold">{user ? getInitials(user.firstName, user.lastName) : 'U'}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-slate-800 truncate">{displayName}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{user?.role?.replace('_', ' ')}</p>
                  </div>
                </div>

                <DropdownMenuSeparator className="mx-2" />
                <DropdownMenuItem 
                  className="h-11 rounded-xl px-4 font-bold text-sm text-slate-600 gap-3 focus:bg-indigo-50 focus:text-indigo-700 cursor-pointer"
                  onClick={() => navigate(`/${user?.subdomain}/profile`)}
                >
                  <User className="h-4 w-4" /> Personnel Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator className="mx-2" />
                <DropdownMenuItem
                  className="h-11 rounded-xl px-4 font-black text-sm text-rose-600 gap-3 focus:bg-rose-50 focus:text-rose-700 cursor-pointer"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4" /> Terminate Session
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <ApplyLeaveDialog open={applyOpen} onClose={() => setApplyOpen(false)} />
    </>
  );
}
