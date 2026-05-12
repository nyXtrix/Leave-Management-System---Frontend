import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormInput } from "@/components/common/forms";
import {
  RoleValidation,
  type RoleFormData,
} from "@/validations/organization/RoleValidation";
import { 
  Users2, 
  LayersPlus, 
} from "lucide-react";
import { PERMISSION_MODULES, PermissionScope } from "@/types/permission.types";
import PermissionAccordion from "./components/PermissionAccordion";
import { transformToAppPermissions } from "@/utils/permissions";
import IconButton from "@/components/ui/IconButton";

const MODULE_NAME_MAP: Record<string, string> = {
  "Leave Management": "LEAVE_MGMT",
  "Employee Management": "EMPLOYEE_MGMT",
  "Approvals": "APPROVALS",
};

import { 
  type CreateRoleRequest, 
  type UpdateRoleRequest 
} from "@/types/organization.types";

interface RoleCreationFormProps {
  initialData?: any;
  onSubmit?: (data: CreateRoleRequest | UpdateRoleRequest) => void;
  onStateChange?: (state: { isValid: boolean; isDirty: boolean }) => void;
}

const RoleCreationForm = ({ initialData, onSubmit: onSubmitRole, onStateChange }: RoleCreationFormProps) => {
  const methods = useForm<RoleFormData>({
    resolver: zodResolver(RoleValidation),
    mode: "onChange",
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      permissions: initialData?.permissions 
        ? Object.entries(initialData.permissions as Record<string, { actions: string[] }>).flatMap(([moduleId, module]) => {
            return module.actions.map(action => `${moduleId}:${action}`);
          })
        : [],
      scopes: initialData?.permissions
        ? Object.entries(initialData.permissions as Record<string, { scope: string }>).reduce((acc, [moduleId, module]) => {
            acc[moduleId] = (module.scope as PermissionScope) || PermissionScope.ALL;
            return acc;
          }, {} as Record<string, PermissionScope>)
        : {},
    },
  });

  const { register, watch, setValue, reset, formState: { isSubmitting, isValid, isDirty } } = methods;
  const [isManualDirty, setIsManualDirty] = React.useState(false);

  const watchedPermissions = watch("permissions");
  const watchedScopes = watch("scopes");

  useEffect(() => {
    register("permissions");
    register("scopes");
  }, [register]);

  useEffect(() => {
    onStateChange?.({ isValid, isDirty: isDirty || isManualDirty });
  }, [isValid, isDirty, isManualDirty, watchedPermissions, watchedScopes, onStateChange]);

  useEffect(() => {
    setIsManualDirty(false);
    reset({
      name: initialData?.name || "",
      description: initialData?.description || "",
      permissions: initialData?.permissions 
        ? Object.entries(initialData.permissions as Record<string, { actions: string[] }>).flatMap(([moduleId, module]) => {
            return module.actions.map(action => `${moduleId}:${action}`);
          })
        : [],
      scopes: initialData?.permissions
        ? Object.entries(initialData.permissions as Record<string, { scope: string }>).reduce((acc, [moduleId, module]) => {
            acc[moduleId] = (module.scope as PermissionScope) || PermissionScope.ALL;
            return acc;
          }, {} as Record<string, PermissionScope>)
        : {},
    });
  }, [initialData?.id, reset]);

  const activePermissions = watch("permissions") || [];
  const activeScopes = watch("scopes") || {};

  const onSubmit = (data: RoleFormData) => {
    const backendPayload = {
      name: data.name,
      description: data.description,
      permissions: transformToAppPermissions(data.permissions, data.scopes || {})
    };

    onSubmitRole?.(backendPayload);
  };

  const handlePermissionChange = (newPerms: string[]) => {
    setValue("permissions", newPerms, { shouldDirty: true, shouldValidate: true });
    setIsManualDirty(true);
    void methods.trigger("permissions");
  };

  const handleScopeChange = (moduleId: string, scope: PermissionScope | "") => {
    const newScopes = { ...activeScopes, [moduleId]: scope };
    setValue("scopes", newScopes, { shouldDirty: true, shouldValidate: true });
    setIsManualDirty(true);
    void methods.trigger("scopes");
  };

  return (
    <div className="p-0">
      <Form
        id="role-form"
        schema={RoleValidation}
        methods={methods}
        onSubmit={onSubmit}
      >
        <div className="space-y-8 animate-reveal">
          
          <div className="space-y-6">

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50/50 border border-slate-100 rounded-xl">
                <FormInput
                  name="name"
                  label="Role Label"
                  placeholder="e.g. Regional Manager"
                  icon={Users2}
                  required
                />
                <FormInput
                  name="description"
                  label="Description"
                  placeholder="Primary responsibilities"
                  icon={Users2}
                  required
                />
             </div>
          </div>

          <PermissionAccordion 
            modules={PERMISSION_MODULES}
            permissions={activePermissions}
            scopes={activeScopes}
            onPermissionChange={handlePermissionChange}
            onScopeChange={handleScopeChange}
          />
        </div>
      </Form>
    </div>
  );
};

export default RoleCreationForm;
