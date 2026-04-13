export interface UserProfile {
  id: string;
  email: string;
  name: string;
  subdomain: string;
  gender: number;
  status: number;
  role: string;
  permissions: Record<string, string[]>;
  avatar?: string;
  tenantName?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: UserProfile;
}
