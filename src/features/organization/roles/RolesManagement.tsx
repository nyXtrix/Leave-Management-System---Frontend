import React, { useState } from "react";
import { LayersPlus, Plus } from "lucide-react";
import RoleCreationForm from "./RoleCreationForm";
import Modal from "@/components/ui/Modal";
import IconButton from "@/components/ui/IconButton";
import { DataTable } from "@/components/tables/DataTable";
import { roleService } from "@/services/role.service";
import type { Role } from "@/types/organization.types";
import ViewPermissionModel from "./components/ViewPermissionModel";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { useConfirmation } from "@/hooks/useConfirmation";
import { getRoleColumns } from "./columns";
import { useQuery } from "@/hooks/useQuery";

const RolesManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [formState, setFormState] = useState({
    isValid: false,
    isDirty: false,
  });

  const PAGE_SIZE = 6;

  const { data: rolesData, isLoading, refetch: rolesRefetch } = useQuery(
    roleService.getRoles,
    [{ page: currentPage, pageSize: PAGE_SIZE, searchTerm }],
  );

  const roles = rolesData?.items || [];
  const totalCount = rolesData?.totalCount || 0;

  const {
    isOpen: isConfirmOpen,
    config: confirmConfig,
    isLoading: isConfirmLoading,
    confirm,
    close: closeConfirm,
    handleConfirm,
  } = useConfirmation();

  const handleToggleActive = async (id: string, isActive: boolean) => {
    const role = roles.find((r) => r.id === id);
    if (!role) return;

    if (!isActive) {
      confirm({
        title: "Deactivate Role?",
        message: (
          <span>
            Are you sure you want to deactivate the{" "}
            <strong className="text-slate-900">"{role.name}"</strong> role?
            Users assigned to this role will lose their functional permissions.
          </span>
        ),
        variant: "warning",
        confirmText: "Deactivate",
        onConfirm: async () => {
          await roleService.toggleStatus(id, false);
          rolesRefetch();
        },
      });
    } else {
      await roleService.toggleStatus(id, true);
      rolesRefetch();
    }
  };

  const handleDelete = async (id: string) => {
    const role = roles.find((r) => r.id === id);
    if (!role) return;

    confirm({
      title: "Delete Role?",
      message: (
        <span>
          Are you sure you want to delete the{" "}
          <strong className="text-slate-900">"{role.name}"</strong> role? This
          action is permanent and cannot be undone.
        </span>
      ),
      variant: "danger",
      confirmText: "Delete Role",
      onConfirm: async () => {
        await roleService.deleteRole(id);
        rolesRefetch();
      },
    });
  };

  const handleEdit = (id: string) => {
    const role = roles.find((r) => r.id === id);
    if (role) {
      setSelectedRole(role);
      setIsCreateOpen(true);
    }
  };

  const handleCreateNew = () => {
    setSelectedRole(null);
    setIsCreateOpen(true);
  };

  const handleCloseCreate = () => {
    setIsCreateOpen(false);
    setSelectedRole(null);
  };

  const handleRoleSubmit = async (payload: any) => {
    if (selectedRole) {
      await roleService.updateRole(selectedRole.id, payload);
    } else {
      await roleService.createRole(payload);
    }
    rolesRefetch();
    handleCloseCreate();
  };

  const handleViewPermissions = (role: Role) => {
    setSelectedRole(role);
    setIsViewOpen(true);
  };

  const columns = getRoleColumns({
    onToggleActive: handleToggleActive,
    onViewPermissions: handleViewPermissions,
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <div className="flex flex-col min-h-[calc(100vh-280px)]">
      <div className="flex-1 space-y-6 animate-reveal">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Roles</h2>
            <p className="text-sm text-slate-500 mt-0.5 font-medium">
              {roles.length} total roles
            </p>
          </div>
          <IconButton
            icon={Plus}
            onClick={handleCreateNew}
            className="rounded-xl shadow-glow-primary"
          >
            Create Role
          </IconButton>
        </div>

        <div className="flex-1 min-h-0">
          <DataTable
            title="Roles"
            subtitle="You can manage roles"
            data={roles}
            columns={columns}
            searchable
            totalResults={totalCount}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onSearchChange={setSearchTerm}
            pageSize={PAGE_SIZE}
            isLoading={isLoading}
            emptyMessage="No roles yet. Create one to get started."
            className="h-full"
          />
        </div>
      </div>

      <Modal
        isOpen={isCreateOpen}
        onClose={handleCloseCreate}
        title={selectedRole ? "Edit Role" : "Create Role"}
        description={
          selectedRole
            ? "Modify functional permissions and organizational boundaries."
            : "Define functional permissions and organizational boundaries."
        }
        size="3xl"
        primaryBtnIcon={LayersPlus}
        primaryBtnText={selectedRole ? "Update Role" : "Create Role"}
        primaryBtnType="submit"
        primaryBtnForm="role-form"
        primaryBtnDisabled={
          selectedRole
            ? !formState.isValid || !formState.isDirty
            : !formState.isValid
        }
      >
        <RoleCreationForm
          initialData={selectedRole}
          onSubmit={handleRoleSubmit}
          onStateChange={setFormState}
        />
      </Modal>

      <ViewPermissionModel
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        role={selectedRole}
      />

      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={closeConfirm}
        onConfirm={handleConfirm}
        title={confirmConfig.title}
        message={confirmConfig.message}
        variant={confirmConfig.variant}
        confirmText={confirmConfig.confirmText}
        isLoading={isConfirmLoading}
      />
    </div>
  );
};

export default RolesManagement;
