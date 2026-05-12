export type PermissionAction =
  | "VIEW"
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "APPROVE"
  | "REJECT";

export type PermissionModuleId =
  | "POLICY"
  | "LEAVE_MGMT"
  | "EMPLOYEE_MGMT"
  | "ORGANIZATION"
  | "APPROVALS"
  | "PROFILE"
  | "DASHBOARD"
  | "ADMIN_DASHBOARD"
  | "MY_LEAVES"
  | "TEAM"
  | "CALENDAR";

export const PermissionScope = {
  ALL: "ALL",
  DEPARTMENT: "DEPARTMENT",
  TEAM: "TEAM",
  SELF: "SELF",
} as const;

export type PermissionScope =
  (typeof PermissionScope)[keyof typeof PermissionScope];

export interface PermissionModule {
  id: PermissionModuleId;
  label: string;
  description: string;
  actions: PermissionAction[];
}

export type AppPermissions = {
  [module in PermissionModuleId]?: {
    actions: PermissionAction[];
    scope: PermissionScope;
  };
};

export interface ApiPermissions {
  [moduleId: string]: {
    actions: (string | number)[];
    scope: PermissionScope;
  };
}

export type RolePermissions = Partial<
  Record<PermissionModuleId, PermissionAction[]>
>;

export interface SystemRole {
  id: string;
  name: string;
  description?: string;
  permissions: AppPermissions;
}

export const PERMISSION_MODULES: PermissionModule[] = [
  {
    id: "POLICY",
    label: "Leave Policy",
    description:
      "Management of accrual rules, restrictions, and approval flows.",
    actions: ["VIEW", "CREATE", "UPDATE", "DELETE"],
  },
  {
    id: "LEAVE_MGMT",
    label: "Leave Management",
    description: "Setup of leave types, categories, and holiday calendars.",
    actions: ["VIEW", "CREATE", "UPDATE", "DELETE"],
  },
  {
    id: "EMPLOYEE_MGMT",
    label: "Employee Management",
    description: "User invitations, profile management, and directory access.",
    actions: ["VIEW", "CREATE", "UPDATE", "DELETE"],
  },
  {
    id: "ORGANIZATION",
    label: "Organization",
    description: "Manage Roles, Departments",
    actions: ["VIEW", "CREATE", "UPDATE", "DELETE"],
  },
  {
    id: "CALENDAR",
    label: "Calendar Management",
    description: "Manage Leave Calendar",
    actions: ["VIEW", "CREATE", "UPDATE", "DELETE"],
  },
];
