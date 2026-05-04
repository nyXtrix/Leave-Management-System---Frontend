import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { UserPlus, ShieldPlus, BadgeCheck } from "lucide-react";
import UserOnboardForm from "./UserOnboardForm";
import FileUploader from "@/components/common/inputs/FileUploader";

import { useParams, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb";
import UserOnboardFlow from "./UserOnboardFlow";
import SectionCard from "@/components/common/SectionCard";
import IconButton from "@/components/ui/IconButton";
import UploadFileInstructions from "./UploadFileInstructions";
import RecentInvitations from "./RecentInvitations";
import { useQuery } from "@/hooks/useQuery";
import { employeeService } from "@/services/employee.service";

const UserOnboardManagement = () => {
  const { subdomain } = useParams<{ subdomain: string }>();
  const [isInstructionsOpen, setIsInstructionsOpen] = React.useState(false);
  const [isResendInvitationModalOpen, setIsResendInvitationModalOpen] = React.useState(false);

  const { data: recentInvites, isLoading } = useQuery(
    employeeService.getRecentInvites,
    []
  );


  return (
    <div className="space-y-6 animate-reveal">
      <div className="space-y-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/${subdomain}/employees`}>Employees</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Onboard Employee</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="grid lg:grid-cols-10 gap-4">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <UserOnboardForm />
            <RecentInvitations 
              recentInvites={(recentInvites || []) as any} 
              isOpen={isResendInvitationModalOpen} 
              onClose={() => setIsResendInvitationModalOpen(false)}
              onOpen={() => setIsResendInvitationModalOpen(true)}
            />
          </div>
          <div className="lg:col-span-3 flex flex-col gap-4">
             <SectionCard
              title="Bulk User Onboarding"
              info="Upload user data to create multiple users"
              tooltipAlign="end"
            >
              <FileUploader
                title={
                  <div className="flex justify-center items-center gap-2">
                    Upload File
                    <IconButton
                      variant="link"
                      size="sm"
                      className="h-auto p-0 font-bold"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsInstructionsOpen(true);
                      }}
                    >
                      (Instructions)
                    </IconButton>
                  </div>
                }
                description="Supports CSV, XLSX, XLS (Max 5MB)"
                accept=".csv,.xlsx,.xls"
                maxSize={5 * 1024 * 1024}
                onConfirm={() => {}}
              />
            </SectionCard>
            <SectionCard 
              title="How Onboarding Works" 
              info="A quick overview of the employee invitation flow" 
              tooltipAlign="end"
              className="flex-1 flex flex-col"
              contentClassName="flex-1"
            >
              <UserOnboardFlow />
            </SectionCard>

           
          </div>
        </div>

      </div>

      <UploadFileInstructions
        isOpen={isInstructionsOpen}
        onClose={() => setIsInstructionsOpen(false)}
      />
    </div>
  );
};

export default UserOnboardManagement;
