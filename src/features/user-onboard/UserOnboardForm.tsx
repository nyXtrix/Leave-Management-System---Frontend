import React from "react";
import {
  UserOnboardValidation,
  type UserOnboardValidationType,
} from "@/validations/users/UserOnboardValidation";
import { FormInput } from "@/components/common/forms/FormInput";
import { Button } from "@/components/ui/Button";
import { Building2, Mail, User, ShieldCheck, VenusAndMars } from "lucide-react";
import { Form, FormSelect } from "@/components/common/forms";

const UserOnboardForm = () => {
  const onSubmit = (data: UserOnboardValidationType) => {
    console.log("Onboarding Data:", data);
  };

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    departmentId: "",
    roleId: "",
    managerId: "",
  };

  return (
    <div className="p-4 rounded-xl shadow-sm shadow-secondary-500/20">
      <Form
        schema={UserOnboardValidation}
        onSubmit={onSubmit}
        defaultValues={defaultValues}
      >
        {() => (
          <div className="space-y-8 animate-reveal">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FormInput
                name="firstName"
                label="First Name"
                placeholder="Enter first name"
                icon={User}
                required
              />
              <FormInput
                name="lastName"
                label="Last Name"
                placeholder="Enter last name"
                icon={User}
                required
              />
              <FormInput
                name="email"
                label="Email Address"
                placeholder="name@company.com"
                icon={Mail}
                required
              />
              <FormSelect
                name="gender"
                label="Gender"
                placeholder="Select gender"
                icon={VenusAndMars}
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Other", value: "other" },
                ]}
                required
              />
              <FormSelect
                name="departmentId"
                label="Department"
                placeholder="Select department"
                icon={Building2}
                options={[
                  { label: "Engineering", value: "eng" },
                  { label: "Product", value: "prod" },
                ]}
                required
              />
              <FormSelect
                name="roleId"
                label="System Role"
                placeholder="Select role"
                icon={ShieldCheck}
                options={[
                  { label: "Super Admin", value: "admin" },
                  { label: "Manager", value: "mgr" },
                  { label: "Employee", value: "emp" },
                ]}
                required
              />
              <FormInput
                name="managerId"
                label="Reporting Manager"
                placeholder="Select manager"
                icon={User}
                required
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                className="px-8 gradient-primary shadow-glow-primary rounded-xl font-black uppercase tracking-widest text-xs h-12"
              >
                Onboard Employee
              </Button>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
};

export default UserOnboardForm;
