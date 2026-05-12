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
import { Progress } from "@/components/ui/Progress";
import { toast } from "sonner";

const UserOnboardManagement = () => {
  const { subdomain } = useParams<{ subdomain: string }>();
  const [isInstructionsOpen, setIsInstructionsOpen] = React.useState(false);
  const [isResendInvitationModalOpen, setIsResendInvitationModalOpen] = React.useState(false);
  
  const [activeJobId, setActiveJobId] = React.useState<string | null>(null);
  const [activeJob, setActiveJob] = React.useState<any>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const { data: recentInvites, isLoading, refetch: refetchRecentInvites } = useQuery(
    employeeService.getRecentInvites,
    []
  );

  React.useEffect(() => {
    const checkActiveJob = async () => {
      try {
        const result = await employeeService.getActiveBulkUpload();
        if (result?.externalId) {
          setActiveJobId(result.externalId);
          setIsProcessing(true);
        }
      } catch (error) {
        console.error("Failed to check active bulk upload:", error);
      }
    };
    checkActiveJob();
  }, []);

  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isProcessing && activeJobId) {
      const poll = async () => {
        try {
          const bulkUserInvite = await employeeService.getBulkUploadStatus(activeJobId);
          if (!bulkUserInvite || bulkUserInvite.status > 2) {
            setIsProcessing(false);
            setActiveJob(null);
            setActiveJobId(null);
            refetchRecentInvites();
            
            if (bulkUserInvite?.status === 3) toast.success("Bulk upload completed successfully");
            if (bulkUserInvite?.status === 4) toast.error("Bulk upload failed: " + (bulkUserInvite?.errorMessage || "Unknown error"));
            if (bulkUserInvite?.status === 5) toast.warning("Bulk upload completed with some errors");
          } else {
            setActiveJob(bulkUserInvite);
          }
        } catch (error) {
          console.error("Polling error:", error);
        }
      };

      poll();
      interval = setInterval(poll, 50000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isProcessing, activeJobId, refetchRecentInvites]);

  const progressPercent = activeJob 
    ? (activeJob.totalRows > 0 ? Math.round((activeJob.processedRows / activeJob.totalRows) * 100) : 0)
    : 0;


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
              <div className="space-y-4">
                {isProcessing && activeJob ? (
                  <div className="flex flex-col items-center justify-center min-h-[162px] p-6 rounded-xl bg-primary/5 border border-secondary-200 space-y-4 animate-in fade-in zoom-in-95 duration-500">
                    <div className="w-full space-y-4">
                      <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-primary flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          Processing Data...
                        </span>
                        <span className="text-primary/80">{progressPercent}%</span>
                      </div>
                      <Progress value={progressPercent} className="h-2.5 bg-primary/10" />
                      <div className="flex justify-between text-[10px] text-secondary-500 font-bold">
                        <span className="flex items-center gap-1.5">
                          <span className="text-secondary-300">Total</span>
                          {activeJob.totalRows}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="text-secondary-300">Processed</span>
                          {activeJob.processedRows}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
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
                    onConfirm={async (file) => {
                      if (file) {
                        try {
                          const response = await employeeService.uploadBulkUsers(file);
                          if (response.bulkInvitedId) {
                            setActiveJobId(response.bulkInvitedId);
                            setIsProcessing(true);
                          }
                        } catch (err) {
                          // Error handled by BaseRequestProvider toast
                        }
                      }
                    }}
                  />
                )}
              </div>
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
