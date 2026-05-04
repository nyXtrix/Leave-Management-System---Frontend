import React, { useState } from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export type PermissionKey = "view" | "create" | "edit" | "delete";

export type PermissionItem = {
  name: string;
  permissions: Record<PermissionKey, boolean>;
  editable: Record<PermissionKey, boolean>;
};

const initialData: PermissionItem[] = [
  {
    name: "Users",
    permissions: { view: true, create: false, edit: false, delete: false },
    editable: { view: true, create: true, edit: false, delete: false },
  },
  {
    name: "Roles",
    permissions: { view: true, create: true, edit: false, delete: false },
    editable: { view: true, create: false, edit: false, delete: false },
  },
  {
    name: "Settings",
    permissions: { view: true, create: false, edit: true, delete: false },
    editable: { view: false, create: false, edit: true, delete: false },
  },
];

const PERMISSION_KEYS: PermissionKey[] = ["view", "create", "edit", "delete"];

export interface PermissionsGridProps {
  data?: PermissionItem[];
  onChange?: (updatedData: PermissionItem[]) => void;
  hideHeader?: boolean;
  className?: string;
}

export default function PermissionsGrid({ 
  data: externalData, 
  onChange, 
  hideHeader = false,
  className 
}: PermissionsGridProps) {
  const [internalData, setInternalData] = useState<PermissionItem[]>(initialData);
  const data = externalData || internalData;

  const togglePermission = (
    index: number,
    key: PermissionKey,
    value: boolean
  ) => {
    if (!data[index].editable[key]) return;
    
    const updated = [...data];
    updated[index] = {
      ...updated[index],
      permissions: {
        ...updated[index].permissions,
        [key]: value,
      },
    };
    
    if (onChange) {
      onChange(updated);
    } else {
      setInternalData(updated);
    }
  };

  return (
    <div className={cn("border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm", className)}>
      {!hideHeader && (
        <div className="grid grid-cols-5 bg-slate-50/80 border-b border-slate-200 text-sm font-semibold text-secondary-600 tracking-wide p-4">
          <div>Module</div>
          {PERMISSION_KEYS.map((key) => (
            <div key={key} className="text-center">
              {key}
            </div>
          ))}
        </div>
      )}

      <div className="overflow-y-auto divide-y divide-slate-100 scrollbar-hide">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="grid grid-cols-5 items-center p-4 hover:bg-slate-50/50 transition-colors"
          >
            <div className="text-sm font-medium text-secondary-600">{item.name}</div>

            {PERMISSION_KEYS.map((key) => {
              const isEditable = item.editable[key];
              const isChecked = item.permissions[key];

              return (
                <div key={key} className="flex justify-center">
                  <div className="relative flex items-center justify-center">
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={(checked) =>
                        togglePermission(index, key, !!checked)
                      }
                      className={cn(
                        "transition-all duration-300 border-primary-500 data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-500",
                        !isEditable && "cursor-default"
                      )}
                      title={
                        !isEditable
                          ? "You don't have permission to change this"
                          : ""
                      }
                    />
                    {!isChecked && (
                      <X className="absolute h-3 w-3 text-primary-500 pointer-events-none stroke-2" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
