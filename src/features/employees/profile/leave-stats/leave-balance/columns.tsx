import type { Column } from "@/types/dataTable.types";
import type { LeaveBalance } from "@/types/leave.types";

export interface LeaveBalanceRecord extends LeaveBalance {
  id: string;
}

export const columns: Column<LeaveBalanceRecord>[] = [
  { key: "label", header: "Leave Type", sortable: true },
  { key: "total", header: "Total", sortable: true },
  { key: "used", header: "Used", sortable: true },
  {
    key: "available",
    header: "Available",
    sortable: true,
    render: (val) => (
      <span
        className={
          Number(val) === 0
            ? "text-red-500 font-semibold"
            : "text-secondary-600 font-semibold"
        }
      >
        {String(val)}
      </span>
    ),
  },
];
