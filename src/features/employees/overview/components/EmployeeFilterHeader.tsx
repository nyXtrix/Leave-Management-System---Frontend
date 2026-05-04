import { Search, Building2, GanttChart } from "lucide-react";
import InputWithIcon from "@/components/common/inputs/InputWithIcon";
import SelectInput from "@/components/common/inputs/SelectInput";
import { useLookups } from "@/hooks/useLookups";

interface EmployeeFilterHeaderProps {
  onSearch: (term: string) => void;
  onFilterChange: (filters: { departmentId?: string; status?: number }) => void;
}

const STATUS_OPTIONS = [
  { label: "All Statuses", value: "" },
  { label: "Active", value: 2 },
  { label: "Pending", value: 1 },
  { label: "Inactive", value: 3 },
  { label: "Terminated", value: 4 },
];

const EmployeeFilterHeader = ({ onSearch, onFilterChange }: EmployeeFilterHeaderProps) => {
  const { departments } = useLookups();

  const deptOptions = [
    { label: "All Departments", value: "" },
    ...(departments.data?.map(d => ({ label: d.label, value: d.value })) || [])
  ];

  return (
    <div className="flex items-center gap-4 py-3 w-full">
      <div className="w-56 shrink-0">
        <SelectInput
          options={deptOptions}
          icon={Building2}
          placeholder="Department"
          onChange={(val) => onFilterChange({ departmentId: String(val) })}
        />
      </div>
      <div className="w-48 shrink-0">
        <SelectInput
          options={STATUS_OPTIONS}
          placeholder="Status"
          icon={GanttChart}
          onChange={(val) => onFilterChange({ status: typeof val === "number" ? val : undefined })}
        />
      </div>
      
      <div className="flex-1">
        <InputWithIcon
          icon={Search}
          placeholder="Search personnel registry..."
          onChange={(e) => onSearch(e.target.value)}
          className="bg-slate-50/50 border-slate-200/60 h-11 transition-all focus:bg-white"
          wrapperClassName="!space-y-0"
          iconClassName="h-4.5 w-4.5 text-slate-400 group-focus-within/input:text-primary-500"
        />
      </div>
    </div>
  );
};

export default EmployeeFilterHeader;
