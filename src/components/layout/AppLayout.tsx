import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Sidebar } from "./Sidebar";
import AppNavbar from "../common/navbar/AppNavbar";
import type { RootState } from "../../store";

export function AppLayout() {
  const user = useSelector((state: RootState) => state.user.profile);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 relative font-sans">
      <div className="absolute inset-0 pointer-events-none opacity-80" />

      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative z-10">
        <AppNavbar
          tenantName={user?.tenantName || "Organization"}
          unreadNotificationCount={0}
          userAvatar={user?.avatar || ""}
          avatarFallback={user?.name ? user.name.slice(0, 1).toUpperCase() : "U"}
        />
        <main className="flex-1 overflow-y-auto no-scrollbar h-full w-full">
          <div className="max-w-full mx-auto animate-reveal">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
