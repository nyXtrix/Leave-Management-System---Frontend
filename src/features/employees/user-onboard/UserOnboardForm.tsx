import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserOnboardValidation,
  type UserOnboardValidationType,
} from "@/validations/users/UserOnboardValidation";
import { FormInput } from "@/components/common/forms/FormInput";
import { Button } from "@/components/ui/Button";
import { Building2, Mail, User, ShieldCheck, VenusAndMars } from "lucide-react";
import { Form, FormSelect, FormUserSelect } from "@/components/common/forms";

import { useLookups } from "@/hooks/useLookups";
import { useLoader } from "@/contexts/LoaderContext";
import { authService } from "@/services/auth.service";

const UserOnboardForm = () => {
  const { departments, roles, genders } = useLookups();
  const { showLoader, hideLoader } = useLoader();

  const methods = useForm<UserOnboardValidationType>({
    resolver: zodResolver(UserOnboardValidation),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      departmentId: "",
      roleId: "",
      managerId: "",
    },
  });

  const onSubmit = async (data: UserOnboardValidationType) => {
    try {
      showLoader();
      await authService.inviteUser({
        ...data,
      });
      methods.reset();
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="p-6 bg-white border border-slate-100 rounded-xl shadow-sm">
      <Form
        schema={UserOnboardValidation}
        methods={methods}
        onSubmit={onSubmit}
      >
        <div className="space-y-8 animate-reveal">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              options={genders.data || []}
              required
            />
            <FormSelect
              name="departmentId"
              label="Department"
              placeholder="Select department"
              icon={Building2}
              options={departments.data || []}
              required
            />
            <FormSelect
              name="roleId"
              label="System Role"
              placeholder="Select role"
              icon={ShieldCheck}
              options={roles.data || []}
              required
            />
            <FormUserSelect
              name="managerId"
              label="Reporting Manager"
              placeholder="Search and select manager"
              required
            />

            <div className="flex items-end justify-end h-full">
              <Button
                type="submit"
                disabled={methods.formState.isSubmitting}
                className="w-full md:w-auto px-8 gradient-primary shadow-glow-primary rounded-xl font-bold h-[42px]"
              >
                {methods.formState.isSubmitting ? "Processing..." : "Onboard Employee"}
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default UserOnboardForm;
