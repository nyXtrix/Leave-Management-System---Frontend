import React from "react";
import { Building2, ArrowRight, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import IconButton from "@/components/ui/IconButton";
import DepartmentCreateOrEditModel from "./DepartmentCreateOrEditModel";
import DropdownActions from "@/components/common/DropdownActions";
import ConfirmationModal from "@/components/common/ConfirmationModal";

interface DepartmentCardProps {
  id: string;
  departmentName: string;
  description?: string;
  totalEmployees: number;
  leaveCount: number;
  leavePercentage: number;
  leavePreview?: string[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: { name: string; description: string }) => void;
  isDeleting?: boolean;
  isUpdating?: boolean;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({
  id,
  departmentName,
  description = "",
  totalEmployees,
  leaveCount,
  leavePercentage,
  leavePreview = [],
  onDelete,
  onUpdate,
  isDeleting = false,
  isUpdating = false,
}) => {
  const [editModal, setEditModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);

  const handleDelete = () => {
    onDelete(id);
    setDeleteModal(false);
  };

  const handleUpdate = (data: { name: string; description: string }) => {
    onUpdate(id, data);
    setEditModal(false);
  };

  const getImpactStatus = () => {
    if (leavePercentage < 10) {
      return { label: "Normal", className: "text-secondary-500" };
    }
    if (leavePercentage <= 25) {
      return { label: "Moderate", className: "text-primary-500" };
    }
    return { label: "High", className: "text-primary-600" };
  };

  const status = getImpactStatus();

  const safePreview = leavePreview.slice(0, 2);

  const renderLeavePreview = () => {
    if (safePreview.length === 0) return null;

    return (
      <p className="text-sm text-secondary-500">
        {safePreview.join(", ")}
        {leaveCount > safePreview.length && (
          <span className="ml-1 text-secondary-400">
            +{leaveCount - safePreview.length}
          </span>
        )}
      </p>
    );
  };

  return (
    <>
      <div
        className={cn(
          "group flex flex-col w-full p-5 rounded-lg bg-gray-100/60",
          "border border-secondary-200 shadow-premium",
          "hover:shadow-glow-primary transition-all duration-300",
        )}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary-100 text-secondary-700">
            <Building2 className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              {departmentName}
            </h3>
            <p className="text-xs text-secondary-500">
              {totalEmployees} employees
            </p>
          </div>

          <div className="ml-auto">
            <DropdownActions
              actions={[
                {
                  label: "Edit",
                  icon: Pencil,
                  onClick: () => setEditModal(true),
                },
                {
                  label: "Delete",
                  icon: Trash2,
                  onClick: () => setDeleteModal(true),
                  variant: "danger",
                },
              ]}
            />
          </div>
        </div>

        <div className="mb-3">
          <div className="flex items-end justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-foreground">
                {leaveCount}
              </span>
              <span className="text-sm text-secondary-500">on leave</span>
            </div>

            <span className="text-sm text-secondary-500">
              {leavePercentage}%
            </span>
          </div>
        </div>

        <div className="h-2 w-full bg-secondary-200 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(leavePercentage, 100)}%` }}
          />
        </div>

        <div className="mb-4">{renderLeavePreview()}</div>

        <div className="mt-auto flex items-center justify-between">
          <span className={cn("text-xs font-medium", status.className)}>
            {status.label} leave
          </span>
        </div>
      </div>
      <DepartmentCreateOrEditModel
        mode={"EDIT"}
        isOpen={editModal}
        initialData={{ name: departmentName, description }}
        onClose={() => setEditModal(false)}
        onSubmit={handleUpdate}
        isLoading={isUpdating}
      />

      <ConfirmationModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={
          totalEmployees > 0 ? () => setDeleteModal(false) : handleDelete
        }
        title={
          totalEmployees > 0 ? "Cannot Delete Department" : "Delete Department"
        }
        message={
          totalEmployees > 0 ? (
            <span>
              The <strong className="text-slate-900">"{departmentName}"</strong>{" "}
              department currently has{" "}
              <strong className="text-primary-600">
                {totalEmployees} employees
              </strong>
              . Please move all employees to other departments before attempting
              to delete this department.
            </span>
          ) : (
            <span>
              Are you sure you want to delete the{" "}
              <strong className="text-slate-900">"{departmentName}"</strong>{" "}
              department? This action cannot be undone.
            </span>
          )
        }
        confirmText={totalEmployees > 0 ? "Ok" : "Delete Department"}
        variant={totalEmployees > 0 ? "warning" : "danger"}
        showCancelButton={totalEmployees === 0}
        isLoading={isDeleting}
      />
    </>
  );
};

export default DepartmentCard;
