import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { fetchDepartments, fetchRoles, fetchGenders, type LookupItem } from "@/store/slices/lookupSlice";
import * as z from "zod";
import Modal from "@/components/ui/Modal";
import { Form } from "@/components/common/forms/Form";
import { FormInput } from "@/components/common/forms/FormInput";
import { FormSelect } from "@/components/common/forms/FormSelect";
import { FormUserSelect } from "@/components/common/forms/FormUserSelect";
import type { ProfileBasicInfo } from "../EmployeeProfileCard";

const EditProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  gender: z.string().min(1, "Gender is required"),
  departmentId: z.string().optional(),
  roleId: z.string().optional(),
  managerId: z.string().optional(),
});

type EditProfileFormValues = z.infer<typeof EditProfileSchema>;

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: ProfileBasicInfo;
  onSuccess?: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  employee,
  onSuccess,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { departments, roles, genders } = useSelector((state: RootState) => state.lookups);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchDepartments());
      dispatch(fetchRoles());
      dispatch(fetchGenders());
    }
  }, [isOpen, dispatch]);

  const handleSubmit = async (values: EditProfileFormValues) => {
    console.log("Updating profile:", values);
    // TODO: Call API
    onSuccess?.();
    onClose();
  };

  const defaultValues = useMemo(() => {
    const findLookupId = (data: LookupItem[], label?: string | null, currentId?: string | null) => {
      if (!data.length) return currentId || "";
      const match = data.find(item => 
        (label && item.label?.toLowerCase() === label.toLowerCase()) ||
        (currentId && String(item.value).toLowerCase() === String(currentId).toLowerCase())
      );
      return match ? String(match.value) : (currentId || "");
    };

    const deptId = findLookupId(departments.data, employee.department, employee.departmentId);
    const roleId = findLookupId(roles.data, employee.role, employee.roleId);
    
    const genderLabel = employee.gender === 1 ? "Male" : employee.gender === 2 ? "Female" : "Other";
    const genderId = findLookupId(genders.data, genderLabel, String(employee.gender));

    return {
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      gender: genderId,
      departmentId: deptId,
      roleId: roleId,
      managerId: employee.managerId || "",
    };
  }, [employee, departments.data, roles.data, genders.data]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Profile"
      description="Update employee personal and professional information."
      size="lg"
      primaryBtnText="Save Changes"
      primaryBtnType="submit"
      primaryBtnForm="edit-profile-form"
    >
      <Form
        id="edit-profile-form"
        schema={EditProfileSchema}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            name="firstName"
            label="First Name"
            placeholder="Enter first name"
            required
          />
          <FormInput
            name="lastName"
            label="Last Name"
            placeholder="Enter last name"
            required
          />
        </div>

        <FormInput
          name="email"
          label="Email Address"
          placeholder="email@example.com"
          required
          disabled
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormSelect
            name="gender"
            label="Gender"
            options={genders.data.map(g => ({ label: g.label, value: String(g.value) }))}
            required
          />
          <FormSelect
            name="roleId"
            label="Designation / Role"
            options={roles.data.map(r => ({ label: r.label, value: String(r.value) }))}
            required
          />
        </div>

        <FormSelect
          name="departmentId"
          label="Department"
          options={departments.data.map(d => ({ label: d.label, value: String(d.value) }))}
          required
        />

        <FormUserSelect
          name="managerId"
          label="Reporting Manager"
          placeholder="Search and select manager"
          defaultLabel={employee.managerName || ""}
        />
      </Form>
    </Modal>
  );
};

export default EditProfileModal;
