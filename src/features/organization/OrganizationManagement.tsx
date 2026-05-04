import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import DepartmentManagement from "./departments/DepartmentMangement";
import RolesManagement from "./roles/RolesManagement";

const OrganizationManagement = () => {
  const [activeTab, setActiveTab] = useState("departments");

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
        </TabsList>

        <TabsContent value="departments">
          <DepartmentManagement />
        </TabsContent>

        <TabsContent value="roles">
          <RolesManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrganizationManagement;
