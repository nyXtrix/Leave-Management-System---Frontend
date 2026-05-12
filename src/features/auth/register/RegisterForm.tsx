import React from "react";
import { z } from "zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Globe, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Form, FormPasswordInput, FormInput } from "@/components/common/forms";
import RegisterImage from "@/assets/undraw/undraw_contract_ynau.svg";

import {
  RegisterValidationSchema,
  type RegisterValidationData as RegisterFormData,
} from "@/validations/auth/RegisterValidation";

interface RegisterFormProps {
  inviteMeta: {
    companyName?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  onSubmit: (
    data: RegisterFormData,
    methods: UseFormReturn<RegisterFormData>,
  ) => Promise<void>;
}

const RegisterForm = ({ inviteMeta, onSubmit }: RegisterFormProps) => {
  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterValidationSchema),
    defaultValues: {
      FirstName: inviteMeta.firstName || "",
      LastName: inviteMeta.lastName || "",
      AdminPassword: "",
      ConfirmPassword: "",
      CompanyName: "",
      Subdomain: "",
      email: inviteMeta.email || "",
    },
  });

  const { formState: { isSubmitting } } = methods;

  return (
    <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
      <div className="space-y-8 animate-reveal">
        <img
          src={RegisterImage}
          alt="Register"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="glass border-slate-200/60 rounded-2xl p-10  shadow-premium relative overflow-hidden group animate-reveal [animation-delay:200ms]">
        <h4 className="text-2xl font-bold text-primary-500 text-center mb-6">
          Welcome to LMS!
        </h4>
        <div className="relative z-10 space-y-8">
          <Form
            schema={RegisterValidationSchema}
            methods={methods}
            onSubmit={onSubmit}
            className="space-y-8"
          >
            <div className="space-y-6">
              {!inviteMeta.companyName ? (
                <>
                    <FormInput
                      name="CompanyName"
                      label="Organization Name"
                      placeholder="e.g. Microsoft"
                      icon={Building2}
                      required
                      size="md"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormInput
                        name="FirstName"
                        label="First Name"
                        placeholder="John"
                        icon={User}
                        required
                        size="md"
                      />
                      <FormInput
                        name="LastName"
                        label="Last Name"
                        placeholder="Doe"
                        icon={User}
                        required
                        size="md"
                      />
                    </div>
                    <FormInput
                      name="email"
                      label="Email"
                      placeholder="e.g. admin@lms.com"
                      icon={Mail}
                      required
                      size="md"
                      disabled
                    />
                  <div className="space-y-2">
                    <FormInput
                      name="Subdomain"
                      label="Workplace URL"
                      placeholder="my-company"
                      icon={Globe}
                      required
                      className="pr-24"
                      size="md"
                      rightSection={
                        <span className="text-sm font-bold text-slate-400 group-focus-within/input:text-primary-500 transition-colors mr-2">
                          .flowoff.com
                        </span>
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormPasswordInput
                      name="AdminPassword"
                      label="Create Password"
                      placeholder="Enter password"
                      size="md"
                    />
                    <FormPasswordInput
                      name="ConfirmPassword"
                      label="Confirm Password"
                      placeholder="Repeat password"
                      size="md"
                    />
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  <div className="p-4 bg-primary-50 rounded-2xl border border-primary-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <Building2 className="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-primary-600 uppercase tracking-wider">Joining Organization</p>
                      <p className="text-sm font-black text-slate-700">{inviteMeta.companyName}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormPasswordInput
                      name="AdminPassword"
                      label="Create Password"
                      placeholder="Enter password"
                      size="md"
                    />
                    <FormPasswordInput
                      name="ConfirmPassword"
                      label="Confirm Password"
                      placeholder="Repeat password"
                      size="md"
                    />
                  </div>
                </div>
              )}
 
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting 
                  ? (!inviteMeta.companyName ? "Creating Workspace..." : "Setting up Account...") 
                  : (!inviteMeta.companyName ? "Create Workspace" : "Complete Registration")}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
