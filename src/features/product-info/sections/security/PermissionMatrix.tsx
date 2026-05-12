import { Check, X } from "lucide-react";
import { AnimateIn } from "../../components/AnimateIn";

const modules = ["Leave Requests", "Approvals", "Employees", "Reports", "Policy"];
const roles = [
  { name: "Super Admin", color: "#FF1919", permissions: [true, true, true, true, true, true] },
  { name: "HR Manager", color: "#3B82F6", permissions: [true, true, true, true, true, false] },
  { name: "Department Head", color: "#8B5CF6", permissions: [true, true, true, false, false, false] },
  { name: "Employee", color: "#10B981", permissions: [true, false, false, false, false, false] },
];

const PermissionMatrix = () => (
  <div className="bg-white border border-secondary-300 rounded-2xl overflow-hidden shadow-lg">
    <div className="flex border-b border-secondary-100 bg-secondary-50/50">
      <div className="w-36 shrink-0 px-4 py-3">
        <span className="text-[11px] font-bold text-secondary-400 uppercase tracking-wide">Role</span>
      </div>
      <div className="flex-1 flex overflow-x-auto no-scrollbar">
        {modules.map((mod) => (
          <div key={mod} className="flex-1 min-w-[80px] px-2 py-3 text-center">
            <span className="text-[10px] font-bold text-secondary-500 leading-tight block">{mod}</span>
          </div>
        ))}
      </div>
    </div>
    {roles.map((role, ri) => (
      <AnimateIn key={role.name} animation="fade-right" delay={ri * 120} duration={450} threshold={0.05}>
        <div className="flex items-center border-b border-secondary-50 last:border-0">
          <div className="w-36 shrink-0 flex items-center gap-2 px-4 py-3.5">
            <span className="h-2 w-2 rounded-full shrink-0" style={{ background: role.color }} />
            <span className="text-xs font-semibold text-secondary-700 truncate">{role.name}</span>
          </div>
          <div className="flex flex-1 overflow-x-auto no-scrollbar">
            {role.permissions.map((allowed, pi) => (
              <AnimateIn key={pi} animation="zoom-in" delay={ri * 120 + pi * 50} duration={300} threshold={0.05}>
                <div className="flex-1 min-w-[80px] flex items-center ml-1 justify-center py-3.5">
                  {allowed ? (
                    <span className="h-6 w-6 rounded-md flex items-center justify-center bg-secondary-100">
                      <Check className="h-3.5 w-3.5 text-green-500" />
                    </span>
                  ) : (
                    <span className="h-6 w-6 rounded-md flex items-center justify-center bg-secondary-100">
                      <X className="h-3.5 w-3.5 text-red-500" />
                    </span>
                  )}
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </AnimateIn>
    ))}
  </div>
);

export default PermissionMatrix;
