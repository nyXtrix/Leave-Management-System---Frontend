import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { LeavesPage } from '@/pages/LeavesPage';
import { ApprovalsPage } from '@/pages/ApprovalsPage';
import { EmployeesPage } from '@/pages/EmployeesPage';
import { OrganizationPage } from '@/pages/OrganizationPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { LoginPage } from '@/pages/LoginPage';
import { LandingPage } from '@/pages/LandingPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { AuthCallbackPage } from '@/pages/AuthCallbackPage';
import { PolicyPage } from '@/pages/PolicyPage';
import { LeaveManagementPage } from '@/pages/LeaveManagementPage';
import { InviteUserPage } from '@/pages/InviteUserPage';
import { RolesPage } from '@/pages/RolesPage';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { GuestRoute } from '@/components/auth/GuestRoute';
import HomeLayout from '@/components/layout/HomeLayout';
import ContactPage from '@/pages/ContactPage';
import AuthLayout from '@/components/layout/AuthLayout';
import Loader from '@/components/common/Loader';

export function AppRoutes() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <Loader fullPage />;
  }

  return (
    <Routes>
      <Route
        element={
          <GuestRoute>
            <HomeLayout />
          </GuestRoute>
        }
      >
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      <Route
        element={
          <GuestRoute>
            <AuthLayout />
          </GuestRoute>
        }
      >
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route path="/set-password" element={<></>} />
        <Route path="/forgot-password" element={<></>} />
      </Route>

      <Route
        path="/:subdomain"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="leaves" element={<LeavesPage />} />
        <Route path="approvals" element={<ApprovalsPage />} />
        <Route path="leave-management" element={<LeaveManagementPage />} />
        <Route path="policy" element={<PolicyPage />} />
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="employees/invite" element={<InviteUserPage />} />
        <Route path="organization" element={<OrganizationPage />} />
        <Route path="organization/roles" element={<RolesPage />} />
        <Route path="settings" element={<SettingsPage />} />
        
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
