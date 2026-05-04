import { Pencil, Trash2 } from "lucide-react";
import IconButton from "@/components/ui/IconButton";
import { Switch } from "@/components/ui/Switch";
import { Button } from "@/components/ui/Button";
import type { Column } from "@/types/dataTable.types";
import type { Role } from "@/types/organization.types";

interface RoleColumnsProps {
  onToggleActive: (id: string, isActive: boolean) => void;
  onViewPermissions: (role: Role) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const getRoleColumns = ({
  onToggleActive,
  onViewPermissions,
  onEdit,
  onDelete,
}: RoleColumnsProps): Column<Role>[] => [
  {
    key: "name",
    header: "Role",
    sortable: true,
    render: (_, row) => (
      <div>
        <p className="text-sm font-medium text-slate-900">{row.name}</p>
        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
          {row.description}
        </p>
      </div>
    ),
  },
  {
    key: "isActive",
    header: "Status",
    render: (_, row) => (
      <div className="flex items-center gap-2">
        <Switch
          checked={row.isActive}
          onCheckedChange={(v) => onToggleActive(row.id, v)}
        />
        <span
          className={`text-xs font-medium ${row.isActive ? "text-emerald-600" : "text-slate-400"}`}
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      </div>
    ),
  },
  {
    key: "permissions",
    header: "Permissions",
    render: (_, row) => (
      <Button
        onClick={() => onViewPermissions(row)}
        className="text-sm p-0"
        variant="link"
      >
        View Permissions
      </Button>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    render: (_, row) => {
      const isSystemRole = row.type === "SYSTEM";
      return (
        <div className="flex items-center gap-2">
          <IconButton
            icon={Pencil}
            onClick={() => onEdit(row.id)}
            className="text-sm p-2 rounded-md h-8 w-8"
            variant="secondary"
            disabled={isSystemRole}
            title={isSystemRole ? "System roles cannot be modified" : "Edit role"}
          />
          <IconButton
            icon={Trash2}
            onClick={() => onDelete(row.id)}
            className="text-sm p-2 rounded-md h-8 w-8"
            variant="destructive"
            disabled={isSystemRole}
            title={isSystemRole ? "System roles cannot be deleted" : "Delete role"}
          />
        </div>
      );
    },
  },
];