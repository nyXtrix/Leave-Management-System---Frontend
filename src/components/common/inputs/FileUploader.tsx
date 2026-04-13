import React, { forwardRef } from "react";
import { Input, type InputProps } from "./Input";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FileUploaderProps extends Omit<InputProps, "type"> {
  accept?: string;
  multiple?: boolean;
}

const FileUploader = forwardRef<HTMLInputElement, FileUploaderProps>(
  ({ className, leftSection, size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "pt-1.5",
      md: "pt-[0.45rem]",
      lg: "pt-3",
    };

    return (
      <Input
        type="file"
        ref={ref}
        size={size}
        leftSection={leftSection || <UploadCloud className="text-slate-400" />}
        className={cn(
          "cursor-pointer text-slate-500",
          sizeClasses[size],
          "file:mr-4 file:py-1.5 file:px-3",
          "file:rounded-lg file:border-0",
          "file:text-[10px] file:font-black file:uppercase file:tracking-widest",
          "file:bg-primary-50 file:text-primary-600",
          "hover:file:bg-primary-100 hover:file:text-primary-700",
          "file:transition-all file:cursor-pointer",
          className
        )}
        {...props}
      />
    );
  }
);

FileUploader.displayName = "FileUploader";

export default FileUploader;