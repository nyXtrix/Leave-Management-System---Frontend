import { UserPlus } from "lucide-react";
import EmployeeFilterHeader from "./components/EmployeeFilterHeader";
import EmployeeCard from "./components/EmployeeCard";
import IconButton from "@/components/ui/IconButton";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Pagination from "@/components/tables/Pagination";
import { useQuery } from "@/hooks/useQuery";
import { employeeService } from "@/services/employee.service";
import { useState } from "react";
import Loader from "@/components/common/Loader";
import EmptyState from "@/components/common/EmptyState";
import { UserRound } from "lucide-react";

const EmployeesManagement = () => {
  const navigate = useNavigate();
  const { subdomain } = useParams();
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    departmentId: "",
    status: undefined as number | undefined
  });

  const { data: response, isLoading } = useQuery(
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
    navigate(`/${currentSubdomain}/profile/${employeeId}`);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPage(1);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-210px)] animate-reveal">
      <div className="flex items-center justify-between w-full gap-4 border-b sticky top-0 bg-white z-10 pb-3 mb-6">
        <EmployeeFilterHeader 
          onSearch={handleSearch}
          onFilterChange={(newFilters) => {
            setFilters(prev => ({ ...prev, ...newFilters }));
            setPage(1);
          }}
        />
        <div className="border-l pl-4 border-secondary-300">
          <IconButton
            icon={UserPlus}
            onClick={handleOnboardEmployee}
            className="font-semibold"
          >
            Onboard Employee
          </IconButton>
        </div>
      </div>

      {isLoading ? (
        <div className="h-64 flex items-center justify-center flex-1">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
          </div>
          <div className="sticky bottom-0 bg-white pt-4 border-t border-slate-100 z-10 mt-auto">
            <Pagination
              page={page}
              totalResults={response?.totalCount || 0}
              pageSize={12}
              onPageChange={setPage}
              className="w-full rounded-b-xl"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeesManagement;
