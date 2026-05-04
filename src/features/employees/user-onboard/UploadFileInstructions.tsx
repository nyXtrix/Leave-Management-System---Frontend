import React from "react";
import Modal from "@/components/ui/Modal";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

interface UploadFileInstructionsProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadFileInstructions: React.FC<UploadFileInstructionsProps> = ({
  isOpen,
  onClose,
}) => {
  // Fetch dynamic lookups from Redux store
  const { roles, departments } = useSelector((state: RootState) => state.lookups);


  const rules = [
    {
      col: "1",
      name: "First Name",
      type: "Text",
      req: "Yes",
      desc: "Employee's first name",
    },
    {
      col: "2",
      name: "Last Name",
      type: "Text",
      req: "Yes",
      desc: "Employee's last name",
    },
    {
      col: "3",
      name: "Email",
      type: "Valid Email",
      req: "Yes",
      desc: "Must be unique in the system",
    },
    {
      col: "4",
      name: "Role",
      type: "Uppercase String",
      req: "Yes",
      desc: "Must match exactly one of the allowed roles below",
    },
    {
      col: "5",
      name: "Department",
      type: "Uppercase String",
      req: "Yes",
      desc: "Must match exactly one of the allowed departments below",
    },
    {
      col: "6",
      name: "Manager Email",
      type: "Valid Email",
      req: "Yes",
      desc: "Email of the reporting manager",
    },
    {
      col: "7",
      name: "Gender",
      type: "Uppercase String",
      req: "Yes",
      desc: "Male, Female, or Other",
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Bulk Employee Upload"
      description="Follow the strict formatting rules below to upload multiple employees at once."
      size="3xl"
      hideFooter
    >
      <div className="space-y-8 pb-6">
        <div className="flex gap-3 bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-amber-600" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold">Strict Formatting Required</h4>
            <p className="text-xs font-medium opacity-90 leading-relaxed">
              The column order must strictly follow 1 through 7. No blank fields
              are allowed. Do not use numeric IDs for Roles or Departments; use
              the exact uppercase names shown below.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Allowed Roles
            </h4>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
              {roles.data.length > 0 ? (
                roles.data.map((role) => (
                  <span
                    key={role.value}
                    className="px-2.5 py-1 rounded-md bg-slate-100 text-[11px] font-bold text-slate-600 border border-slate-200"
                  >
                    {role.label.toUpperCase()}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400 font-medium">
                  No roles found
                </span>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Allowed Departments
            </h4>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
              {departments.data.length > 0 ? (
                departments.data.map((dept) => (
                  <span
                    key={dept.value}
                    className="px-2.5 py-1 rounded-md bg-slate-100 text-[11px] font-bold text-slate-600 border border-slate-200"
                  >
                    {dept.label.toUpperCase()}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400 font-medium">
                  No departments found
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 font-bold text-slate-700 text-xs w-12 text-center">
                  Col
                </th>
                <th className="px-4 py-3 font-bold text-slate-700 text-xs">
                  Column Name
                </th>
                <th className="px-4 py-3 font-bold text-slate-700 text-xs">
                  Format
                </th>
                <th className="px-4 py-3 font-bold text-slate-700 text-xs">
                  Mandatory
                </th>
                <th className="px-4 py-3 font-bold text-slate-700 text-xs">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rules.map((rule) => (
                <tr
                  key={rule.col}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-4 py-3 text-xs font-black text-slate-400 text-center">
                    {rule.col}
                  </td>
                  <td className="px-4 py-3 text-xs font-bold text-slate-800">
                    {rule.name}
                  </td>
                  <td className="px-4 py-3 text-xs font-medium text-slate-500">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                      {rule.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs font-bold text-emerald-600">
                    {rule.req}
                  </td>
                  <td className="px-4 py-3 text-xs font-medium text-slate-500">
                    {rule.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
};

export default UploadFileInstructions;
