import BaseRequestProvider from '../lib/api/BaseRequestProvider';
import type { LoginRequest, LoginResponse, UserProfile } from '../types/auth';

export const authService = {
  async identify(payload: { email: string }): Promise<{ subdomain: string | null; status: number; exists: boolean }> {
    return await BaseRequestProvider.post<{ subdomain: string | null; status: number; exists: boolean }>('/Authentication/identify', payload);
  },

  async login(payload: LoginRequest, subdomain?: string): Promise<string> {
    const headers = subdomain ? { 'X-Tenant-Subdomain': subdomain } : undefined;
    const res = await BaseRequestProvider.post<any>('/Authentication/login', payload, { headers });
    return res.exchangeCode;
  },

  async registerCompany(payload: any): Promise<string> {
    const res = await BaseRequestProvider.post<any>('/Onboarding/register-company', payload);
    return res.exchangeCode;
  },

  async exchangeCode(code: string): Promise<void> {
    await BaseRequestProvider.post('/Authentication/exchange', { code });
  },

  async logout(): Promise<void> {
    await BaseRequestProvider.post('/Authentication/logout');
  },

  async getMe(): Promise<UserProfile> {
    const res = await BaseRequestProvider.get<any>('/Authentication/me');
    return {
      id: res.id || 'N/A',
      name: res.name,
      email: res.email,
      subdomain: res.subdomain,
      tenantName: res.tenantName,
      role: res.role,
      permissions: res.permissions,
      gender: res.gender,
      status: res.status,
      avatar: res.avatar,
    };
  },

  async refreshToken(): Promise<void> {
    await BaseRequestProvider.post('/Authentication/refresh');
  },

  async submitContactInquiry(payload: { name: string; email: string; message: string; purpose: number }): Promise<void> {
    await BaseRequestProvider.post('/Onboarding/contact', payload, {
      showSuccessToast: true,
      successMessage: 'Your inquiry has been submitted successfully. We will get back to you soon.',
      showErrorToast: true,
      errorMessage: "Something went wrong. Please try again later.",
    });
  },

  async verifyRegistrationToken(token: string): Promise<{ companyName?: string; email?: string; name?: string } | null> {
    try {
      return await BaseRequestProvider.get<{ companyName?: string; email?: string; name?: string }>(`/Onboarding/lead-details?token=${token}`);
    } catch {
      return null;
    }
  },

  async setPassword(payload: { token: string; password: string }): Promise<string> {
    const res = await BaseRequestProvider.post<any>('/Invitation/set-password', payload);
    return res.exchangeCode;
  },

  async verifyOnboardingToken(token: string): Promise<UserProfile> {
    const res = await BaseRequestProvider.get<any>(`/Invitation/invite-details?token=${token}`);
    return {
      id: res.id,
      name: res.name,
      email: res.email,
      subdomain: res.subdomain,
      tenantName: res.companyName,
      role: res.role,
      permissions: res.permissions || [],
      gender: res.gender,
      status: res.status,
      avatar: res.avatar,
    };
  },

  async forgotPassword(payload: { email: string }, subdomain?: string): Promise<void> {
    const headers = subdomain ? { 'X-Tenant-Subdomain': subdomain } : undefined;
    await BaseRequestProvider.post('/Invitation/forgot-password', payload, { headers });
  },

  async resetPassword(payload: { token: string; password: string }): Promise<void> {
    await BaseRequestProvider.post('/Invitation/reset-password', payload);
  }
};
