import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import IconButton from "@/components/ui/IconButton"
import { Bell } from "lucide-react"

interface AuthNavbarProps{
    tenantName: string;
    unreadNotificationCount: number;
    avatarFallback: string;
}

const AuthNavbar = ({tenantName, unreadNotificationCount, avatarFallback}: AuthNavbarProps) => {
  return (
    <div className="w-full bg-white flex justify-between items-center px-4 py-2 pb-3 border-b border-gray-100 ">
        <div>
            <h3 className="text-2xl tracking-wide capitalize font-semibold text-slate-600">{tenantName}</h3>
            
        </div>
        <div className="flex items-center gap-4">
            <div className="relative">
            <IconButton icon={Bell} variant="ghost" className="p-0" iconClassName="h-6 w-6"/>
            {unreadNotificationCount > 0 && (
                <span className="absolute top-1.5 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            )}
            </div>
            <Avatar defaultValue={avatarFallback} className="border text-black"><AvatarFallback>{avatarFallback}</AvatarFallback></Avatar>
        </div>
    </div>
  )
}

export default AuthNavbar