import React from "react";
import {
  MessageSquare,
  FileText,
  XCircle,
  Clock,
  CheckCircle2,
  Gift,
  UserPlus,
  Settings,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { RecentActivity } from "@/types/dashboard.types";

const getIconForActivity = (type: string) => {
  switch (type.toUpperCase()) {
    case "SUBMITTED":
      return { icon: FileText, iconColor: "text-blue-500", iconBg: "bg-blue-50 border-blue-200" };
    case "COMMENT":
      return { icon: MessageSquare, iconColor: "text-slate-500", iconBg: "bg-slate-50 border-slate-200" };
    case "APPROVED":
      return { icon: CheckCircle2, iconColor: "text-emerald-500", iconBg: "bg-emerald-50 border-emerald-200" };
    case "HOLIDAY":
      return { icon: Gift, iconColor: "text-purple-500", iconBg: "bg-purple-50 border-purple-200" };
    case "CANCELLED":
    case "REJECTED":
      return { icon: XCircle, iconColor: "text-rose-500", iconBg: "bg-rose-50 border-rose-200" };
    case "USER_ADDED":
    case "INVITED":
      return { icon: UserPlus, iconColor: "text-indigo-500", iconBg: "bg-indigo-50 border-indigo-200" };
    case "POLICY_UPDATED":
    case "SETTINGS_CHANGED":
      return { icon: Settings, iconColor: "text-slate-600", iconBg: "bg-slate-100 border-slate-300" };
    case "ROLE_UPDATED":
      return { icon: ShieldCheck, iconColor: "text-emerald-600", iconBg: "bg-emerald-50 border-emerald-200" };
    case "WARNING":
    case "ALERT":
      return { icon: AlertCircle, iconColor: "text-amber-500", iconBg: "bg-amber-50 border-amber-200" };
    default:
      return { icon: Clock, iconColor: "text-slate-500", iconBg: "bg-slate-50 border-slate-200" };
  }
};

interface ActivityTimelineProps {
  activities: RecentActivity[];
  title?: string;
  description?: string;
  emptyMessage?: string;
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ 
  activities,
  title = "Recent Activity",
  description = "Your latest leave updates and events",
  emptyMessage = "No recent activity found."
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 h-full flex flex-col min-h-[300px]">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800">Recent Activity</h3>
        <p className="text-xs font-medium text-slate-500">Your latest leave updates and events</p>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
        {(!activities || activities.length === 0) ? (
          <div className="h-full flex flex-col items-center justify-center min-h-[150px]">
             <p className="text-sm text-slate-400 font-medium">No recent activity found.</p>
          </div>
        ) : (
          <div className="relative border-l-2 border-slate-100 ml-4 space-y-8 pb-4">
            {activities.map((event) => {
              const { icon: Icon, iconColor, iconBg } = getIconForActivity(event.type);
              let timeDisplay = "Just now";
              try {
                if (event.timestamp) {
                  timeDisplay = formatDistanceToNow(new Date(event.timestamp), { addSuffix: true });
                }
              } catch(e) {}

              return (
                <div key={event.id} className="relative pl-8 group">
                  <div className={`absolute -left-[17px] top-1 h-8 w-8 rounded-full border ${iconBg} bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-4 w-4 ${iconColor}`} strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                      <h4 className="text-sm font-semibold text-slate-800">{event.title}</h4>
                      <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap bg-slate-50 px-2 py-0.5 rounded-md mt-1 sm:mt-0 w-max">
                        {timeDisplay}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
