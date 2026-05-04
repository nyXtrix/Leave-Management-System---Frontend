import { Toast } from '@/components/ui/sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5090/api/v1';

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

let refreshingPromise: Promise<boolean> | null = null;

async function handleResponse<T>(
  res: Response, 
  options?: RequestOptions,
  retryFn?: () => Promise<T>
): Promise<T> {
  // Automatic Refresh on 401
  if (res.status === 401 && retryFn && !res.url.includes('/auth/authentication/refresh')) {
    if (!refreshingPromise) {
      refreshingPromise = (async () => {
        try {
          const refreshRes = await fetch(`${API_BASE_URL}/auth/authentication/refresh`, {
            method: 'POST',
            headers: buildHeaders(),
            credentials: 'include',
          });
          return refreshRes.ok;
        } catch {
          return false;
        } finally {
          refreshingPromise = null;
        }
      })();
    }

    const isRefreshed = await refreshingPromise;
    if (isRefreshed) {
      return await retryFn();
    }
  }

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
    return handleResponse<T>(res, options, () => this.get<T>(endpoint, params, options));
  },

  async post<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: buildHeaders(options?.headers),
      body: data !== undefined ? JSON.stringify(data) : undefined,
      credentials: 'include',
    });
    return handleResponse<T>(res, options, () => this.post<T>(endpoint, data, options));
  },

  async put<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: buildHeaders(options?.headers),
      body: data !== undefined ? JSON.stringify(data) : undefined,
      credentials: 'include',
    });
    return handleResponse<T>(res, options, () => this.put<T>(endpoint, data, options));
  },

  async patch<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: buildHeaders(options?.headers),
      body: data !== undefined ? JSON.stringify(data) : undefined,
      credentials: 'include',
    });
    return handleResponse<T>(res, options, () => this.patch<T>(endpoint, data, options));
  },

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: buildHeaders(options?.headers),
      credentials: 'include',
    });
    return handleResponse<T>(res, options, () => this.delete<T>(endpoint, options));
  },

  clearToken() {},
};

export default BaseRequestProvider;
