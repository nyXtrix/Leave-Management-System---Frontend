import React from "react";
import Modal from "@/components/ui/Modal";
import PermissionsGrid, { type PermissionItem } from "../PermissionsGrid";

import type { Role, RolePermissionDto } from "@/types/organization.types";

interface ViewPermissionModelProps {
  isOpen: boolean;
  onClose: () => void;
  role: Role | null;
}

const ViewPermissionModel = ({ isOpen, onClose, role }: ViewPermissionModelProps) => {
  const convertToPermissionItems = (perms?: Record<string, RolePermissionDto>): PermissionItem[] => {
    if (!perms) return [];
    
    return Object.entries(perms).map(([name, module]) => ({
      name,
      permissions: {
        view: module.actions.includes("VIEW"),
        create: module.actions.includes("CREATE"),
        edit: module.actions.includes("UPDATE") || module.actions.includes("EDIT"),
        delete: module.actions.includes("DELETE"),
      },
      editable: { view: false, create: false, edit: false, delete: false },
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Permissions: ${role?.name}`}
      description="Detailed view of functional access levels for this role."
      size="2xl"
    >
      {role && (
        <div className="py-2">
          <PermissionsGrid 
            data={convertToPermissionItems(role.permissions || {})} 
            className="border-none shadow-none"
          />
        </div>
      )}
    </Modal>
  );
};

export default ViewPermissionModel;