import React, { useState, useRef, useEffect } from "react";
import { Bell, Check, CheckCheck, Info, AlertTriangle, XCircle, Sparkles, type LucideIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { markAsRead, markAllAsRead, fetchNotifications } from "@/store/slices/notificationSlice";
import { cn } from "@/lib/utils";
import type { Notification } from "@/services/notification.service";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import IconButton from "@/components/ui/IconButton";
import { Button } from "@/components/ui/Button";

const typeConfig: Record<string, { icon: LucideIcon }> = {
  Info: { icon: Info },
  Success: { icon: Check },
  Warning: { icon: AlertTriangle },
  Error: { icon: XCircle },
};

const NotificationItem = ({
  notification,
  onRead,
  onClick,
}: {
  notification: Notification;
  onRead: (id: string) => void;
  onClick: (notification: Notification) => void;
}) => {
  const { icon: Icon } = typeConfig[notification.type] ?? typeConfig.Info;
  const timeAgo = (() => {
    try {
      return formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true });
    } catch {
      return "";
    }
  })();

  return (
    <div
      className={cn(
        "flex gap-3 px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer group relative",
        !notification.isRead && "bg-primary-50/40"
      )}
      onClick={() => onClick(notification)}
    >
      <div className={cn("h-8 w-8 bg-primary-200 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm")}>
        <Icon className="h-4 w-4 text-primary-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm text-secondary-800 font-semibold leading-snug", !notification.isRead && "font-semibold")}>
          {notification.title}
        </p>
        <p className="text-xs text-slate-500 font-medium mt-0.5 leading-relaxed truncate">{notification.message}</p>
        <p className="text-[10px] text-slate-400 mt-1 font-medium">{timeAgo}</p>
      </div>

      <div className="flex flex-col items-center gap-2 shrink-0 self-center">
        {!notification.isRead ? (
           <IconButton
            icon={Check}
            onClick={(e) => {
              e.stopPropagation();
              onRead(notification.externalId);
            }}
            variant="glass"
            size="xs"
            className="h-6 w-6 rounded-full border border-slate-200 hover:text-primary-500 hover:border-primary-200"
            iconClassName="h-3 w-3"
            tooltip="Mark as read"
          />
        ) : (
          <CheckCheck className="h-3.5 w-3.5 text-slate-300" />
        )}
        {!notification.isRead && (
          <div className="h-1.5 w-1.5 rounded-full bg-primary-500 shrink-0" />
        )}
      </div>
    </div>
  );
};

const NotificationBell = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items, unreadCount, isLoading } = useSelector(
    (state: RootState) => state.notifications
  );
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handler);
      dispatch(fetchNotifications());
    }
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, dispatch]);

  const handleMarkAsRead = (id: string) => dispatch(markAsRead(id));
  const handleMarkAllAsRead = () => dispatch(markAllAsRead());

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      handleMarkAsRead(notification.externalId);
    }
    const url = notification.targetUrl || notification.TargetUrl;
    if (url) {
      navigate(url);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={panelRef}>
      <IconButton
        icon={Bell}
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        className="relative p-0"
        iconClassName="h-5 w-5 text-slate-600"
      >
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center border-2 border-white shadow-sm">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </IconButton>

      {isOpen && (
        <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/30">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Notifications</h3>
              {unreadCount > 0 && (
                <p className="text-xs text-slate-400 font-medium">{unreadCount} unread</p>
              )}
            </div>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="xs"
                onClick={handleMarkAllAsRead}
                className="text-primary-600 font-bold hover:bg-primary-50 hover:text-primary-700"
              >
                <CheckCheck className="h-3 w-3 mr-1" />
                Mark all read
              </Button>
            )}
          </div>

          <div className="max-h-140 overflow-y-auto divide-y divide-slate-50 no-scrollbar">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3">
                <div className="h-6 w-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs font-medium text-slate-400">Loading...</p>
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <Sparkles className="h-8 w-8 mb-2 opacity-40 text-primary-300" />
                <p className="text-xs font-bold text-slate-800">No notifications</p>
                <p className="text-[10px] mt-0.5">You're all caught up!</p>
              </div>
            ) : (
              items.map((n) => (
                <NotificationItem 
                  key={n.externalId} 
                  notification={n} 
                  onRead={handleMarkAsRead} 
                  onClick={handleNotificationClick}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
