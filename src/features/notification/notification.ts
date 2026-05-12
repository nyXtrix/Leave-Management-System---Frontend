import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store';
import { notificationService, type Notification } from '@/services/notification.service';
import {
  addLiveNotification,
  fetchUnreadCount,
  fetchNotifications,
} from '@/store/slices/notificationSlice';

export function useNotificationSSE(ready: boolean) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!ready) return;

    dispatch(fetchUnreadCount());

    const pollInterval = setInterval(() => {
      dispatch(fetchUnreadCount());
    }, 30000);

    const eventSource = notificationService.connectSSE();

    eventSource.onopen = () => {
    };

    eventSource.onmessage = (event: MessageEvent) => {
      try {
        const notification = JSON.parse(event.data) as Notification;
        dispatch(addLiveNotification(notification));
      } catch {
      }
    };

    eventSource.onerror = (err: Event) => {
      console.error('[SSE] Notification stream error:', err);
      eventSource.close();
    };

    return () => {
      console.log('[SSE] Notification stream closed');
      eventSource.close();
      clearInterval(pollInterval);
    };
  }, [ready, dispatch]);
}