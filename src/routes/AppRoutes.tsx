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
import { ProtectedRoute as AuthProtectedRoute } from '@/components/auth/ProtectedRoute';
import { GuestRoute } from '@/components/auth/GuestRoute';
import HomeLayout from '@/components/layout/HomeLayout';
import ContactPage from '@/pages/ContactPage';
import AuthLayout from '@/components/layout/AuthLayout';
import Loader from '@/components/common/Loader';
import { PermissionGuard } from '@/components/common/PermissionGuard';
import EmployeeProfile from '@/pages/EmployeeProfile';
import { TeamPage } from '@/pages/TeamPage';
import { CalendarPage } from '@/pages/CalendarPage';
import { SetPasswordPage } from '@/pages/SetPasswordPage';

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
        <Route path="/set-password" element={<SetPasswordPage />} />
        <Route path="/forgot-password" element={<></>} />
      </Route>

      <Route
        path="/:subdomain"
        element={
          <AuthProtectedRoute>
            <AppLayout />
          </AuthProtectedRoute>
        }
      >
        <Route path="dashboard" element={
          <PermissionGuard moduleId="DASHBOARD">
            <DashboardPage />
          </PermissionGuard>
        } />
        
        <Route path="employee/profile/:employeeId" element={
          <PermissionGuard moduleId="EMPLOYEE_MGMT" action="VIEW">
            <EmployeeProfile />
          </PermissionGuard>
        } />
        
        <Route path="leaves" element={
          <PermissionGuard moduleId="MY_LEAVES">
            <LeavesPage />
          </PermissionGuard>
        } />

        <Route path="team" element={
          <TeamPage />
        } />

        <Route path="calendar" element={
          <CalendarPage />
        } />
        
        <Route path="approvals" element={
          <PermissionGuard moduleId="APPROVALS">
            <ApprovalsPage />
          </PermissionGuard>
        } />
        
        <Route path="leave-management" element={
          <PermissionGuard moduleId="LEAVE_MGMT">
            <LeaveManagementPage />
          </PermissionGuard>
        } />
        
        <Route path="policy" element={
          <PermissionGuard moduleId="POLICY">
            <PolicyPage />
          </PermissionGuard>
        } />
        
        <Route path="employees" element={
          <PermissionGuard moduleId="EMPLOYEE_MGMT">
            <EmployeesPage />
          </PermissionGuard>
        } />
        
        <Route path="employees/invite" element={
          <PermissionGuard moduleId="EMPLOYEE_MGMT" action="CREATE">
            <InviteUserPage />
          </PermissionGuard>
        } />

        
        <Route path="organization" element={
          <PermissionGuard moduleId="ORGANIZATION">
            <OrganizationPage />
          </PermissionGuard>
        } />
        
        <Route path="profile" element={
          <PermissionGuard moduleId="PROFILE">
            <EmployeeProfile />
          </PermissionGuard>
        } />
        
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>

      <Route path="/unauthorized" element={
        <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50">
          <h1 className="text-4xl font-black text-rose-500 tracking-tight">403</h1>
          <p className="text-slate-500 font-medium">You do not have permission to view this page.</p>
        </div>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
