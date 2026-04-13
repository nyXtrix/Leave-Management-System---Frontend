import { Badge } from "@/components/ui/Badge";
import IconButton from "@/components/ui/IconButton";
import { Pencil, Trash } from "lucide-react";
import React from "react";

const LeaveTypeCard = () => {
  return (
    <div className="border p-4 rounded-xl">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold">Sick Leave</h3>
          <p className="text-sm text-gray-500">Paid Leave</p>
        </div>
        <Badge variant="success" className="text-xs">
          Active
        </Badge>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-base text-gray-500 font-medium">Total Days</p>
        <p className="text-base font-semibold">12</p>
      </div>

      <div className="flex items-center justify-end gap-2 mt-4">
        <IconButton
          icon={Pencil}
          size="sm"
          variant="ghost"
          className="p-2 rounded-lg"
        />
        <IconButton
          icon={Trash}
          size="sm"
          variant="ghost"
          className="p-2 rounded-lg"
        />
      </div>
    </div>
  );
};

export default LeaveTypeCard;
