import BaseRequestProvider, { getTenant } from '@/lib/api/BaseRequestProvider';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5090/api/v1';

export interface Notification {
  externalId: string;
  userId: string;
  tenantId: number;
  title: string;
  message: string;
  type: 'Info' | 'Success' | 'Warning' | 'Error';
  targetUrl?: string;
  TargetUrl?: string;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationListResponse {
  items: Notification[];
  totalCount: number;
}

export interface UnreadCountResponse {
  count: number;
}

export const notificationService = {
  connectSSE(): EventSource {
    const tenant = getTenant();
    const url = `${API_BASE_URL}/notifications/stream`;
    const eventSource = new EventSource(url, { withCredentials: true });
    return eventSource;
  },

  async getNotifications(page = 1, pageSize = 20): Promise<Notification[]> {
    return BaseRequestProvider.get<Notification[]>('/notifications', {
      page: String(page),
      pageSize: String(pageSize),
    });
  },

  async getUnreadCount(): Promise<UnreadCountResponse> {
    return BaseRequestProvider.get<UnreadCountResponse>('/notifications/unread-count');
  },

  async markAsRead(id: string): Promise<void> {
    return BaseRequestProvider.post<void>(`/notifications/${id}/read`);
  },

  async markAllAsRead(): Promise<void> {
    return BaseRequestProvider.post<void>('/notifications/read-all');
  },
};
