import type { HomeNavSection } from "@/types/utils";
import type { UserProfile } from "@/types/auth";
import {
  LayoutDashboard,
  CalendarRange,
  Users,
  ClipboardCheck,
  Settings,
  ShieldCheck,
  Building2,
  Sparkles,
  LayoutGrid,
  Zap,
  Users2,
  FileText,
  Code2,
  Rss,
  HelpCircle,
  Info,
  MessageSquare,
  Briefcase,
  Network,
  Rocket,
} from "lucide-react";

export const APP_CONFIG = {
  name: "Leavr Cloud OS",
  version: "2.0.0",
  apiPrefix: "/api/v1",
  defaultTenantId: "acme-01",
};

export const ROUTES = {
  dashboard: "/",
  leaves: "/leaves",
  approvals: "/approvals",
  employees: "/employees",
  settings: "/settings",
  orgChart: "/organization",
};

export const LEAVE_TYPES = {
  SICK: "Sick Leave",
  CASUAL: "Casual Leave",
  CUSTOM: "Custom Leave",
  WFH: "Work From Home",
  BEREAVEMENT: "Bereavement",
};

export const HOME_NAV_LINKS: HomeNavSection[] = [
  {
    label: "Product",
    items: [
      { label: "Features", href: "#features", icon: LayoutGrid },
      { label: "How It Works", href: "#how-it-works", icon: Sparkles },
      { label: "Workflow Engine", href: "#workflow", icon: Zap },
      { label: "Security & Permissions", href: "#security", icon: ShieldCheck },
    ],
  },
  {
    label: "Solutions",
    items: [
      { label: "For Startups", href: "#solutions-startups", icon: Rocket },
      {
        label: "For Enterprises",
        href: "#solutions-enterprise",
        icon: Building2,
      },
      { label: "For HR Teams", href: "#solutions-hr", icon: Users2 },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Documentation", href: "#docs", icon: FileText },
      { label: "API Reference", href: "#api", icon: Code2 },
      { label: "Blog", href: "#blog", icon: Rss },
      { label: "Help Center", href: "#help", icon: HelpCircle },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About Us", href: "#about", icon: Info },
      { label: "Contact", href: "/contact", icon: MessageSquare },
      { label: "Careers", href: "#careers", icon: Briefcase },
    ],
  },
];

export const CONTACT_OPTIONS: { label: string; value: string }[] = [
  { label: "Get LMS for my organization", value: "1" },
  { label: "Support", value: "3" },
  { label: "Other", value: "4" },
];

export const getSidebarRoutes = (user: UserProfile | null) => {
  if (!user) return [];
  const subdomain = user.subdomain;
  const permissions = user.permissions;
  const primaryRoute = subdomain ? `/${subdomain}` : "";

  const sections: { title: string; items: any[] }[] = [];

  sections.push({
    title: "Overview",
    items: [
      { label: "Dashboard", to: `${primaryRoute}/dashboard`, icon: LayoutDashboard },
      { label: "My Leaves", to: `${primaryRoute}/leaves`, icon: CalendarRange },
      { label: "Organization", to: `${primaryRoute}/organization`, icon: Network },
    ],
  });

  const managementItems = [];
  
  if (permissions['policy']?.includes('view')) {
    managementItems.push({ label: "Leave Policy", to: `${primaryRoute}/policy`, icon: ShieldCheck });
  }

  if (permissions['leave_mgmt']?.includes('view')) {
    managementItems.push({ label: "Leave Management", to: `${primaryRoute}/leave-management`, icon: Sparkles });
  }

  if (permissions['employee_mgmt']?.includes('view')) {
    managementItems.push({ label: "Manage Employees", to: `${primaryRoute}/employees`, icon: Users });
  }

  if (managementItems.length > 0) {
    sections.push({
      title: "Management",
      items: managementItems,
    });
  }

  const toolItems = [
    { label: "Approvals", to: `${primaryRoute}/approvals`, icon: ClipboardCheck },
    { label: "Settings", to: `${primaryRoute}/settings`, icon: Settings },
  ];

  sections.push({
    title: "Operational",
    items: toolItems,
  });

  return sections;
};

