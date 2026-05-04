import type { HomeNavSection } from "@/types/utils";
import type { UserProfile } from "@/types/auth.types";
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
  CalendarDays,
  User,
} from "lucide-react";

export const ROUTES = {
  dashboard: "/",
  leaves: "/leaves",
  approvals: "/approvals",
  employees: "/employees",
  profile: "/profile",
  orgChart: "/organization",
  team: "/team",
  calendar: "/calendar",
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

  const overviewItems = [];
  if (
    permissions["DASHBOARD"]?.actions?.includes("VIEW") ||
    !permissions["DASHBOARD"]
  ) {
    overviewItems.push({
      label: "Dashboard",
      to: `${primaryRoute}/dashboard`,
      icon: LayoutDashboard,
    });
  }
  if (permissions["MY_LEAVES"]?.actions?.includes("VIEW")) {
    overviewItems.push({
      label: "My Leaves",
      to: `${primaryRoute}/leaves`,
      icon: CalendarRange,
    });
  }
  if (permissions["ORGANIZATION"]?.actions?.includes("VIEW")) {
    overviewItems.push({
      label: "Organization",
      to: `${primaryRoute}/organization`,
      icon: Network,
    });
  }
  if (permissions["TEAM"]?.actions?.includes("VIEW")) {
    overviewItems.push({
      label: "Team",
      to: `${primaryRoute}/team`,
      icon: Users2,
    });
  }
  if (permissions["CALENDAR"]?.actions?.includes("VIEW")) {
    overviewItems.push({
      label: "Calendar",
      to: `${primaryRoute}/calendar`,
      icon: CalendarDays,
    });
  }

  if (overviewItems.length > 0) {
    sections.push({
      title: "Overview",
      items: overviewItems,
    });
  }

  const managementItems = [];
  if (permissions["POLICY"]?.actions?.includes("VIEW")) {
    managementItems.push({
      label: "Leave Policy",
      to: `${primaryRoute}/policy`,
      icon: ShieldCheck,
    });
  }
  if (permissions["LEAVE_MGMT"]?.actions?.includes("VIEW")) {
    managementItems.push({
      label: "Leave Management",
      to: `${primaryRoute}/leave-management`,
      icon: Sparkles,
    });
  }
  if (permissions["EMPLOYEE_MGMT"]?.actions?.includes("VIEW")) {
    managementItems.push({
      label: "Manage Employees",
      to: `${primaryRoute}/employees`,
      icon: Users,
    });
  }

  if (managementItems.length > 0) {
    sections.push({
      title: "Management",
      items: managementItems,
    });
  }

  const toolItems = [];
  if (permissions["APPROVALS"]?.actions?.includes("VIEW")) {
    toolItems.push({
      label: "Approvals",
      to: `${primaryRoute}/approvals`,
      icon: ClipboardCheck,
    });
  }
  if (permissions["PROFILE"]?.actions?.includes("VIEW")) {
    toolItems.push({
      label: "Profile",
      to: `${primaryRoute}/profile`,
      icon: User,
    });
  }

  if (toolItems.length > 0) {
    sections.push({
      title: "Operational",
      items: toolItems,
    });
  }

  return sections;
};
