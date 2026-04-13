import { useState, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from "@/../public/Logo.png";
import {
  LayoutDashboard,
  CalendarRange,
  Network,
  ClipboardCheck,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  Sparkles,
  CalendarClock,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar';
import { useAuth } from '@/contexts/AuthContext';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/Tooltip';
import { getSidebarRoutes } from '@/constant';

interface NavItem {
  label: string;
  icon: React.ElementType;
  to: string;
  badge?: number;
}


export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  return (

    <div className={cn("h-screen p-4 bg-white border-r border-slate-200/50 shadow-premium shrink-0 overflow-hidden z-20 transition-all duration-300 ease-in-out md:collapsed:w-20", collapsed ? "w-20" : "w-60")}>
      <div className="flex items-center gap-2 border-b pb-4">
        <img src={Logo} alt="Logo" className="h-8 cursor-pointer" />
        <p className="text-xl tracking-widest mt-1 text-slate-800 font-bold">FLOW OFF</p>
      </div>

      <div className="flex flex-col gap-2 mt-10">
        {getSidebarRoutes(user).map((group) => (
          <div key={group.title} className="space-y-2">
            {!collapsed && (
              <p className="px-4 pb-2 text-secondary-500 text-base font-semibold overflow-hidden whitespace-nowrap">
                {group.title}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive =
                  item.to === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.to);

                const linkEl = (
                  <NavLink
                    to={item.to}
                    className={cn(
                      'group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300',
                      isActive
                        ? 'bg-primary-500 text-white shadow-glow-primary'
                        : 'text-secondary-500 hover:text-secondary-900 hover:bg-secondary-100/80'
                    )}
                  >
                    <item.icon
                      className={cn(
                        'h-5 w-5 shrink-0 transition-all duration-300',
                        isActive ? 'scale-110' : 'group-hover:scale-110'
                      )}
                    />
                    {!collapsed && (
                      <span className="flex-1 truncate transition-all duration-300 opacity-100">{item.label}</span>
                    )}
                    {!collapsed && item.badge && !isActive && (
                      <Badge variant="danger" pulse className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </NavLink>
                );

                return collapsed ? (
                  <Tooltip key={item.label}>
                    <TooltipTrigger asChild>{linkEl}</TooltipTrigger>
                    <TooltipContent side="right" sideOffset={15}>
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <div key={item.label}>{linkEl}</div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
    // <TooltipProvider delayDuration={0}>
    //   <aside
    //     className={cn(
    //       "relative h-screen flex flex-col bg-white border-r border-slate-200/50 shadow-premium shrink-0 overflow-hidden z-20 transition-all duration-300 ease-in-out",
    //       collapsed ? "w-20" : "w-[280px]"
    //     )}
    //   >
    //     {/* Background gradient for depth */}
    //     <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white pointer-events-none" />

    //     {/* Logo */}
    //     <div className="relative flex items-center gap-3 px-6 py-8">
    //       <div className="h-11 w-11 shrink-0 gradient-primary rounded-2xl flex items-center justify-center shadow-glow-primary">
    //         <Sparkles className="h-6 w-6 text-white" strokeWidth={2.5} />
    //       </div>
    //       {!collapsed && (
    //         <div className="overflow-hidden whitespace-nowrap transition-all duration-300">
    //           <p className="text-xl font-black text-slate-900 tracking-tight leading-none">Leavr</p>
    //           <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mt-1.5 opacity-80">Cloud OS v2</p>
    //         </div>
    //       )}
    //     </div>

    //     {/* Collapse Toggle */}
    //     <button
    //       onClick={() => setCollapsed((c) => !c)}
    //       className="absolute -right-3 top-9 z-30 h-7 w-7 flex items-center justify-center rounded-full bg-white border border-slate-200 shadow-premium text-slate-400 hover:text-indigo-600 hover:scale-110 active:scale-95 transition-all"
    //     >
    //       <ChevronLeft className={cn("h-4 w-4 transition-transform duration-300", collapsed && "rotate-180")} />
    //     </button>

    //     {/* Nav */}
    //     <nav className="relative flex-1 px-4 py-6 space-y-8 overflow-y-auto no-scrollbar">
    //       {navGroups.map((group) => (
    //         <div key={group.title} className="space-y-2">
    //           {!collapsed && (
    //             <p className="px-4 pb-2 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 overflow-hidden whitespace-nowrap">
    //               {group.title}
    //             </p>
    //           )}
    //           <div className="space-y-1">
    //             {group.items.map((item) => {
    //               const isActive =
    //                 item.to === '/'
    //                   ? location.pathname === '/'
    //                   : location.pathname.startsWith(item.to);

    //               const linkEl = (
    //                 <NavLink
    //                   to={item.to}
    //                   className={cn(
    //                     'group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300',
    //                     isActive
    //                       ? 'bg-indigo-600 text-white shadow-glow-primary'
    //                       : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/80'
    //                   )}
    //                 >
    //                   <item.icon
    //                     className={cn(
    //                       'h-5 w-5 shrink-0 transition-all duration-300',
    //                       isActive ? 'scale-110' : 'group-hover:scale-110'
    //                     )}
    //                   />
    //                   {!collapsed && (
    //                     <span className="flex-1 truncate transition-all duration-300 opacity-100">{item.label}</span>
    //                   )}
    //                   {!collapsed && item.badge && !isActive && (
    //                     <Badge variant="danger" pulse className="ml-auto">
    //                       {item.badge}
    //                     </Badge>
    //                   )}
    //                 </NavLink>
    //               );

    //               return collapsed ? (
    //                 <Tooltip key={item.label}>
    //                   <TooltipTrigger asChild>{linkEl}</TooltipTrigger>
    //                   <TooltipContent side="right" sideOffset={15}>
    //                     {item.label}
    //                   </TooltipContent>
    //                 </Tooltip>
    //               ) : (
    //                 <div key={item.label}>{linkEl}</div>
    //               );
    //             })}
    //           </div>
    //         </div>
    //       ))}
    //     </nav>

    //     {/* Footer: User Card */}
    //     <div className="relative px-4 pb-6 pt-4 mt-auto">
    //       <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-50" />
    //       {collapsed ? (
    //         <Tooltip>
    //           <TooltipTrigger asChild>
    //             <button
    //               onClick={handleLogout}
    //               className="w-full flex items-center justify-center h-12 rounded-2xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all active:scale-95"
    //             >
    //               <LogOut className="h-5 w-5" />
    //             </button>
    //           </TooltipTrigger>
    //           <TooltipContent side="right" sideOffset={15}>Sign Out</TooltipContent>
    //         </Tooltip>
    //       ) : (
    //         <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/50 border border-slate-200/50 hover:bg-white hover:shadow-premium transition-all duration-300 group overflow-hidden">
    //           <div className="relative shrink-0">
    //             <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
    //               <AvatarImage src={user?.avatar} alt={user?.name} />
    //               <AvatarFallback className="bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 font-bold">
    //                 {user ? getInitials(user.name) : 'U'}
    //               </AvatarFallback>
    //             </Avatar>
    //             <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
    //           </div>
    //           <div className="flex-1 min-w-0 transition-opacity duration-300">
    //             <p className="text-sm font-bold text-slate-900 truncate tracking-tight">{user?.name}</p>
    //             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate mt-0.5">
    //               {user?.role?.replace('_', ' ')}
    //             </p>
    //           </div>
    //           <button
    //             onClick={handleLogout}
    //             className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all shrink-0"
    //             title="Sign Out"
    //           >
    //             <LogOut className="h-4 w-4" />
    //           </button>
    //         </div>
    //       )}
    //     </div>
    //   </aside>
    // </TooltipProvider>
  );
}
