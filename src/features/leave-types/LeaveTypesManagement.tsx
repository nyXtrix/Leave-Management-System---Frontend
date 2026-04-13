import React from "react";
import LeaveTypeCard from "./LeaveTypeCard";

const LeaveTypesManagement = () => {
  return (
    <div className="grid grid-cols-4 gap-3">
      <LeaveTypeCard />
      <LeaveTypeCard />
      <LeaveTypeCard />
      <LeaveTypeCard />
    </div>
  );
};

export default LeaveTypesManagement;
