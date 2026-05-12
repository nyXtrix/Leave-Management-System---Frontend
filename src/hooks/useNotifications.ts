import { useEffect, useState, useCallback, useRef } from 'react';
import { toast } from 'sonner';

interface NotificationPayload {
  externalId: string;
  title: string;
  message: string;
  type: 'Info' | 'Success' | 'Warning' | 'Error';
  createdAt: string;
}

export const useNotifications = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<NotificationPayload[]>([]);
  const eventSourceRef = useRef<EventSource | null>(null);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const response = await fetch('/api/v1/notifications/unread-count');
      if (response.ok) {
        const data = await response.json();
        setUnreadCount(data.count);
      }
    } catch (error) {
      console.error('Failed to fetch unread count:', error);
    }
  }, []);

  const connectSSE = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const es = new EventSource('/api/v1/notifications/stream', {
      withCredentials: true,
    });

    es.onmessage = (event) => {
      try {
        const data: NotificationPayload = JSON.parse(event.data);
        
        // Show live toast
        const toastType = data.type.toLowerCase() as 'info' | 'success' | 'warning' | 'error';
        toast[toastType](data.title, {
          description: data.message,
        });

        // Update local state
        setUnreadCount((prev) => prev + 1);
        setNotifications((prev) => [data, ...prev]);
      } catch (e) {
        console.error('Failed to parse SSE message:', e);
      }
    };

    es.onerror = (err) => {
      console.error('SSE Error:', err);
      es.close();
      // Exponential backoff or simple timeout for reconnection
      setTimeout(connectSSE, 5000);
    };

    eventSourceRef.current = es;
  }, []);

  useEffect(() => {
    fetchUnreadCount();
    connectSSE();

    // Polling as fallback for count and to keep it fresh
    const interval = setInterval(fetchUnreadCount, 30000);

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      clearInterval(interval);
    };
  }, [fetchUnreadCount, connectSSE]);

  return {
    unreadCount,
    notifications,
    refreshCount: fetchUnreadCount,
  };
};
