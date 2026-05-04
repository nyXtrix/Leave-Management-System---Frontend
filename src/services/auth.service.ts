import BaseRequestProvider from "../lib/api/BaseRequestProvider";
import type {
  AuthMeResponse,
  LoginRequest,
  LoginResponse,
  RegisterCompanyRequest,
  UserProfile,
} from "../types/auth.types";
import { PermissionScope } from "../types/permission.types";

/**
 * Mappers to reconcile backend numeric enums with frontend string constants
 */
const MAP_ACTION = (action: string | number): string => {
  const actions: Record<number, string> = {
    0: "VIEW",
    1: "CREATE",
    2: "UPDATE",
    3: "DELETE",
    4: "APPROVE",
    5: "REJECT",
  };
  return typeof action === "number" ? actions[action] : action;
};

const transformPermissions = (apiPermissions: any): any => {
  const permissions: any = {};
  if (apiPermissions) {
    Object.entries(apiPermissions).forEach(([moduleId, modulePerms]: [string, any]) => {
      permissions[moduleId] = {
        actions: modulePerms.actions ? modulePerms.actions.map(MAP_ACTION) : [],
        scope: modulePerms.scope,
      };
    });
  }
  return permissions;
};

export const authService = {
  async identify(payload: {
    email: string;
  }): Promise<{ subdomain: string | null; status: number; exists: boolean }> {
    return await BaseRequestProvider.post<{
      subdomain: string | null;
      status: number;
      exists: boolean;
    }>("/auth/authentication/identify", payload);
  },

  async login(payload: LoginRequest, subdomain?: string): Promise<string> {
    const headers = subdomain ? { "X-Tenant-Subdomain": subdomain } : undefined;
    const res = await BaseRequestProvider.post<{ exchangeCode: string }>(
      "/auth/authentication/login",
      payload,
      { headers },
    );
    return res.exchangeCode;
  },

  async registerCompany(payload: RegisterCompanyRequest): Promise<string> {
    const res = await BaseRequestProvider.post<{ exchangeCode: string }>(
      "/auth/onboarding/register-company",
      payload,
    );
    return res.exchangeCode;
  },

  async exchangeCode(code: string): Promise<void> {
    await BaseRequestProvider.post("/auth/authentication/exchange", { code });
  },

  async logout(): Promise<void> {
    await BaseRequestProvider.post("/auth/authentication/logout");
  },

  async getMe(): Promise<UserProfile> {
    const res = await BaseRequestProvider.get<AuthMeResponse>(
      "/auth/authentication/me",
    );

    return {
      id: res.id || "N/A",
      firstName: res.firstName || "",
      lastName: res.lastName || "",
      email: res.email,
      subdomain: res.subdomain,
      tenantName: res.tenantName,
      role: res.role,
      roleCode: res.roleCode,
      permissions: transformPermissions(res.permissions),
      gender: res.gender,
      status: res.status,
      department: res.department || "N/A",
      managerName: res.managerName || "General Manager",
      updatedDate: res.updatedDate,
    };
  },

  async refreshToken(): Promise<void> {
    await BaseRequestProvider.post("/auth/authentication/refresh");
  },

  async submitContactInquiry(payload: {
    name: string;
    email: string;
    message: string;
    purpose: number;
  }): Promise<void> {
    await BaseRequestProvider.post("/auth/onboarding/contact", payload, {
      showSuccessToast: true,
      successMessage:
        "Your inquiry has been submitted successfully. We will get back to you soon.",
      showErrorToast: true,
      errorMessage: "Something went wrong. Please try again later.",
    });
  },

  async verifyRegistrationToken(
    token: string,
  ): Promise<{
    companyName?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
  } | null> {
    try {
      return await BaseRequestProvider.get<{
        companyName?: string;
        email?: string;
        firstName?: string;
        lastName?: string;
      }>(`/auth/onboarding/lead-details?token=${token}`);
    } catch {
      return null;
    }
  },

  async setPassword(payload: {
    token: string;
    password: string;
    confirmPassword: string;
  }): Promise<string> {
    const res = await BaseRequestProvider.post<{ exchangeCode: string }>(
      "/auth/invitation/set-password",
      payload,
    );
    return res.exchangeCode;
  },

  async inviteUser(payload: {
    email: string;
    firstName: string;
    lastName: string;
    gender: number | string;
    roleId: string;
    managerId: string;
    departmentId: string;
  }): Promise<{ inviteToken: string }> {
    return await BaseRequestProvider.post<{ inviteToken: string }>(
      "/auth/invitation/invite",
      {
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        gender: Number(payload.gender),
        roleExternalId: payload.roleId,
        managerExternalId: payload.managerId,
        departmentExternalId: payload.departmentId,
      },
      {
        showSuccessToast: true,
        successMessage: "Invitation sent successfully!",
        showErrorToast: true,
      },
    );
  },

  async verifyOnboardingToken(token: string): Promise<UserProfile> {
    const res = await BaseRequestProvider.get<AuthMeResponse>(
      `/auth/invitation/invite-details?token=${token}`,
    );

    return {
      id: res.id,
      firstName: res.firstName || "",
      lastName: res.lastName || "",
      email: res.email,
      subdomain: res.subdomain,
      tenantName: res.tenantName,
      role: res.role,
      roleCode: res.roleCode,
      permissions: transformPermissions(res.permissions),
      gender: res.gender,
      status: res.status,
      department: res.department || "N/A",
      managerName: res.managerName || "General Manager",
      updatedDate: res.updatedDate,
    };
  },

  async forgotPassword(
    payload: { email: string },
    subdomain?: string,
  ): Promise<void> {
    const headers = subdomain ? { "X-Tenant-Subdomain": subdomain } : undefined;
    await BaseRequestProvider.post(
      "/auth/invitation/forgot-password",
      payload,
      { headers },
    );
  },

  async resetPassword(payload: {
    token: string;
    password: string;
  }): Promise<void> {
    await BaseRequestProvider.post("/auth/invitation/reset-password", payload);
  },
};
