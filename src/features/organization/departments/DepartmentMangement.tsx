import React from "react";
import DepartmentCard from "./DepartmentCard";
import IconButton from "@/components/ui/IconButton";
import { Plus, Search } from "lucide-react";
import DepartmentCreateOrEditModel from "./DepartmentCreateOrEditModel";
import Pagination from "@/components/tables/Pagination";
import { departmentService } from "@/services/department.service";
import InputWithIcon from "@/components/common/inputs/InputWithIcon";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery, invalidateQuery } from "@/hooks/useQuery";
import type { DepartmentResponse } from "@/types/organization.types";
import ManagementLayout from "@/components/common/ManagementLayout";

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
    { showGlobalLoader: false }
  );

  const departments: DepartmentResponse[] = data?.items || [];
  const totalCount = data?.totalCount || 0;

  const handleCreateDepartment = async (payload: { name: string; description: string }) => {
    try {
      await departmentService.createDepartment(payload);
      invalidateQuery("getDepartments");
      refetch();
      setCreateModal(false);
    } catch (error) {
      console.error("Failed to create department:", error);
    }
  };

  const handleUpdateDepartment = async (id: string, payload: { name: string; description: string }) => {
    try {
      await departmentService.updateDepartment(id, payload);
      invalidateQuery("getDepartments");
      refetch();
    } catch (error) {
      console.error("Failed to update department:", error);
    }
  };

  const handleDeleteDepartment = async (id: string) => {
    try {
      await departmentService.deleteDepartment(id);
      invalidateQuery("getDepartments");
      refetch();
    } catch (error) {
      console.error("Failed to delete department:", error);
    }
  };

  return (
    <>
      <ManagementLayout
        containerClassName="h-[calc(100vh-280px)]"
        headerProps={{
          title: `Departments (${totalCount})`,
          subtitle: "Manage organizational units and staff distribution",
          onSearch: setSearchTerm,
          searchPlaceholder: "Search departments...",
          onRefresh: refetch,
          actions: (
            <IconButton icon={Plus} onClick={() => setCreateModal(true)}>
              Create Department
            </IconButton>
          )
        }}
        paginationProps={{
          page: currentPage,
          totalResults: totalCount,
          pageSize: PAGE_SIZE,
          onPageChange: setCurrentPage,
        }}
        isLoading={isLoading && !data}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {departments.map((department) => (
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
      </ManagementLayout>

      <DepartmentCreateOrEditModel
        mode={"CREATE"}
        isOpen={createModal}
        onClose={() => setCreateModal(false)}
        onSubmit={handleCreateDepartment}
      />
    </>
  );
};

export default DepartmentMangement;