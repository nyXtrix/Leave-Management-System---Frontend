import { UserPlus, Building2, GanttChart, UserRound } from "lucide-react";
import EmployeeCard from "./components/EmployeeCard";
import IconButton from "@/components/ui/IconButton";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@/hooks/useQuery";
import { employeeService } from "@/services/employee.service";
import { useState } from "react";
import EmptyState from "@/components/common/EmptyState";
import SelectInput from "@/components/common/inputs/SelectInput";
import { useLookups } from "@/hooks/useLookups";
import ManagementLayout from "@/components/common/ManagementLayout";
import { EMPLOYEE_STATUS_OPTIONS } from "@/constant";

const EmployeesManagement = () => {
  const navigate = useNavigate();
  const { subdomain } = useParams();
  const { user } = useAuth();
  const { departments } = useLookups();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    departmentId: "",
    status: undefined as number | undefined
  });

  const { data: response, isLoading, refetch } = useQuery(
    employeeService.getEmployees,
    [{
      page,
      pageSize: 12,
      searchTerm,
      ...filters
    }],
    { showGlobalLoader: false }
  );

  const handleOnboardEmployee = () => {
    navigate("invite");
  };

  const handleOnViewClick = (employeeId: string) => {
    const currentSubdomain = subdomain || user?.subdomain;
    if (!currentSubdomain) return;
    navigate(`/${currentSubdomain}/employee/profile/${employeeId}`);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPage(1);
  };

  const deptOptions = [
    { label: "All Departments", value: "" },
    ...(departments.data?.map(d => ({ label: d.label, value: d.value })) || [])
  ];

  return (
    <ManagementLayout
      headerProps={{
        onRefresh() {
          refetch();
        },
        onSearch: handleSearch,
        searchPlaceholder: "Search personnel registry...",
        filters: (
          <>
            <div className="w-48">
              <SelectInput
                options={deptOptions}
                icon={Building2}
                placeholder="Department"
                size="sm"
                onChange={(val) => {
                  setFilters(prev => ({ ...prev, departmentId: String(val) }));
                  setPage(1);
                }}
              />
            </div>
            <div className="w-40">
              <SelectInput
                options={EMPLOYEE_STATUS_OPTIONS}
                placeholder="Status"
                icon={GanttChart}
                size="sm"
                onChange={(val) => {
                  setFilters(prev => ({ ...prev, status: val === "" ? undefined : Number(val) }));
                  setPage(1);
                }}
              />
            </div>
          </>
        ),
        actions: (
          <IconButton
            icon={UserPlus}
            onClick={handleOnboardEmployee}
            className="font-semibold shadow-glow-primary"
          >
            Onboard Employee
          </IconButton>
        )
      }}
      paginationProps={{
        page,
        totalResults: response?.totalCount || 0,
        pageSize: 12,
        onPageChange: setPage,
      }}
      isLoading={isLoading && !response}
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4">

        {response?.items.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onViewClick={handleOnViewClick}
          />
        ))}
        {response?.items.length === 0 && (
          <EmptyState
            title="No Employees Found"
            description="We couldn't find any employees matching your current search or filter criteria. Try adjusting your filters."
            icon={UserRound}
            className="col-span-full py-12"
          />
        )}
      </div>
    </ManagementLayout>
  );
};

export default EmployeesManagement;
