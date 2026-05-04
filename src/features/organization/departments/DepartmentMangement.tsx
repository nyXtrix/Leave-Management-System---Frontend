import React from "react";
import DepartmentCard from "./DepartmentCard";
import IconButton from "@/components/ui/IconButton";
import { Plus, Search } from "lucide-react";
import DepartmentCreateOrEditModel from "./DepartmentCreateOrEditModel";
import Pagination from "@/components/tables/Pagination";
import { departmentService } from "@/services/department.service";
import InputWithIcon from "@/components/common/inputs/InputWithIcon";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@/hooks/useQuery";
import type { DepartmentResponse } from "@/types/organization.types";

const DepartmentMangement = () => {
  const [createModal, setCreateModal] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");
  const debouncedSearch = useDebounce(searchTerm);
  const PAGE_SIZE = 8;

  React.useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const { data, isLoading, refetch } = useQuery(
    departmentService.getDepartments,
    [{ page: currentPage, pageSize: PAGE_SIZE, searchTerm: debouncedSearch }],
  );

  const departments: DepartmentResponse[] = data?.items || [];
  const totalCount = data?.totalCount || 0;

  const handleCreateDepartment = async (payload: { name: string; description: string }) => {
    try {
      await departmentService.createDepartment(payload);
      refetch();
      setCreateModal(false);
    } catch (error) {
      console.error("Failed to create department:", error);
    }
  };

  const handleUpdateDepartment = async (id: string, payload: { name: string; description: string }) => {
    try {
      await departmentService.updateDepartment(id, payload);
      refetch();
    } catch (error) {
      console.error("Failed to update department:", error);
    }
  };

  const handleDeleteDepartment = async (id: string) => {
    try {
      await departmentService.deleteDepartment(id);
      refetch();
    } catch (error) {
      console.error("Failed to delete department:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-280px)]">
      <div className="flex-1 space-y-6 animate-reveal">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-800">
              Departments ({totalCount})
            </h2>
            <p className="text-sm text-secondary-500 font-medium">
              Manage organizational units and staff distribution
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-64">
              <InputWithIcon
                icon={Search}
                placeholder="Search departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 rounded-xl"
              />
            </div>
            <IconButton icon={Plus} onClick={() => setCreateModal(true)}>
              Create Department
            </IconButton>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-10">
          {isLoading
            ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <div key={i} className="h-44 rounded-2xl bg-slate-100 animate-pulse" />
              ))
            : departments.map((department) => (
                <DepartmentCard
                  key={department.id}
                  id={department.id}
                  departmentName={department.departmentName}
                  description={department.description}
                  totalEmployees={department.totalEmployees}
                  leaveCount={department.leaveCount}
                  leavePercentage={department.leavePercentage}
                  leavePreview={department.leavePreview}
                  onDelete={handleDeleteDepartment}
                  onUpdate={handleUpdateDepartment}
                />
              ))}
        </div>
      </div>

      <div className="sticky bottom-0 z-10 mt-auto">
        <Pagination
          page={currentPage}
          totalResults={totalCount}
          pageSize={PAGE_SIZE}
          onPageChange={setCurrentPage}
          className="w-full rounded-b-xl"
        />
      </div>

      <DepartmentCreateOrEditModel
        mode={"CREATE"}
        isOpen={createModal}
        onClose={() => setCreateModal(false)}
        onSubmit={handleCreateDepartment}
      />
    </div>
  );
};

export default DepartmentMangement;