import React, { useRef, useState } from "react";
import { FileText, UploadCloud, X, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";

interface FileUploaderProps {
  label?: string;
  required?: boolean;
  error?: string;
  title: string | React.ReactNode;
  description?: string;
  icon?: LucideIcon;
  accept?: string;
  value?: File | null;
  onChange?: (file: File | null) => void;
  onConfirm: (file: File) => void;
  className?: string;
  maxSize?: number;
}

const FileUploader = React.forwardRef<HTMLInputElement, FileUploaderProps>(
  (
    {
      label,
      required,
      error,
      title,
      description,
      icon: Icon = UploadCloud,
      accept,
      value,
      onChange,
      onConfirm,
      className,
      maxSize,
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const resolvedRef = (ref as React.RefObject<HTMLInputElement>) ?? internalRef;

    const [isDragging, setIsDragging] = useState(false);
    const [sizeError, setSizeError] = useState<string | null>(null);

    const [internalFile, setInternalFile] = useState<File | null>(null);
    const activeFile = value !== undefined ? value : internalFile;
    const fileName = activeFile?.name ?? "";

    const validateAndHandle = (file: File | null) => {
      if (file && maxSize && file.size > maxSize) {
        const limitMB = (maxSize / (1024 * 1024)).toFixed(0);
        setSizeError(`File is too large. Maximum allowed size is ${limitMB}MB.`);
        if (resolvedRef.current) resolvedRef.current.value = "";
        return;
      }
      setSizeError(null);
      if (value === undefined) setInternalFile(file);
      onChange?.(file);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      validateAndHandle(e.target.files?.[0] || null);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0] || null;
      if (accept && file) {
        const ext = file.name.split(".").pop()?.toLowerCase();
        const acceptedTypes = accept.split(",").map((t) => t.trim().replace(".", "").toLowerCase());
        if (ext && !acceptedTypes.includes(ext)) return;
      }
      validateAndHandle(file);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (resolvedRef.current) resolvedRef.current.value = "";
      setSizeError(null);
      validateAndHandle(null);
    };

    return (
      <div className={cn("w-full space-y-2", className)}>
        {label && (
          <label className="block text-sm font-bold text-slate-700 ml-1">
            {label}
            {required && <span className="ml-1 text-red-500 font-bold">*</span>}
          </label>
        )}
        <input
          ref={resolvedRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleInputChange}
        />

        <div
          role="button"
          tabIndex={0}
          aria-label={label ?? title as string}
          onClick={() => resolvedRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && resolvedRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            "flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl p-4 cursor-pointer select-none",
            "transition-all duration-200",
            isDragging
              ? "border-primary-400 bg-primary-50 scale-[1.01]"
              : error || sizeError
              ? "border-red-300 bg-red-50/50 hover:border-red-400"
              : "border-slate-200 bg-slate-50/50 hover:border-primary-300 hover:bg-primary-50/30",
          )}
        >
          {fileName ? (
            <div className="flex flex-col gap-3 w-full max-w-xs items-center">
              <div className="flex items-center gap-3 bg-white border border-slate-100 shadow-sm px-4 py-2.5 rounded-xl w-full">
                <div className="w-8 h-8 rounded-full p-1 bg-primary-100 flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5 text-primary-600" />
                </div>
                <p className="text-xs font-bold text-slate-700 truncate flex-1">{fileName}</p>
                <IconButton
                  type="button"
                  variant="outline"
                  size="xs"
                  icon={X}
                  onClick={handleClear}
                  iconClassName="h-4 w-4"
                  className="h-7 w-7 p-0 rounded-full flex items-center justify-center transition-colors shrink-0"
                />
              </div>
              {onConfirm && activeFile && (
                <Button
                  type="button"
                  size="sm"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onConfirm(activeFile);
                  }}
                >
                  Confirm Upload
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                <Icon className="h-6 w-6 text-slate-400" />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-700">{title}</p>
                {description && (
                  <p className="text-xs text-slate-400 font-medium mt-1.5">{description}</p>
                )}
              </div>
            </>
          )}
        </div>

        {(sizeError || error) && (
          <p className="text-[10px] font-bold text-red-500 ml-1 tracking-tight">
            {sizeError ?? error}
          </p>
        )}
      </div>
    );
  },
);

FileUploader.displayName = "FileUploader";

export default FileUploader;