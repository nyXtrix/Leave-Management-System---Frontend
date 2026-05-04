import type { AppPermissions } from './permission.types';

export const UserStatus = {
  Pending: 1,
  Activated: 2,
  InActive: 3,
  Terminated: 4
} as const;

export type UserStatus = typeof UserStatus[keyof typeof UserStatus];

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  subdomain: string;
  gender: number;
  status: number;
  role: string;
  roleCode: string;
  permissions: AppPermissions;
  tenantName: string;
  department: string;
  managerName: string;
  updatedDate: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: UserProfile;
}

export interface RegisterCompanyRequest {
  registrationToken: string;
  companyName: string;
  subdomain: string;
  firstName: string;
  lastName: string;
  adminEmail: string;
  adminPassword: string;
}

export interface AuthMeResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subdomain: string;
  tenantName: string;
  role: string;
  roleCode: string;
  permissions: AppPermissions;
  gender: number;
  status: number;
  department?: string;
  managerName?: string;
  updatedDate: string;
}

