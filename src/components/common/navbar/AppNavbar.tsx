import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import NotificationBell from "@/features/notification/NotificationBell";

interface AuthNavbarProps {
  tenantName: string;
  avatarFallback: string;
}

const AuthNavbar = ({ tenantName, avatarFallback }: AuthNavbarProps) => {
  return (
    <div className="w-full bg-white flex justify-between items-center px-4 py-2 pb-3 border-b border-gray-100">
      <div>
        <h3 className="text-2xl tracking-wide capitalize font-semibold text-slate-600">
          {tenantName}
        </h3>
      </div>
      <div className="flex items-center gap-3">
        <NotificationBell />
        {/* <Avatar defaultValue={avatarFallback} className="border text-black">
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar> */}
      </div>
    </div>
  );
};

export default AuthNavbar;