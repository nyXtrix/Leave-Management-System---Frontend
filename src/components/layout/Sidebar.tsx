import { useState, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import Logo from "@/../public/Logo.png";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/contexts/AuthContext";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/Tooltip";
import { getSidebarRoutes } from "@/constant";
import IconButton from "../ui/IconButton";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={cn(
          "relative h-screen flex flex-col bg-white border-r border-slate-200/50 shadow-premium transition-all duration-300 ease-in-out z-30 shrink-0",
          collapsed ? "w-20" : "w-20 lg:w-64",
        )}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <IconButton
              icon={collapsed ? ChevronRight : ChevronLeft}
              onClick={() => setCollapsed(!collapsed)}
              variant="outline"
              size="icon"
              className="absolute -right-4 bottom-20 h-8 w-8 rounded-full z-51 bg-white shadow-premium p-0 hidden lg:flex items-center justify-center border-slate-200 hover:border-primary-500 hover:text-primary-600 transition-all duration-300"
              iconClassName="h-4 w-4"
            />
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={15} className="font-bold">
            {collapsed ? "Expand" : "Collapse"} Sidebar
          </TooltipContent>
        </Tooltip>

        <div
          className={cn(
            "p-4 flex items-center gap-3 border-b border-slate-100 h-16 shrink-0",
            collapsed ? "justify-center" : "",
          )}
        >
          <img
            src={Logo}
            alt="Logo"
            className={cn("h-8 shrink-0", collapsed ? "ml-3" : "")}
          />
          <p
            className={cn(
              "text-xl tracking-tight text-slate-900 font-bold whitespace-nowrap transition-all duration-300 ease-in-out origin-left",
              collapsed
                ? "w-0 opacity-0 invisible -translate-x-4"
                : "w-0 opacity-0 invisible -translate-x-4 lg:w-auto lg:opacity-100 lg:visible lg:translate-x-0",
            )}
          >
            FLOW OFF
          </p>
        </div>

        <div className="flex-1 flex flex-col gap-2 mt-8 px-3 overflow-y-auto no-scrollbar">
          {getSidebarRoutes(user).map((group) => (
            <div key={group.title} className="space-y-1">
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive =
                    item.to === "/"
                      ? location.pathname === "/"
                      : location.pathname.startsWith(item.to);

                  const linkEl = (
                    <NavLink
                      to={item.to}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-full px-4 py-3 text-sm font-semibold transition-all duration-300",
                        isActive
                          ? "bg-linear-to-br from-primary-500 to-primary-600 text-white shadow-glow-primary"
                          : "text-secondary-500 hover:text-secondary-900 hover:bg-secondary-100/80",
                      )}
                    >
                      <item.icon
                        className={cn(
                          "shrink-0 transition-all duration-300",
                          isActive ? "scale-110" : "group-hover:scale-110",
                          collapsed ? "h-6 w-6" : "h-5 w-5"
                        )}
                      />
                      <span
                        className={cn(
                          "flex-1 truncate transition-all duration-300 ease-in-out origin-left",
                          collapsed
                            ? "opacity-0 invisible w-0 -translate-x-2"
                            : "opacity-0 invisible w-0 -translate-x-2 lg:opacity-100 lg:visible lg:w-auto lg:translate-x-0",
                        )}
                      >
                        {item.label}
                      </span>
                      {!collapsed && item.badge && !isActive && (
                        <Badge variant="danger" pulse className="ml-auto hidden lg:block">
                          {item.badge}
                        </Badge>
                      )}
                    </NavLink>
                  );

                  return collapsed ? (
                    <Tooltip key={item.label}>
                      <TooltipTrigger asChild>{linkEl}</TooltipTrigger>
                      <TooltipContent
                        side="right"
                        sideOffset={15}
                        className="font-bold"
                      >
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

        <div className="p-3 mt-auto border-t border-secondary-200">
          <Tooltip delayDuration={collapsed ? 0 : 500}>
            <TooltipTrigger asChild>
              <IconButton
                icon={LogOut}
                iconPosition="left"
                onClick={handleLogout}
                variant="destructive"
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-300 font-semibold group relative",
                  collapsed ? "justify-center px-0" : "",
                )}
              >
                <span
                  className={cn(
                    "truncate transition-all duration-300 ease-in-out origin-left",
                    collapsed
                      ? "opacity-0 invisible w-0 -translate-x-2"
                      : "opacity-0 invisible w-0 -translate-x-2 lg:opacity-100 lg:visible lg:w-auto lg:translate-x-0",
                  )}
                >
                  Log out
                </span>
              </IconButton>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right" sideOffset={15} className="font-bold">
                Log out
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
