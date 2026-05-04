import { Switch } from "@/components/ui/Switch";
import SelectInput from "@/components/common/inputs/SelectInput";
import { PermissionScope } from "@/types/permission.types";
import { cn, formatCapitalize } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface Props {
  modules: any[];
  permissions: string[];
  scopes: Record<string, PermissionScope>;
  onPermissionChange: (v: string[]) => void;
  onScopeChange: (moduleId: string, scope: PermissionScope) => void;
}

const ACTIONS = ["VIEW", "CREATE", "UPDATE", "DELETE"];

export default function PermissionMatrix({
  modules,
  permissions,
  scopes,
  onPermissionChange,
  onScopeChange,
}: Props) {
  const toggle = (moduleId: string, action: string, checked: boolean) => {
    const key = `${moduleId}:${action}`;
    let next = [...permissions];

    if (checked) {
      if (!next.includes(key)) next.push(key);
      if (action !== "VIEW") {
        const viewKey = `${moduleId}:VIEW`;
        if (!next.includes(viewKey)) next.push(viewKey);
      }
    } else {
      next = next.filter((p) => p !== key);
      if (action === "VIEW") {
        next = next.filter((p) => !p.startsWith(`${moduleId}:`));
      }
    }

    onPermissionChange(next);
  };

  const toggleAll = (moduleId: string, checked: boolean) => {
    let next = [...permissions];

    ACTIONS.forEach((a) => {
      const key = `${moduleId}:${a}`;
      if (checked) {
        if (!next.includes(key)) next.push(key);
      } else {
        next = next.filter((p) => p !== key);
      }
    });

    onPermissionChange(next);
  };

  return (
    <div className="bg-white border rounded-xl overflow-hidden shadow-premium">
      <div className="grid grid-cols-12 px-4 py-3 bg-slate-50 text-sm font-semibold text-slate-500">
        <div className="col-span-4">Module</div>
        <div className="col-span-3">Scope</div>
        <div className="col-span-4">Permissions</div>
        <div className="col-span-1 text-right">All</div>
      </div>

      {modules.map((m) => {
        const scope = scopes[m.id] ?? "";
        const allEnabled = ACTIONS.every((a) =>
          permissions.includes(`${m.id}:${a}`),
        );

        return (
          <div
            key={m.id}
            className="grid grid-cols-12 items-center px-4 py-3 border-t hover:bg-slate-50 transition"
          >
            <div className="col-span-4 font-medium text-sm text-slate-800">
              {m.label}
            </div>

            <div className="col-span-3">
              <SelectInput
                value={scope}
                options={[
                  { label: "None", value: "" },
                  { label: "Department", value: PermissionScope.DEPARTMENT },
                  { label: "All", value: PermissionScope.ALL },
                ]}
                onChange={(v) => onScopeChange(m.id, v as PermissionScope)}
                size="xs"
                className="rounded-lg max-w-40"
              />
            </div>

            <div className="col-span-4 flex gap-2">
              {ACTIONS.map((action) => {
                const checked = permissions.includes(`${m.id}:${action}`);

                return (
                  <Button
                    key={action}
                    type="button"
                    onClick={() => toggle(m.id, action, !checked)}
                    variant="outline"
                    className={cn(
                      "px-2 h-max py-1 text-[11px] rounded-md transition hover:text-primary-500 hover:shadow-none",
                      checked
                        ? "bg-primary-500 text-white border-primary-500 hover:bg-primary-500 hover:text-white"
                        : "bg-white text-slate-600 border-slate-200",
                    )}
                  >
                    {formatCapitalize(action)}
                  </Button>
                );
              })}
            </div>

            <div className="col-span-1 flex justify-end">
              <Switch
                checked={allEnabled}
                onCheckedChange={(v) => toggleAll(m.id, v)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
