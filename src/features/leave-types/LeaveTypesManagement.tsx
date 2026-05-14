import React, { useState } from "react";
import { Plus, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  leavePolicyService,
  type LeaveType,
} from "@/services/leavePolicy.service";
import LeaveTypeCard from "./LeaveTypeCard";
import CreateOrEditLeaveTypeModal from "./components/CreateOrEditLeaveTypeModal";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { useQuery, invalidateQuery } from "@/hooks/useQuery";
import EmptyState from "@/components/common/EmptyState";
import IconButton from "@/components/ui/IconButton";
import ManagementLayout from "@/components/common/ManagementLayout";
import { Search } from "lucide-react";
import { useModulePermissions } from "@/hooks/usePermission";

import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import { invalidateLookup } from "@/store/slices/lookupSlice";

const LeaveTypesManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedType, setSelectedType] = useState<LeaveType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeToDelete, setTypeToDelete] = useState<LeaveType | null>(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const PAGE_SIZE = 8;
  const { canCreate, canUpdate, canDelete } = useModulePermissions("LEAVE_MGMT");

  const { data: response, isLoading, refetch } = useQuery(
    leavePolicyService.getLeaveTypes,
    [{ 
      page, 
      pageSize: PAGE_SIZE,
      searchTerm
    }],
    { showGlobalLoader: false }
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleOpenModal = React.useCallback((type: LeaveType | null = null) => {
    const safeType = type && (type as any).externalId ? type : null;
    setSelectedType(safeType);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setSelectedType(null);
    setIsModalOpen(false);
  };

  const handleSaveLeaveType = async (data: any) => {
    if (selectedType) {
      await leavePolicyService.updateLeaveType(selectedType.externalId, data);
    } else {
      await leavePolicyService.createLeaveType(data);
    }
    invalidateQuery("getLeaveTypes");
    await refetch();
    dispatch(invalidateLookup("leaveTypes"));
    handleCloseModal();
  };

  const handleConfirmDelete = async () => {
    if (!typeToDelete) return;
    await leavePolicyService.deleteLeaveType(typeToDelete.externalId);
    invalidateQuery("getLeaveTypes");
    await refetch();
    dispatch(invalidateLookup("leaveTypes"));
    setTypeToDelete(null);
  };

  return (
    <>
      <ManagementLayout
        headerProps={{
          onRefresh: () => refetch(),
          onSearch: handleSearchChange,
          searchPlaceholder: "Search leave categories...",
          actions: canCreate && (
            <IconButton
              onClick={() => handleOpenModal(null)}
              type="button"
              className="flex items-center gap-2"
              icon={Plus}
            >
              Create Leave Type
            </IconButton>
          ),
        }}
        paginationProps={{
          page,
          totalResults: response?.totalCount || 0,
          pageSize: PAGE_SIZE,
          onPageChange: setPage,
        }}
        isLoading={isLoading && !response}
        isEmpty={response?.items.length === 0 && !isLoading}
        emptyState={
          <EmptyState
            title={searchTerm ? "No Match Found" : "No Leave Types Defined"}
            description={searchTerm ? "Try adjusting your search criteria." : "Get started by creating your organization's first leave category."}
            icon={searchTerm ? Search : LayoutGrid}
            className="py-20"
          />
        }
      >
        <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4 animate-reveal">
          {response?.items.map((type) => (
            <LeaveTypeCard 
              key={type.externalId} 
              type={type} 
              onEdit={handleOpenModal}
              onDelete={() => setTypeToDelete(type)}
              canUpdate={canUpdate}
              canDelete={canDelete}
            />
          ))}

          {canCreate && response && response.items.length > 0 && response.items.length < 4 && !searchTerm && (
            <Button
              onClick={() => handleOpenModal(null)}
              variant='ghost'
              size='lg'
              className="h-full min-h-55 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-4 text-slate-400 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                <Plus className="h-6 w-6" />
              </div>
              <span className="font-black tracking-tight">
                Add Another Type
              </span>
            </Button>
          )}
        </div>
      </ManagementLayout>

      <CreateOrEditLeaveTypeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSaveLeaveType}
        type={selectedType}
      />

      <ConfirmationModal
        isOpen={!!typeToDelete}
        onClose={() => setTypeToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Leave Type"
        message={`Are you sure you want to delete "${typeToDelete?.name}"? This action cannot be undone and may affect existing leave requests.`}
        confirmText="Delete Leave Type"
        variant="danger"
      />
    </>
  );
};

export default LeaveTypesManagement;
