import { Badge } from "@/components/ui/Badge";
import IconButton from "@/components/ui/IconButton";
import {
  Pencil,
  Trash2,
  ShieldCheck,
  Hash,
  Info,
} from "lucide-react";
import React from "react";
import type { LeaveType } from "@/services/leavePolicy.service";  
import { getLeaveTheme } from "@/lib/utils/LeaveTheme";

interface LeaveTypeCardProps {
  type: LeaveType;
  onEdit?: (type: LeaveType) => void;
  onDelete?: (typeId: string) => void;
  canUpdate?: boolean;
  canDelete?: boolean;
}

const LeaveTypeCard = ({ type, onEdit, onDelete, canUpdate, canDelete }: LeaveTypeCardProps) => {
  const theme = getLeaveTheme(type.name);
  const Icon = theme.icon as React.ElementType;

  return (
    <div className="w-full rounded-lg p-5 bg-gray-100/60 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-linear-to-br from-primary-500 to-primary-700 text-white font-semibold shadow-sm transition-all duration-500">
            <Icon className="h-6 w-6" />
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 leading-tight">
              {type.name}
            </h3>
            <p className="text-[10px] font-black text-secondary-400 uppercase tracking-widest mt-0.5">
              Leave Configuration
            </p>
          </div>
        </div>

        <Badge variant="success" className="shrink-0">
          Active
        </Badge>
      </div>

      <div className="mt-4 flex-1">
        <div className="flex gap-2 p-3 rounded-xl bg-white/50 border border-gray-200/50">
          <Info className="h-4 w-4 text-secondary-400 shrink-0 mt-0.5" />
          <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 italic">
            {type.description || "No description provided for this leave type configuration."}
          </p>
        </div>
      </div>

      <div className="my-4 border-t border-gray-300" />

      <div className="grid grid-cols-2 gap-y-3 text-sm">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
            <Hash className="h-3.5 w-3.5" />
          </div>
          <div>
            <p className="text-[10px] font-black text-secondary-400 uppercase tracking-wider leading-none mb-1">
              Allowance
            </p>
            <p className="text-sm font-bold text-gray-700">
              {type.defaultAnnualAllowence} Days
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
            <ShieldCheck className="h-3.5 w-3.5" />
          </div>
          <div>
            <p className="text-[10px] font-black text-secondary-400 uppercase tracking-wider leading-none mb-1">
              Cancelable
            </p>
            <p className="text-sm font-bold text-gray-700">
              {type.maxCancelableStep} Steps
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-gray-200 flex justify-end gap-2">
        {canUpdate && (
          <IconButton
            icon={Pencil}
            size="sm"
            variant="ghost"
            onClick={() => onEdit?.(type)}
            className="rounded-xl text-secondary-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
            iconClassName="h-4 w-4"
          />
        )}
        {canDelete && (
          <IconButton
            icon={Trash2}
            size="sm"
            variant="ghost"
            onClick={() => onDelete?.(type.externalId)}
            className="rounded-xl text-secondary-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            iconClassName="h-4 w-4"
          />
        )}
      </div>
    </div>
  );
};

export default LeaveTypeCard;
