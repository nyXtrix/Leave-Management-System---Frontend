import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { UserPlus, ShieldPlus, BadgeCheck } from "lucide-react";
import UserOnboardForm from "./UserOnboardForm";
import FileUploader from "@/components/common/inputs/FileUploader";

const UserOnboardManagement = () => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 animate-reveal">
      <div className="space-y-4">
        <div>
          <h6 className="text-2xl font-bold text-secondary-600 tracking-tight flex items-center gap-2">
            <UserPlus className="h-6 w-6 text-primary-500" />
            New Employee <span className="text-primary-500">Onboarding</span>
          </h6>
          <p className="text-slate-500 font-medium mt-1">
            Initialize a new employee profile with role-based access and
            reporting structures.
          </p>
        </div>
        <UserOnboardForm />
      </div>
    </div>
  );
};

export default UserOnboardManagement;
