import { Toast } from '@/components/ui/sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5090/api';

export const getTenant = () => {
  const parts = window.location.pathname.split('/');
  const tenantCandidate = parts[1];
  
  const reserved = ['login', 'register', 'auth-callback', 'contact', 'set-password'];
  if (!tenantCandidate || reserved.includes(tenantCandidate)) return null;
  
  return tenantCandidate;
};

export interface ApiError {
  message: string;
  status: number;
}

export interface RequestOptions {
  showSuccessToast?: boolean;
  successMessage?: string;
  showErrorToast?: boolean;
  errorMessage?: string;
  headers?: Record<string, string>;
}

async function handleResponse<T>(res: Response, options?: RequestOptions): Promise<T> {
  if (!res.ok) {
    let message = 'An error occurred during communication.';
    try {
      const body = await res.json();
      message = body.message ?? body.title ?? message;
    } catch {}

    if (options?.showErrorToast || options?.errorMessage) {
      Toast({ type: 'error', message: options?.errorMessage ?? message });
    }

    const err: ApiError = { message, status: res.status };
    throw err;
  }

  if (options?.showSuccessToast || options?.successMessage) {
    Toast({ type: 'success', message: options?.successMessage ?? 'Success' });
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

function buildHeaders(extra?: Record<string, string>): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...extra,
  };

  const tenant = getTenant();
  if (tenant) {
    headers['X-Tenant-Subdomain'] = tenant;
  }

  return headers;
}

const BaseRequestProvider = {
  async get<T>(endpoint: string, params?: Record<string, string>, options?: RequestOptions): Promise<T> {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    
    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: buildHeaders(options?.headers),
      credentials: 'include',
    });
    return handleResponse<T>(res, options);
  },

  async post<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: buildHeaders(options?.headers),
      body: data !== undefined ? JSON.stringify(data) : undefined,
      credentials: 'include',
    });
    return handleResponse<T>(res, options);
  },

  async put<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: buildHeaders(options?.headers),
      body: data !== undefined ? JSON.stringify(data) : undefined,
      credentials: 'include',
    });
    return handleResponse<T>(res, options);
  },

  async patch<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: buildHeaders(options?.headers),
      body: data !== undefined ? JSON.stringify(data) : undefined,
      credentials: 'include',
    });
    return handleResponse<T>(res, options);
  },

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: buildHeaders(options?.headers),
      credentials: 'include',
    });
    return handleResponse<T>(res, options);
  },

  clearToken() {
  },
};

export default BaseRequestProvider;
