import { Badge } from "@/components/ui/Badge";
import type { Column } from "@/types/dataTable.types";
import type { LeaveRecord } from "@/types/leave.types";
import { Ban, CheckCircle2, Clock, XCircle } from "lucide-react";

export const columns: Column<LeaveRecord>[] = [
  {
    key: "leaveType",
    header: "Leave Type",
    sortable: true,
    render: (val) => (
      <span className="font-semibold text-slate-700">{String(val)}</span>
    ),
  },
  {
    key: "startDate",
    header: "Start Date",
    sortable: true,
  },
  {
    key: "endDate",
    header: "End Date",
    sortable: true,
  },
  {
    key: "duration",
    header: "Duration",
    render: (val) => (
      <span className="font-semibold text-secondary-500">
        {String(val)} {Number(val) > 1 ? "Days" : "Day"}
      </span>
    ),
    sortable: true,
  },
  {
    key: "status",
    header: "Status",
    render: (val) => {
      const status = String(val);
      if (status === "Approved")
        return (
          <Badge variant="success" className="gap-1.5">
            <CheckCircle2 className="h-3 w-3" /> Approved
          </Badge>
        );
      if (status === "Pending")
        return (
          <Badge variant="warning" className="gap-1.5">
            <Clock className="h-3 w-3" /> Pending
          </Badge>
        );
      if (status === "Rejected")
        return (
          <Badge variant="danger" className="gap-1.5">
            <XCircle className="h-3 w-3" /> Rejected
          </Badge>
        );
      return (
        <Badge className="gap-1.5">
          <Ban className="h-3 w-3" /> Cancelled
        </Badge>
      );
    },
    sortable: true,
  },
];
